import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { getReviews, getReviewsConfig } from "@/data/store";
import { Button } from "@/components/ui/button";

export default function ReviewsSection() {
  const reviews = getReviews();
  const config = getReviewsConfig();
  const [idx, setIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const update = () => setVisibleCount(window.innerWidth >= 768 ? 3 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Clamp index when visibleCount changes
  useEffect(() => {
    setIdx(i => Math.min(i, Math.max(0, reviews.length - visibleCount)));
  }, [visibleCount, reviews.length]);

  const prev = () => setIdx(i => (i === 0 ? reviews.length - visibleCount : i - 1));
  const next = () => setIdx(i => (i >= reviews.length - visibleCount ? 0 : i + 1));

  const fullStars = Math.floor(config.rating);
  const hasHalf = config.rating % 1 >= 0.3;

  return (
    <section id="ressenyes" className="section-padding bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary font-medium text-sm tracking-wider uppercase mb-3">Ressenyes</p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-6">
            Què diuen els nostres clients
          </h2>

          {/* Google rating summary */}
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-card border border-border premium-shadow">
            <div className="flex items-center gap-1">
              <span className="font-heading text-4xl font-extrabold text-foreground">{config.rating}</span>
            </div>
            <div className="text-left">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star
                    key={s}
                    className={`w-5 h-5 ${
                      s <= fullStars
                        ? "fill-amber-400 text-amber-400"
                        : s === fullStars + 1 && hasHalf
                          ? "fill-amber-400/50 text-amber-400/50"
                          : "text-border"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{config.reviewCount} ressenyes a Google</p>
            </div>
            {/* Google icon placeholder */}
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
              G
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${idx * (100 / visibleCount)}%)` }}
            >
              {reviews.map(r => (
                <div key={r.id} className="flex-shrink-0 px-3" style={{ width: `${100 / visibleCount}%` }}>
                  <div className="rounded-2xl bg-card border border-border p-6 h-full premium-shadow">
                    <div className="flex items-center gap-0.5 mb-4">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={`w-4 h-4 ${s <= r.rating ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-card-foreground mb-5 leading-relaxed">"{r.text}"</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{r.name.charAt(0)}</span>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-card-foreground block">{r.name}</span>
                          <span className="text-xs text-muted-foreground">{r.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors">
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" className="rounded-full">
            <a
              href={config.googlePlaceId ? `https://search.google.com/local/reviews?placeid=${config.googlePlaceId}` : "https://www.google.com/maps/search/Garatge+Oliveras+Viladamat"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" /> Veure ressenyes a Google
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
