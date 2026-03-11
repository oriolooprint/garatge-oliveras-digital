import { useState } from "react";
import { Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getSiteConfig } from "@/data/store";

export default function ContactSection() {
  const [form, setForm] = useState({ nom: "", telefon: "", missatge: "" });
  const config = getSiteConfig();

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
    <section id="contacte" className="section-padding section-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary font-medium text-sm tracking-wider uppercase mb-3">Contacte</p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
            Contacta'ns
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info + Map */}
          <div>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Garatge Oliveras S.L.</p>
                  <p className="text-sm text-white/60">{config.address}</p>
                  <p className="text-sm text-white/60">{config.postalCode} {config.city}, {config.province}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+34972788102" className="font-semibold text-white hover:text-primary transition-colors">
                    {config.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white mb-1">Horari</p>
                  <p className="text-sm text-white/60">{config.openingHours}</p>
                  <p className="text-sm text-white/60">{config.weekendHours}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video">
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
          <div className="rounded-2xl bg-card p-8 premium-shadow">
            <h3 className="font-heading font-bold text-card-foreground text-lg mb-6">Envia'ns un missatge</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="nom" className="text-sm font-medium text-foreground mb-1.5 block">Nom</label>
                <Input
                  id="nom"
                  value={form.nom}
                  onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                  placeholder="El teu nom"
                  maxLength={100}
                  className="rounded-xl h-11"
                />
              </div>
              <div>
                <label htmlFor="telefon" className="text-sm font-medium text-foreground mb-1.5 block">Telèfon</label>
                <Input
                  id="telefon"
                  type="tel"
                  value={form.telefon}
                  onChange={e => setForm(f => ({ ...f, telefon: e.target.value }))}
                  placeholder="El teu telèfon"
                  maxLength={20}
                  className="rounded-xl h-11"
                />
              </div>
              <div>
                <label htmlFor="missatge" className="text-sm font-medium text-foreground mb-1.5 block">Missatge</label>
                <Textarea
                  id="missatge"
                  value={form.missatge}
                  onChange={e => setForm(f => ({ ...f, missatge: e.target.value }))}
                  placeholder="Escriu el teu missatge..."
                  rows={5}
                  maxLength={1000}
                  className="rounded-xl"
                />
              </div>
              <Button type="submit" size="lg" className="w-full rounded-full h-12">
                <Send className="w-4 h-4 mr-2" /> Enviar missatge
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
