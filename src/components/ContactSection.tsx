import { useState } from "react";
import { Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactSection() {
  const [form, setForm] = useState({ nom: "", telefon: "", missatge: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.telefon.trim() || !form.missatge.trim()) {
      toast.error("Si us plau, omple tots els camps.");
      return;
    }
    toast.success("Missatge enviat correctament! Et contactarem aviat.");
    setForm({ nom: "", telefon: "", missatge: "" });
  };

  return (
    <section id="contacte" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            <span className="text-primary">Contacta</span>'ns
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info + Map */}
          <div>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Garatge Oliveras S.L.</p>
                  <p className="text-sm text-muted-foreground">Carretera Orriols - L'Escala, 16, Bajo</p>
                  <p className="text-sm text-muted-foreground">17137 Viladamat, Girona</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+34972788102" className="font-semibold text-foreground hover:text-primary transition-colors">
                    +34 972 78 81 02
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Horari</p>
                  <p className="text-sm text-muted-foreground">Dilluns – Divendres: 9:00–13:30 / 15:00–18:30</p>
                  <p className="text-sm text-muted-foreground">Dissabte i diumenge: Tancat</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-border aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2963.5!2d3.0789!3d42.1186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ba91d0a5f7b3d7%3A0x4b6f9c0e7a8d5e2f!2sViladamat%2C%20Girona!5e0!3m2!1sca!2ses!4v1690000000000!5m2!1sca!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicació Garatge Oliveras"
              />
            </div>
          </div>

          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nom" className="text-sm font-medium text-foreground mb-1 block">Nom</label>
                <Input
                  id="nom"
                  value={form.nom}
                  onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                  placeholder="El teu nom"
                  maxLength={100}
                />
              </div>
              <div>
                <label htmlFor="telefon" className="text-sm font-medium text-foreground mb-1 block">Telèfon</label>
                <Input
                  id="telefon"
                  type="tel"
                  value={form.telefon}
                  onChange={e => setForm(f => ({ ...f, telefon: e.target.value }))}
                  placeholder="El teu telèfon"
                  maxLength={20}
                />
              </div>
              <div>
                <label htmlFor="missatge" className="text-sm font-medium text-foreground mb-1 block">Missatge</label>
                <Textarea
                  id="missatge"
                  value={form.missatge}
                  onChange={e => setForm(f => ({ ...f, missatge: e.target.value }))}
                  placeholder="Escriu el teu missatge..."
                  rows={5}
                  maxLength={1000}
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                <Send className="w-4 h-4 mr-2" /> Enviar missatge
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
