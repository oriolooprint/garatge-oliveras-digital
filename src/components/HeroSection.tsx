import { useState, useEffect } from "react";
import { Phone, Car, Star, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHeroImages, getSiteConfig } from "@/data/store";
import { Link } from "react-router-dom";

const trustBadges = [
  { icon: Star, label: "4.6★ a Google" },
  { icon: Shield, label: "Garantia inclosa" },
  { icon: Award, label: "+30 anys d'experiència" },
];

export default function HeroSection() {
  const heroImages = getHeroImages().filter(h => h.active).sort((a, b) => a.sortOrder - b.sortOrder);
  const siteConfig = getSiteConfig();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(() => setCurrent(c => (c + 1) % heroImages.length), 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background slides */}
      {heroImages.map((img, i) => (
        <div
          key={img.id}
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={img.url}
            alt={img.alt || "Garatge Oliveras"}
            className="w-full h-full object-cover scale-105"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(225,16%,8%)]/80 via-[hsl(225,16%,8%)]/60 to-[hsl(225,16%,8%)]/90" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Taller obert · Dl–Dv 9:00–18:30
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
          {siteConfig.heroHeadline.split("Viladamat")[0]}
          <span className="text-primary">Viladamat</span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto font-light">
          {siteConfig.heroSubheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button asChild size="lg" className="text-base rounded-full px-8 h-12 shadow-lg shadow-primary/25">
            <a href="tel:+34972788102">
              <Phone className="w-5 h-5 mr-2" /> Trucar ara
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-base rounded-full px-8 h-12 border-white/20 text-white hover:bg-white/10 hover:border-white/30 bg-white/5"
          >
            <Link to="/cataleg">
              <Car className="w-5 h-5 mr-2" /> Veure cotxes disponibles
            </Link>
          </Button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {trustBadges.map(b => (
            <div key={b.label} className="flex items-center gap-2 text-white/60 text-sm">
              <b.icon className="w-4 h-4 text-primary" />
              <span>{b.label}</span>
            </div>
          ))}
        </div>

        {/* Slide indicators */}
        {heroImages.length > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-500 ${i === current ? "bg-primary w-8" : "bg-white/30 w-4 hover:bg-white/50"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
