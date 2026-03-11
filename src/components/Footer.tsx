import { Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="font-heading text-lg font-bold mb-2">
            Garatge<span className="text-primary"> Oliveras</span> S.L.
          </p>
          <p className="text-sm text-secondary-foreground/60">
            Taller mecànic i venda de cotxes d'ocasió a Viladamat, Girona.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-secondary-foreground/70">
            <MapPin className="w-4 h-4 text-primary" />
            Ctra. Orriols - L'Escala, 16, 17137 Viladamat
          </div>
          <div className="flex items-center gap-2 text-sm text-secondary-foreground/70">
            <Phone className="w-4 h-4 text-primary" />
            <a href="tel:+34972788102" className="hover:text-primary transition-colors">+34 972 78 81 02</a>
          </div>
        </div>
        <div className="text-sm text-secondary-foreground/60">
          <p className="mb-1 font-medium text-secondary-foreground/80">Horari</p>
          <p>Dl–Dv: 9:00–13:30 / 15:00–18:30</p>
          <p>Ds–Dg: Tancat</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-secondary-foreground/10 text-center text-xs text-secondary-foreground/40">
        © {new Date().getFullYear()} Garatge Oliveras S.L. Tots els drets reservats.
      </div>
    </footer>
  );
}
