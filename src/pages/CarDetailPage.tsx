import { useParams, Link } from "react-router-dom";
import { getCars, getCarPhotos } from "@/data/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminGear from "@/components/AdminGear";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, ArrowLeft, Calendar, Gauge, Send } from "lucide-react";
import { useState } from "react";

const statusClass: Record<string, string> = {
  Disponible: "badge-disponible",
  Reservat: "badge-reservat",
  Venut: "badge-venut",
};

export default function CarDetailPage() {
  const { id } = useParams();
  const car = getCars().find(c => c.id === id);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  if (!car) {
    return (
      <>
        <Navbar />
        <main className="pt-24 text-center section-padding">
          <p className="text-muted-foreground mb-4">Vehicle no trobat.</p>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/cataleg"><ArrowLeft className="w-4 h-4 mr-2" /> Tornar al catàleg</Link>
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  const photos = getCarPhotos(car);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Dark header */}
        <div className="section-dark py-8 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <Link to="/cataleg" className="inline-flex items-center text-sm text-white/60 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Tornar al catàleg
            </Link>
          </div>
        </div>

        <div className="section-padding bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Gallery */}
              <div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted mb-3 premium-shadow">
                  <img src={photos[selectedPhoto] || photos[0]} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
                </div>
                {photos.length > 1 && (
                  <div className="flex gap-2">
                    {photos.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedPhoto(i)}
                        className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${i === selectedPhoto ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/30"}`}
                      >
                        <img src={p} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
                    {car.brand} {car.model}
                  </h1>
                  <Badge variant="outline" className={`${statusClass[car.status]} text-sm`}>{car.status}</Badge>
                </div>

                <p className="font-heading text-3xl font-extrabold text-primary mb-6">
                  {car.price.toLocaleString("ca-ES")} €
                </p>

                <div className="flex items-center gap-5 text-sm text-muted-foreground mb-6">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {car.year}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Gauge className="w-4 h-4" /> {car.km.toLocaleString("ca-ES")} km
                  </span>
                </div>

                <p className="text-foreground mb-8 leading-relaxed">{car.description}</p>

                {/* Specs */}
                {car.specs && (
                  <div className="rounded-2xl border border-border p-5 mb-8 bg-muted/50">
                    <h3 className="font-heading font-bold text-foreground mb-4">Fitxa tècnica</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(car.specs).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
                          <span className="text-muted-foreground">{k}</span>
                          <span className="font-medium text-foreground">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="flex-1 rounded-full h-12">
                    <a href="tel:+34972788102"><Phone className="w-4 h-4 mr-2" /> Trucar ara</a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="flex-1 rounded-full h-12">
                    <a href="/#contacte"><Send className="w-4 h-4 mr-2" /> Demanar informació</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AdminGear />
    </>
  );
}
