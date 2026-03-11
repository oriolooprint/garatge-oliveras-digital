import { getCars } from "@/data/store";
import CarCard from "./CarCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CarsSection() {
  const cars = getCars().filter(c => c.status !== "Venut").slice(0, 4);

  return (
    <section id="cotxes" className="section-padding section-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary font-medium text-sm tracking-wider uppercase mb-3">Vehicles</p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
            Cotxes d'ocasió disponibles
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Consulta els nostres vehicles d'ocasió revisats i amb garantia.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 bg-white/5">
            <Link to="/cataleg">
              Veure tot el catàleg <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
