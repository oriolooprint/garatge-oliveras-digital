import { Link } from "react-router-dom";
import { Car, getCarCoverPhoto } from "@/data/store";
import { Badge } from "@/components/ui/badge";
import { Calendar, Gauge } from "lucide-react";

const statusClass: Record<string, string> = {
  Disponible: "badge-disponible",
  Reservat: "badge-reservat",
  Venut: "badge-venut",
};

export default function CarCard({ car }: { car: Car }) {
  const coverPhoto = getCarCoverPhoto(car);

  return (
    <Link
      to={`/cataleg/${car.id}`}
      className="group block rounded-2xl bg-card border border-border overflow-hidden transition-all duration-300 premium-shadow hover:premium-shadow-hover hover:border-primary/20"
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted relative">
        <img
          src={coverPhoto}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className={`${statusClass[car.status]} backdrop-blur-sm bg-card/80 text-xs font-semibold`}>
            {car.status}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-heading font-bold text-card-foreground leading-tight text-lg mb-1">
          {car.brand} {car.model}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {car.year}
          </span>
          <span className="inline-flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5" /> {car.km.toLocaleString("ca-ES")} km
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-heading text-xl font-extrabold text-primary">
            {car.price.toLocaleString("ca-ES")} €
          </p>
          <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Veure detalls →
          </span>
        </div>
      </div>
    </Link>
  );
}
