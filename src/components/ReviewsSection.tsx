import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { getReviews } from "@/data/store";

export default function ReviewsSection() {
  const reviews = getReviews();
  const [idx, setIdx] = useState(0);
  const visibleCount = typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1;

  const prev = () => setIdx(i => (i === 0 ? reviews.length - visibleCount : i - 1));
  const next = () => setIdx(i => (i >= reviews.length - visibleCount ? 0 : i + 1));

  return (
    <section id="ressenyes" className="section-padding section-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Ressenyes dels nostres <span className="text-primary">clients</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-heading text-4xl font-bold text-foreground">4.6</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} className={`w-6 h-6 ${s <= 4 ? "fill-amber-400 text-amber-400" : "fill-amber-400/50 text-amber-400/50"}`} />
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">148 ressenyes a Google</p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${idx * (100 / visibleCount)}%)` }}
            >
              {reviews.map(r => (
                <div key={r.id} className="flex-shrink-0 px-3" style={{ width: `${100 / visibleCount}%` }}>
                  <div className="rounded-lg border border-border bg-card p-6 h-full">
                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={`w-4 h-4 ${s <= r.rating ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-card-foreground mb-4 italic">"{r.text}"</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-card-foreground">{r.name}</span>
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors">
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
