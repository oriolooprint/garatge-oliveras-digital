import { useState, useMemo } from "react";
import { getCars, getUniqueBrands, type CarStatus } from "@/data/store";
import CarCard from "@/components/CarCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AdminGear from "@/components/AdminGear";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function CatalegPage() {
  const allCars = getCars();
  const brands = getUniqueBrands(allCars);

  const [brand, setBrand] = useState("all");
  const [status, setStatus] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [minYear, setMinYear] = useState("");

  const filtered = useMemo(() => {
    return allCars.filter(c => {
      if (brand !== "all" && c.brand !== brand) return false;
      if (status !== "all" && c.status !== status) return false;
      if (maxPrice && c.price > parseInt(maxPrice)) return false;
      if (minYear && c.year < parseInt(minYear)) return false;
      return true;
    });
  }, [allCars, brand, status, maxPrice, minYear]);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="section-padding">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Catàleg de <span className="text-primary">cotxes</span>
            </h1>
            <p className="text-muted-foreground mb-8">Troba el teu vehicle d'ocasió ideal.</p>

            {/* Filters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 p-4 rounded-lg bg-muted border border-border">
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Marca</label>
                <Select value={brand} onValueChange={setBrand}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Totes</SelectItem>
                    {brands.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Estat</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tots</SelectItem>
                    <SelectItem value="Disponible">Disponible</SelectItem>
                    <SelectItem value="Reservat">Reservat</SelectItem>
                    <SelectItem value="Venut">Venut</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Preu màx. (€)</label>
                <Input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Sense límit" />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Any mínim</label>
                <Input type="number" value={minYear} onChange={e => setMinYear(e.target.value)} placeholder="Tots" />
              </div>
            </div>

            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No s'han trobat vehicles amb aquests filtres.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map(car => <CarCard key={car.id} car={car} />)}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <AdminGear />
    </>
  );
}
