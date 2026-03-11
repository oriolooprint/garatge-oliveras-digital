import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Inici" },
  { href: "/#serveis", label: "Serveis" },
  { href: "/#cotxes", label: "Cotxes" },
  { href: "/cataleg", label: "Catàleg" },
  { href: "/#sobre", label: "Sobre nosaltres" },
  { href: "/#ressenyes", label: "Ressenyes" },
  { href: "/#contacte", label: "Contacte" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-secondary">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="font-heading text-lg font-bold text-secondary-foreground tracking-tight">
          Garatge<span className="text-primary"> Oliveras</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(l => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => handleClick(l.href)}
              className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2">
            <a href="tel:+34972788102">
              <Phone className="w-4 h-4 mr-1" /> Trucar
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-secondary-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-secondary border-t border-secondary pb-4">
          {navLinks.map(l => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => handleClick(l.href)}
              className="block px-6 py-3 text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="px-6 pt-2">
            <Button asChild size="sm" className="w-full">
              <a href="tel:+34972788102">
                <Phone className="w-4 h-4 mr-1" /> Trucar ara
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
