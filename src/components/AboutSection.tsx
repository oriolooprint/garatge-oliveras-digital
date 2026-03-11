import { Shield, Users, ThumbsUp } from "lucide-react";

const values = [
  { icon: Shield, title: "Confiança", desc: "Transparència i honestedat en cada servei. Et donem un pressupost clar abans de començar." },
  { icon: Users, title: "Experiència", desc: "Anys d'experiència en mecànica i venda de vehicles. Coneixem cada detall del teu cotxe." },
  { icon: ThumbsUp, title: "Garantia", desc: "Tots els nostres serveis i vehicles d'ocasió inclouen garantia per a la teva tranquil·litat." },
];

export default function AboutSection() {
  return (
    <section id="sobre" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary font-medium text-sm tracking-wider uppercase mb-3">Sobre nosaltres</p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            El teu taller de confiança
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Garatge Oliveras S.L. és un taller mecànic de confiança situat a Viladamat, Girona.
            Oferim serveis de reparació, manteniment i venda de cotxes d'ocasió amb anys d'experiència
            al sector automobilístic.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map(v => (
            <div key={v.title} className="text-center p-8 rounded-2xl bg-card border border-border premium-shadow">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <v.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
