import { getCars } from "@/data/store";
import CarCard from "./CarCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CarsSection() {
  const cars = getCars().filter(c => c.status !== "Venut").slice(0, 4);

  return (
    <section id="cotxes" className="section-padding section-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Cotxes d'ocasió <span className="text-primary">disponibles</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Consulta els nostres vehicles d'ocasió revisats i amb garantia. Contacta'ns per més informació.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link to="/cataleg">
              Veure tot el catàleg <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
