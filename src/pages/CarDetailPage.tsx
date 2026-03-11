import { useParams, Link } from "react-router-dom";
import { getCars } from "@/data/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AdminGear from "@/components/AdminGear";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ArrowLeft } from "lucide-react";
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
          <Button asChild variant="outline"><Link to="/cataleg"><ArrowLeft className="w-4 h-4 mr-2" /> Tornar al catàleg</Link></Button>
        </main>
        <Footer />
      </>
    );
  }

  const whatsappMsg = encodeURIComponent(`Hola, m'interessa el ${car.brand} ${car.model} (${car.year}) que teniu al vostre web.`);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="section-padding">
          <div className="max-w-5xl mx-auto">
            <Link to="/cataleg" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Tornar al catàleg
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Gallery */}
              <div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-3">
                  <img src={car.photos[selectedPhoto] || car.photos[0]} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
                </div>
                {car.photos.length > 1 && (
                  <div className="flex gap-2">
                    {car.photos.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedPhoto(i)}
                        className={`w-16 h-12 rounded overflow-hidden border-2 transition-colors ${i === selectedPhoto ? "border-primary" : "border-border"}`}
                      >
                        <img src={p} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                    {car.brand} {car.model}
                  </h1>
                  <Badge variant="outline" className={statusClass[car.status]}>{car.status}</Badge>
                </div>

                <p className="font-heading text-3xl font-bold text-primary mb-6">
                  {car.price.toLocaleString("ca-ES")} €
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span>📅 {car.year}</span>
                  <span>🛣️ {car.km.toLocaleString("ca-ES")} km</span>
                </div>

                <p className="text-foreground mb-6">{car.description}</p>

                {/* Specs */}
                {car.specs && (
                  <div className="border border-border rounded-lg p-4 mb-6">
                    <h3 className="font-heading font-semibold text-foreground mb-3">Fitxa tècnica</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(car.specs).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{k}</span>
                          <span className="font-medium text-foreground">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="flex-1">
                    <a href="tel:+34972788102"><Phone className="w-4 h-4 mr-2" /> Trucar</a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="flex-1">
                    <a href={`https://wa.me/34972788102?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <AdminGear />
    </>
  );
}
