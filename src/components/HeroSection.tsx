import { useState, useEffect } from "react";
import { Phone, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHeroImages } from "@/data/store";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const images = getHeroImages();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background slides */}
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={img} alt="Garatge Oliveras" className="w-full h-full object-cover" />
        </div>
      ))}
      {/* Overlay */}
      <div className="absolute inset-0 bg-secondary/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-4 leading-tight">
          Taller mecànic de confiança a <span className="text-primary">Viladamat</span>
        </h1>
        <p className="text-lg md:text-xl text-secondary-foreground/80 mb-8">
          Reparació, manteniment i venda de cotxes d'ocasió
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-base">
            <a href="tel:+34972788102">
              <Phone className="w-5 h-5 mr-2" /> Trucar ara
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-base border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10">
            <Link to="/cataleg">
              <Car className="w-5 h-5 mr-2" /> Veure cotxes disponibles
            </Link>
          </Button>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-primary w-8" : "bg-secondary-foreground/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
