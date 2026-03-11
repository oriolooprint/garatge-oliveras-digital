import { useState, useMemo } from "react";
import { getCars, getUniqueBrands } from "@/data/store";
import CarCard from "@/components/CarCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminGear from "@/components/AdminGear";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
        {/* Header */}
        <div className="section-dark py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-3">Catàleg</p>
            <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-3">
              Cotxes d'ocasió
            </h1>
            <p className="text-white/60">Troba el teu vehicle d'ocasió ideal.</p>
          </div>
        </div>

        <div className="section-padding bg-background">
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 p-5 rounded-2xl bg-card border border-border premium-shadow">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Marca</label>
                <Select value={brand} onValueChange={setBrand}>
                  <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Totes</SelectItem>
                    {brands.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Estat</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tots</SelectItem>
                    <SelectItem value="Disponible">Disponible</SelectItem>
                    <SelectItem value="Reservat">Reservat</SelectItem>
                    <SelectItem value="Venut">Venut</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Preu màx. (€)</label>
                <Input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Sense límit" className="rounded-xl" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Any mínim</label>
                <Input type="number" value={minYear} onChange={e => setMinYear(e.target.value)} placeholder="Tots" className="rounded-xl" />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No s'han trobat vehicles amb aquests filtres.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map(car => <CarCard key={car.id} car={car} />)}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <AdminGear />
    </>
  );
}
