import { Phone, MapPin } from "lucide-react";
import { getSiteConfig } from "@/data/store";

export default function Footer() {
  const config = getSiteConfig();

  return (
    <footer className="section-dark-secondary py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="font-heading text-lg font-bold mb-3 text-white">
            Garatge<span className="text-primary"> Oliveras</span> S.L.
          </p>
          <p className="text-sm text-white/50 leading-relaxed">
            Taller mecànic i venda de cotxes d'ocasió a {config.city}, {config.province}.
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            {config.address}, {config.postalCode} {config.city}
          </div>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Phone className="w-4 h-4 text-primary flex-shrink-0" />
            <a href="tel:+34972788102" className="hover:text-primary transition-colors">{config.phone}</a>
          </div>
        </div>
        <div className="text-sm text-white/50">
          <p className="mb-1 font-medium text-white/70">Horari</p>
          <p>{config.openingHours}</p>
          <p>{config.weekendHours}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Garatge Oliveras S.L. Tots els drets reservats.
      </div>
    </footer>
  );
}
