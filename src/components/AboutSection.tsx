import { Shield, Users, ThumbsUp } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="sobre" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Sobre <span className="text-primary">nosaltres</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Garatge Oliveras S.L. és un taller mecànic de confiança situat a Viladamat, Girona. 
            Oferim serveis de reparació, manteniment i venda de cotxes d'ocasió amb anys d'experiència 
            al sector automobilístic.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Confiança", desc: "Transparència i honestedat en cada servei. Et donem un pressupost clar abans de començar." },
            { icon: Users, title: "Experiència", desc: "Anys d'experiència en mecànica i venda de vehicles. Coneixem cada detall del teu cotxe." },
            { icon: ThumbsUp, title: "Garantia", desc: "Tots els nostres serveis i vehicles d'ocasió inclouen garantia per a la teva tranquil·litat." },
          ].map(v => (
            <div key={v.title} className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <v.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
