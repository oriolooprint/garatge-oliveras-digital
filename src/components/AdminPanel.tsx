import { useState, useRef } from "react";
import { X, Plus, Trash2, Save, LogIn, Upload, Link as LinkIcon, GripVertical, ImageIcon, Star as StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  getCars, saveCars,
  getHeroImages, saveHeroImages,
  getSiteConfig, saveSiteConfig,
  fileToDataUrl,
  type Car, type CarStatus, type HeroImage, type CarImage, type SiteConfig,
} from "@/data/store";
import { toast } from "sonner";

const ADMIN_PASS = "oliveras2024";

type Tab = "cars" | "hero";

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("cars");

  const [cars, setCarsState] = useState(getCars);
  const [heroImages, setHeroImagesState] = useState(getHeroImages);
  const [siteConfig, setSiteConfigState] = useState(getSiteConfig);

  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const heroFileRef = useRef<HTMLInputElement>(null);
  const carFileRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      setAuthenticated(true);
    } else {
      toast.error("Contrasenya incorrecta");
    }
  };

  // === CARS ===
  const saveCarsData = (updated: Car[]) => { setCarsState(updated); saveCars(updated); };

  const handleSaveCar = () => {
    if (!editingCar) return;
    const existing = cars.find(c => c.id === editingCar.id);
    const updated = existing ? cars.map(c => c.id === editingCar.id ? editingCar : c) : [...cars, editingCar];
    saveCarsData(updated);
    setEditingCar(null);
    toast.success("Cotxe desat correctament");
  };

  const handleDeleteCar = (id: string) => { saveCarsData(cars.filter(c => c.id !== id)); toast.success("Cotxe eliminat"); };

  const addCarImage = async (sourceType: "url" | "file", value: string | File) => {
    if (!editingCar) return;
    let url = "";
    if (sourceType === "url") {
      url = value as string;
    } else {
      url = await fileToDataUrl(value as File);
    }
    const newImg: CarImage = {
      id: Date.now().toString(),
      sourceType,
      url,
      alt: `${editingCar.brand} ${editingCar.model}`,
      sortOrder: (editingCar.images?.length || 0),
      isCover: !(editingCar.images?.length),
    };
    const images = [...(editingCar.images || []), newImg];
    setEditingCar({ ...editingCar, images, photos: images.map(i => i.url) });
  };

  const removeCarImage = (imgId: string) => {
    if (!editingCar) return;
    const images = (editingCar.images || []).filter(i => i.id !== imgId);
    if (images.length && !images.some(i => i.isCover)) images[0].isCover = true;
    setEditingCar({ ...editingCar, images, photos: images.map(i => i.url) });
  };

  const setCarCover = (imgId: string) => {
    if (!editingCar) return;
    const images = (editingCar.images || []).map(i => ({ ...i, isCover: i.id === imgId }));
    setEditingCar({ ...editingCar, images });
  };

  // === HERO ===
  const saveHeroData = (updated: HeroImage[]) => { setHeroImagesState(updated); saveHeroImages(updated); };

  const addHeroImage = async (sourceType: "url" | "file", value: string | File) => {
    let url = "";
    if (sourceType === "url") {
      url = value as string;
      if (!url.trim()) return;
    } else {
      url = await fileToDataUrl(value as File);
    }
    const newImg: HeroImage = {
      id: Date.now().toString(),
      sourceType,
      url,
      title: "",
      alt: "Garatge Oliveras",
      active: true,
      sortOrder: heroImages.length,
    };
    saveHeroData([...heroImages, newImg]);
    toast.success("Imatge afegida");
  };

  const removeHeroImage = (id: string) => { saveHeroData(heroImages.filter(h => h.id !== id)); };
  const toggleHeroActive = (id: string) => {
    saveHeroData(heroImages.map(h => h.id === id ? { ...h, active: !h.active } : h));
  };

  // === SITE CONFIG ===
  const saveSiteData = (config: SiteConfig) => { setSiteConfigState(config); saveSiteConfig(config); };

  const [heroUrlInput, setHeroUrlInput] = useState("");
  const [carUrlInput, setCarUrlInput] = useState("");

  // === LOGIN ===
  if (!authenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-card rounded-2xl p-8 w-full max-w-sm shadow-2xl border border-border" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-bold text-card-foreground text-lg">Accés administrador</h3>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors"><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contrasenya" autoFocus className="rounded-xl h-11" />
            <Button type="submit" className="w-full rounded-full h-11">
              <LogIn className="w-4 h-4 mr-2" /> Entrar
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "cars", label: "Cotxes" },
    { key: "hero", label: "Hero" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center" onClick={onClose}>
      <div className="bg-card rounded-t-2xl md:rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-border" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-5 flex items-center justify-between rounded-t-2xl z-10">
          <h3 className="font-heading font-bold text-card-foreground text-lg">Panell d'administració</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors"><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-2">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`flex-1 py-3 text-sm font-medium transition-all relative ${tab === t.key ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => { setTab(t.key); setEditingCar(null); }}
            >
              {t.label}
              {tab === t.key && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" />}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* ====== CARS TAB ====== */}
          {tab === "cars" && !editingCar && (
            <div className="space-y-3">
              <Button size="sm" className="rounded-full" onClick={() => setEditingCar({ id: Date.now().toString(), brand: "", model: "", year: 2024, km: 0, price: 0, description: "", status: "Disponible", photos: [], images: [] })}>
                <Plus className="w-4 h-4 mr-1" /> Afegir cotxe
              </Button>
              {cars.map(car => (
                <div key={car.id} className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-3">
                    {car.photos[0] && <img src={car.photos[0]} alt="" className="w-12 h-9 rounded-lg object-cover" />}
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">{car.brand} {car.model}</p>
                      <p className="text-xs text-muted-foreground">{car.year} · {car.status} · {car.price.toLocaleString("ca-ES")}€</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-lg text-xs" onClick={() => setEditingCar({ ...car, images: car.images || car.photos.map((p, i) => ({ id: `legacy-${i}`, sourceType: "url" as const, url: p, alt: `${car.brand} ${car.model}`, sortOrder: i, isCover: i === 0 })) })}>Editar</Button>
                    <Button size="sm" variant="outline" className="rounded-lg" onClick={() => handleDeleteCar(car.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "cars" && editingCar && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Marca</label>
                  <Input value={editingCar.brand} onChange={e => setEditingCar({ ...editingCar, brand: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Model</label>
                  <Input value={editingCar.model} onChange={e => setEditingCar({ ...editingCar, model: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Any</label>
                  <Input type="number" value={editingCar.year} onChange={e => setEditingCar({ ...editingCar, year: parseInt(e.target.value) || 0 })} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Km</label>
                  <Input type="number" value={editingCar.km} onChange={e => setEditingCar({ ...editingCar, km: parseInt(e.target.value) || 0 })} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Preu (€)</label>
                  <Input type="number" value={editingCar.price} onChange={e => setEditingCar({ ...editingCar, price: parseInt(e.target.value) || 0 })} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Estat</label>
                  <Select value={editingCar.status} onValueChange={v => setEditingCar({ ...editingCar, status: v as CarStatus })}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Disponible">Disponible</SelectItem>
                      <SelectItem value="Reservat">Reservat</SelectItem>
                      <SelectItem value="Venut">Venut</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Descripció</label>
                <Textarea value={editingCar.description} onChange={e => setEditingCar({ ...editingCar, description: e.target.value })} rows={3} className="rounded-xl" />
              </div>

              {/* Car images */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Imatges del vehicle</label>
                <div className="flex gap-2 mb-3">
                  <div className="flex-1 flex gap-2">
                    <Input value={carUrlInput} onChange={e => setCarUrlInput(e.target.value)} placeholder="URL de la imatge" className="rounded-xl text-sm" />
                    <Button size="sm" variant="outline" className="rounded-lg" onClick={() => { if (carUrlInput.trim()) { addCarImage("url", carUrlInput.trim()); setCarUrlInput(""); } }}>
                      <LinkIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <input ref={carFileRef} type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) addCarImage("file", e.target.files[0]); e.target.value = ""; }} />
                  <Button size="sm" variant="outline" className="rounded-lg" onClick={() => carFileRef.current?.click()}>
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(editingCar.images || []).map(img => (
                    <div key={img.id} className={`relative rounded-xl overflow-hidden border-2 ${img.isCover ? "border-primary" : "border-border"}`}>
                      <img src={img.url} alt={img.alt} className="w-full h-20 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        <button onClick={() => setCarCover(img.id)} className="p-1 bg-white/20 rounded-md" title="Portada">
                          <StarIcon className={`w-3.5 h-3.5 ${img.isCover ? "fill-amber-400 text-amber-400" : "text-white"}`} />
                        </button>
                        <button onClick={() => removeCarImage(img.id)} className="p-1 bg-white/20 rounded-md">
                          <Trash2 className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>
                      {img.isCover && <span className="absolute top-1 left-1 text-[9px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-md font-medium">Portada</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleSaveCar} className="rounded-full"><Save className="w-4 h-4 mr-1" /> Desar</Button>
                <Button variant="outline" className="rounded-full" onClick={() => setEditingCar(null)}>Cancel·lar</Button>
              </div>
            </div>
          )}

          {/* ====== HERO TAB ====== */}
          {tab === "hero" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Afegir imatges per URL o pujant un fitxer.</p>
              <div className="flex gap-2">
                <Input value={heroUrlInput} onChange={e => setHeroUrlInput(e.target.value)} placeholder="URL de la imatge" className="rounded-xl text-sm" />
                <Button size="sm" variant="outline" className="rounded-lg" onClick={() => { addHeroImage("url", heroUrlInput); setHeroUrlInput(""); }}>
                  <LinkIcon className="w-4 h-4 mr-1" /> URL
                </Button>
                <input ref={heroFileRef} type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) addHeroImage("file", e.target.files[0]); e.target.value = ""; }} />
                <Button size="sm" variant="outline" className="rounded-lg" onClick={() => heroFileRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-1" /> Fitxer
                </Button>
              </div>
              {heroImages.map((img) => (
                <div key={img.id} className="flex items-center gap-3 p-3 rounded-xl border border-border">
                  <GripVertical className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                  <img src={img.url} alt={img.alt} className="w-20 h-12 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground truncate">{img.sourceType === "url" ? img.url.slice(0, 40) : "Fitxer pujat"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={img.active} onCheckedChange={() => toggleHeroActive(img.id)} />
                    <Button size="sm" variant="outline" className="rounded-lg" onClick={() => removeHeroImage(img.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
