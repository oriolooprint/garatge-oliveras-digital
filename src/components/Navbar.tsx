import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Inici" },
  { href: "/#serveis", label: "Serveis" },
  { href: "/cataleg", label: "Cotxes" },
  { href: "/#sobre", label: "Sobre nosaltres" },
  { href: "/#ressenyes", label: "Ressenyes" },
  { href: "/#contacte", label: "Contacte" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-surface-dark/95 backdrop-blur-xl shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 lg:h-18">
        <Link to="/" className="font-heading text-lg font-bold text-white tracking-tight">
          Garatge<span className="text-primary"> Oliveras</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(l => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => handleClick(l.href)}
              className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            >
              {l.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-3 rounded-full">
            <a href="tel:+34972788102">
              <Phone className="w-4 h-4 mr-1.5" /> Trucar ara
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-white p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-surface-dark/98 backdrop-blur-xl border-t border-white/5 pb-6">
          {navLinks.map(l => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => handleClick(l.href)}
              className="block px-6 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="px-6 pt-3">
            <Button asChild size="sm" className="w-full rounded-full">
              <a href="tel:+34972788102">
                <Phone className="w-4 h-4 mr-1.5" /> Trucar ara
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
