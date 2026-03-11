import { useState, useRef } from "react";
import { Settings } from "lucide-react";
import AdminPanel from "./AdminPanel";

export default function AdminGear() {
  const [open, setOpen] = useState(false);
  const clickTimesRef = useRef<number[]>([]);

  const handleClick = () => {
    const now = Date.now();
    clickTimesRef.current.push(now);
    // Keep only last 3 clicks
    clickTimesRef.current = clickTimesRef.current.slice(-3);

    if (clickTimesRef.current.length === 3) {
      const diff = clickTimesRef.current[2] - clickTimesRef.current[0];
      if (diff < 1000) {
        setOpen(true);
        clickTimesRef.current = [];
      }
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center opacity-30 hover:opacity-60 transition-opacity"
        aria-label="Configuració"
      >
        <Settings className="w-4 h-4 text-muted-foreground" />
      </button>
      {open && <AdminPanel onClose={() => setOpen(false)} />}
    </>
  );
}
