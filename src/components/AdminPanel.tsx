import { useState } from "react";
import { X, Plus, Trash2, Save, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCars, saveCars, getHeroImages, saveHeroImages, type Car, type CarStatus } from "@/data/store";
import { toast } from "sonner";

const ADMIN_PASS = "oliveras2024";

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"cars" | "hero">("cars");
  const [cars, setCarsState] = useState(getCars);
  const [heroImages, setHeroImagesState] = useState(getHeroImages);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [newHeroUrl, setNewHeroUrl] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      setAuthenticated(true);
    } else {
      toast.error("Contrasenya incorrecta");
    }
  };

  const saveCarsData = (updated: Car[]) => {
    setCarsState(updated);
    saveCars(updated);
  };

  const handleSaveCar = () => {
    if (!editingCar) return;
    const existing = cars.find(c => c.id === editingCar.id);
    let updated: Car[];
    if (existing) {
      updated = cars.map(c => (c.id === editingCar.id ? editingCar : c));
    } else {
      updated = [...cars, editingCar];
    }
    saveCarsData(updated);
    setEditingCar(null);
    toast.success("Cotxe desat correctament");
  };

  const handleDeleteCar = (id: string) => {
    saveCarsData(cars.filter(c => c.id !== id));
    toast.success("Cotxe eliminat");
  };

  const handleAddHero = () => {
    if (!newHeroUrl.trim()) return;
    const updated = [...heroImages, newHeroUrl.trim()];
    setHeroImagesState(updated);
    saveHeroImages(updated);
    setNewHeroUrl("");
    toast.success("Imatge afegida");
  };

  const handleRemoveHero = (idx: number) => {
    const updated = heroImages.filter((_, i) => i !== idx);
    setHeroImagesState(updated);
    saveHeroImages(updated);
  };

  if (!authenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-card rounded-lg p-6 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-card-foreground">Accés administrador</h3>
            <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contrasenya"
              autoFocus
            />
            <Button type="submit" className="w-full">
              <LogIn className="w-4 h-4 mr-2" /> Entrar
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-foreground/50 flex items-end md:items-center justify-center" onClick={onClose}>
      <div
        className="bg-card rounded-t-xl md:rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h3 className="font-heading font-bold text-card-foreground">Panell d'administració</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            className={`flex-1 py-3 text-sm font-medium transition-colors ${tab === "cars" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
            onClick={() => { setTab("cars"); setEditingCar(null); }}
          >
            Cotxes
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium transition-colors ${tab === "hero" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
            onClick={() => setTab("hero")}
          >
            Imatges Hero
          </button>
        </div>

        <div className="p-4">
          {tab === "cars" && !editingCar && (
            <div className="space-y-3">
              <Button size="sm" onClick={() => setEditingCar({ id: Date.now().toString(), brand: "", model: "", year: 2024, km: 0, price: 0, description: "", status: "Disponible", photos: [] })}>
                <Plus className="w-4 h-4 mr-1" /> Afegir cotxe
              </Button>
              {cars.map(car => (
                <div key={car.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{car.brand} {car.model}</p>
                    <p className="text-xs text-muted-foreground">{car.year} · {car.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEditingCar({ ...car })}>Editar</Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteCar(car.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "cars" && editingCar && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground">Marca</label>
                  <Input value={editingCar.brand} onChange={e => setEditingCar({ ...editingCar, brand: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Model</label>
                  <Input value={editingCar.model} onChange={e => setEditingCar({ ...editingCar, model: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Any</label>
                  <Input type="number" value={editingCar.year} onChange={e => setEditingCar({ ...editingCar, year: parseInt(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Km</label>
                  <Input type="number" value={editingCar.km} onChange={e => setEditingCar({ ...editingCar, km: parseInt(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Preu (€)</label>
                  <Input type="number" value={editingCar.price} onChange={e => setEditingCar({ ...editingCar, price: parseInt(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Estat</label>
                  <Select value={editingCar.status} onValueChange={v => setEditingCar({ ...editingCar, status: v as CarStatus })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Disponible">Disponible</SelectItem>
                      <SelectItem value="Reservat">Reservat</SelectItem>
                      <SelectItem value="Venut">Venut</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">Descripció</label>
                <Textarea value={editingCar.description} onChange={e => setEditingCar({ ...editingCar, description: e.target.value })} rows={3} />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">URL de la foto (separades per comes)</label>
                <Input
                  value={editingCar.photos.join(", ")}
                  onChange={e => setEditingCar({ ...editingCar, photos: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveCar}><Save className="w-4 h-4 mr-1" /> Desar</Button>
                <Button variant="outline" onClick={() => setEditingCar(null)}>Cancel·lar</Button>
              </div>
            </div>
          )}

          {tab === "hero" && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input value={newHeroUrl} onChange={e => setNewHeroUrl(e.target.value)} placeholder="URL de la imatge" />
                <Button onClick={handleAddHero}><Plus className="w-4 h-4" /></Button>
              </div>
              {heroImages.map((img, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg border border-border">
                  <img src={img} alt="" className="w-20 h-12 object-cover rounded" />
                  <p className="text-xs text-muted-foreground flex-1 truncate">{img.slice(0, 60)}</p>
                  <Button size="sm" variant="outline" onClick={() => handleRemoveHero(i)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
