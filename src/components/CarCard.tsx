import { Link } from "react-router-dom";
import { Car } from "@/data/store";
import { Badge } from "@/components/ui/badge";

const statusClass: Record<string, string> = {
  Disponible: "badge-disponible",
  Reservat: "badge-reservat",
  Venut: "badge-venut",
};

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link
      to={`/cataleg/${car.id}`}
      className="group block rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={car.photos[0]}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading font-semibold text-card-foreground leading-tight">
            {car.brand} {car.model}
          </h3>
          <Badge variant="outline" className={statusClass[car.status]}>
            {car.status}
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          <span>{car.year}</span>
          <span>·</span>
          <span>{car.km.toLocaleString("ca-ES")} km</span>
        </div>
        <p className="font-heading text-xl font-bold text-primary">
          {car.price.toLocaleString("ca-ES")} €
        </p>
      </div>
    </Link>
  );
}
