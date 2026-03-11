import { Wrench, Droplets, Disc, Cpu, Circle, ClipboardCheck, Settings } from "lucide-react";

const services = [
  { icon: ClipboardCheck, title: "Revisió i manteniment", desc: "Revisions periòdiques per mantenir el teu vehicle en perfecte estat." },
  { icon: Droplets, title: "Canvi d'oli i filtres", desc: "Oli i filtres de qualitat per allargar la vida del motor." },
  { icon: Disc, title: "Frens", desc: "Revisió i substitució de pastilles, discos i líquid de frens." },
  { icon: Cpu, title: "Diagnosi electrònica", desc: "Lectura d'errors i diagnòstic complet amb equip professional." },
  { icon: Circle, title: "Pneumàtics", desc: "Canvi, equilibrat i alineació de pneumàtics de totes les marques." },
  { icon: Settings, title: "ITV pre-revisió", desc: "Preparem el teu vehicle perquè passi la ITV sense problemes." },
  { icon: Wrench, title: "Reparació general", desc: "Reparacions mecàniques de tot tipus amb garantia." },
];

export default function ServicesSection() {
  return (
    <section id="serveis" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Els nostres <span className="text-primary">serveis</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Oferim un servei complet de mecànica i manteniment per al teu vehicle.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-lg border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-card-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
