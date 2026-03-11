import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/34972788102?text=Hola%2C%20voldria%20informaci%C3%B3%20sobre%20els%20vostres%20serveis."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center shadow-lg transition-colors"
      aria-label="Contactar per WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-background" />
    </a>
  );
}
