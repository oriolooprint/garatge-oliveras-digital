import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

export type CarStatus = "Disponible" | "Reservat" | "Venut";

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  price: number;
  description: string;
  status: CarStatus;
  photos: string[];
  specs?: Record<string, string>;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const defaultHeroImages: string[] = [hero1, hero2, hero3];

const defaultCars: Car[] = [
  {
    id: "1",
    brand: "Seat",
    model: "León 1.6 TDI Style",
    year: 2019,
    km: 78000,
    price: 14900,
    description: "Seat León en perfecte estat, llibre de manteniment al dia. Motor 1.6 TDI de 115 CV, canvi manual de 6 velocitats. Equipat amb navegador, càmera de marxa enrere i sensors d'aparcament.",
    status: "Disponible",
    photos: [car3],
    specs: {
      "Motor": "1.6 TDI 115 CV",
      "Canvi": "Manual 6 velocitats",
      "Combustible": "Dièsel",
      "Color": "Blau fosc",
      "Portes": "5",
      "Potència": "115 CV",
    },
  },
  {
    id: "2",
    brand: "Renault",
    model: "Captur Zen 1.5 dCi",
    year: 2020,
    km: 52000,
    price: 16500,
    description: "Renault Captur en excel·lent estat. SUV compacte amb motor dièsel econòmic. Equipat amb pantalla tàctil, climatitzador automàtic i ajuda a l'aparcament.",
    status: "Disponible",
    photos: [car2],
    specs: {
      "Motor": "1.5 dCi 115 CV",
      "Canvi": "Manual 6 velocitats",
      "Combustible": "Dièsel",
      "Color": "Vermell",
      "Portes": "5",
      "Potència": "115 CV",
    },
  },
  {
    id: "3",
    brand: "Toyota",
    model: "Corolla 1.8 Hybrid",
    year: 2021,
    km: 35000,
    price: 22900,
    description: "Toyota Corolla híbrid amb molt poc quilometratge. Consum molt reduït i manteniment econòmic. Equipat amb sistema de seguretat Toyota Safety Sense.",
    status: "Reservat",
    photos: [car1],
    specs: {
      "Motor": "1.8 Hybrid 122 CV",
      "Canvi": "Automàtic CVT",
      "Combustible": "Híbrid",
      "Color": "Plata",
      "Portes": "5",
      "Potència": "122 CV",
    },
  },
  {
    id: "4",
    brand: "Ford",
    model: "Galaxy 2.0 TDCi Titanium",
    year: 2018,
    km: 110000,
    price: 18500,
    description: "Ford Galaxy de 7 places, ideal per a famílies. Motor 2.0 TDCi de 150 CV, canvi automàtic. Equipat amb seients de cuir, sostre panoràmic i navegador.",
    status: "Venut",
    photos: [car4],
    specs: {
      "Motor": "2.0 TDCi 150 CV",
      "Canvi": "Automàtic 6 velocitats",
      "Combustible": "Dièsel",
      "Color": "Blanc",
      "Portes": "5",
      "Potència": "150 CV",
      "Places": "7",
    },
  },
];

const defaultReviews: Review[] = [
  { id: "1", name: "Marc P.", rating: 5, text: "Molt bon servei, professionals i honestos. Vaig portar el cotxe per una revisió i em van explicar tot amb detall.", date: "Fa 2 setmanes" },
  { id: "2", name: "Anna G.", rating: 5, text: "Vaig comprar un cotxe d'ocasió i estic molt contenta. Tot transparent i sense sorpreses.", date: "Fa 1 mes" },
  { id: "3", name: "Jordi M.", rating: 4, text: "Bon taller, preus raonables i feina ben feta. El recomano.", date: "Fa 2 mesos" },
  { id: "4", name: "Laura S.", rating: 5, text: "Sempre porto els cotxes aquí. Confiança total. Gent molt amable.", date: "Fa 3 mesos" },
  { id: "5", name: "Pere R.", rating: 5, text: "Servei ràpid i eficient. Em van solucionar un problema elèctric que altres tallers no trobaven.", date: "Fa 4 mesos" },
  { id: "6", name: "Marta V.", rating: 4, text: "Bon tracte i bon preu. Vaig fer el canvi d'oli i filtres sense cita prèvia.", date: "Fa 5 mesos" },
];

// Simple localStorage-based store
const STORAGE_KEY_CARS = "garatge-oliveras-cars";
const STORAGE_KEY_HERO = "garatge-oliveras-hero";

export function getCars(): Car[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_CARS);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultCars;
}

export function saveCars(cars: Car[]) {
  localStorage.setItem(STORAGE_KEY_CARS, JSON.stringify(cars));
}

export function getHeroImages(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_HERO);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultHeroImages;
}

export function saveHeroImages(images: string[]) {
  localStorage.setItem(STORAGE_KEY_HERO, JSON.stringify(images));
}

export function getReviews(): Review[] {
  return defaultReviews;
}

export function getUniqueBrands(cars: Car[]): string[] {
  return [...new Set(cars.map(c => c.brand))].sort();
}
