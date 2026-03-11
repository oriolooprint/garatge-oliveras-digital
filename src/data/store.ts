import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

export type CarStatus = "Disponible" | "Reservat" | "Venut";

export interface CarImage {
  id: string;
  sourceType: "url" | "file";
  url: string;
  alt: string;
  sortOrder: number;
  isCover: boolean;
}

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
  images?: CarImage[];
  specs?: Record<string, string>;
}

export interface HeroImage {
  id: string;
  sourceType: "url" | "file";
  url: string;
  title?: string;
  alt: string;
  active: boolean;
  sortOrder: number;
}

export interface ReviewsConfig {
  googlePlaceId: string;
  apiKeyNote: string;
  liveSyncEnabled: boolean;
  fallbackSummary: string;
  rating: number;
  reviewCount: number;
}

export interface SiteConfig {
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  heroHeadline: string;
  heroSubheadline: string;
  openingHours: string;
  weekendHours: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const defaultHeroImages: HeroImage[] = [
  { id: "h1", sourceType: "file", url: hero1, title: "", alt: "Garatge Oliveras taller", active: true, sortOrder: 0 },
  { id: "h2", sourceType: "file", url: hero2, title: "", alt: "Reparació de vehicles", active: true, sortOrder: 1 },
  { id: "h3", sourceType: "file", url: hero3, title: "", alt: "Cotxes d'ocasió", active: true, sortOrder: 2 },
];

const defaultCars: Car[] = [
  {
    id: "1",
    brand: "Seat",
    model: "León 1.6 TDI Style (exemple 1)",
    year: 2019,
    km: 78000,
    price: 14900,
    description: "Seat León en perfecte estat, llibre de manteniment al dia. Motor 1.6 TDI de 115 CV, canvi manual de 6 velocitats. Equipat amb navegador, càmera de marxa enrere i sensors d'aparcament.",
    status: "Disponible",
    photos: [car1],
    specs: { "Motor": "1.6 TDI 115 CV", "Canvi": "Manual 6 velocitats", "Combustible": "Dièsel", "Color": "Blau fosc", "Portes": "5", "Potència": "115 CV" },
  },
  {
    id: "2",
    brand: "Renault",
    model: "Captur Zen 1.5 dCi (exemple 2)",
    year: 2020,
    km: 52000,
    price: 16500,
    description: "Renault Captur en excel·lent estat. SUV compacte amb motor dièsel econòmic. Equipat amb pantalla tàctil, climatitzador automàtic i ajuda a l'aparcament.",
    status: "Disponible",
    photos: [car2],
    specs: { "Motor": "1.5 dCi 115 CV", "Canvi": "Manual 6 velocitats", "Combustible": "Dièsel", "Color": "Vermell", "Portes": "5", "Potència": "115 CV" },
  },
  {
    id: "3",
    brand: "Toyota",
    model: "Corolla 1.8 Hybrid (exemple 3)",
    year: 2021,
    km: 35000,
    price: 22900,
    description: "Toyota Corolla híbrid amb molt poc quilometratge. Consum molt reduït i manteniment econòmic. Equipat amb sistema de seguretat Toyota Safety Sense.",
    status: "Reservat",
    photos: [car3],
    specs: { "Motor": "1.8 Hybrid 122 CV", "Canvi": "Automàtic CVT", "Combustible": "Híbrid", "Color": "Plata", "Portes": "5", "Potència": "122 CV" },
  },
  {
    id: "4",
    brand: "Ford",
    model: "Galaxy 2.0 TDCi Titanium (exemple 4)",
    year: 2018,
    km: 110000,
    price: 18500,
    description: "Ford Galaxy de 7 places, ideal per a famílies. Motor 2.0 TDCi de 150 CV, canvi automàtic. Equipat amb seients de cuir, sostre panoràmic i navegador.",
    status: "Venut",
    photos: [car4],
    specs: { "Motor": "2.0 TDCi 150 CV", "Canvi": "Automàtic 6 velocitats", "Combustible": "Dièsel", "Color": "Blanc", "Portes": "5", "Potència": "150 CV", "Places": "7" },
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

const defaultReviewsConfig: ReviewsConfig = {
  googlePlaceId: "",
  apiKeyNote: "Configura la clau d'API de Google Places per sincronitzar ressenyes reals.",
  liveSyncEnabled: false,
  fallbackSummary: "4.6 estrelles basades en 148 ressenyes de Google",
  rating: 4.6,
  reviewCount: 148,
};

const defaultSiteConfig: SiteConfig = {
  phone: "+34 972 78 81 02",
  address: "Carretera Orriols - L'Escala, 16, Bajo",
  city: "Viladamat",
  postalCode: "17137",
  province: "Girona",
  heroHeadline: "Taller mecànic de confiança a Viladamat",
  heroSubheadline: "Reparació, manteniment i venda de cotxes d'ocasió",
  openingHours: "Dilluns – Divendres: 9:00–13:30 / 15:00–18:30",
  weekendHours: "Dissabte i diumenge: Tancat",
};

// Storage keys
const STORAGE_CARS = "go-cars";
const STORAGE_HERO = "go-hero-v2";
const STORAGE_REVIEWS_CONFIG = "go-reviews-config";
const STORAGE_SITE_CONFIG = "go-site-config";

// Event-based reactivity for admin changes
const STORE_CHANGE_EVENT = "store-change";

export function emitStoreChange() {
  window.dispatchEvent(new CustomEvent(STORE_CHANGE_EVENT));
}

export function onStoreChange(callback: () => void): () => void {
  window.addEventListener(STORE_CHANGE_EVENT, callback);
  return () => window.removeEventListener(STORE_CHANGE_EVENT, callback);
}

function loadJson<T>(key: string, fallback: T): T {
  try {
    const s = localStorage.getItem(key);
    if (s) return JSON.parse(s);
  } catch {}
  return fallback;
}

function saveJson(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getCars(): Car[] { return loadJson(STORAGE_CARS, defaultCars); }
export function saveCars(cars: Car[]) { saveJson(STORAGE_CARS, cars); emitStoreChange(); }

export function getHeroImages(): HeroImage[] { return loadJson(STORAGE_HERO, defaultHeroImages); }
export function saveHeroImages(images: HeroImage[]) { saveJson(STORAGE_HERO, images); emitStoreChange(); }

export function getReviewsConfig(): ReviewsConfig { return loadJson(STORAGE_REVIEWS_CONFIG, defaultReviewsConfig); }
export function saveReviewsConfig(config: ReviewsConfig) { saveJson(STORAGE_REVIEWS_CONFIG, config); emitStoreChange(); }

export function getSiteConfig(): SiteConfig { return loadJson(STORAGE_SITE_CONFIG, defaultSiteConfig); }
export function saveSiteConfig(config: SiteConfig) { saveJson(STORAGE_SITE_CONFIG, config); emitStoreChange(); }

export function getReviews(): Review[] { return defaultReviews; }

export function getUniqueBrands(cars: Car[]): string[] {
  return [...new Set(cars.map(c => c.brand))].sort();
}

export function getCarCoverPhoto(car: Car): string {
  if (car.images && car.images.length > 0) {
    const cover = car.images.find(i => i.isCover) || car.images[0];
    return cover.url;
  }
  return car.photos[0] || "";
}

export function getCarPhotos(car: Car): string[] {
  if (car.images && car.images.length > 0) {
    return car.images.sort((a, b) => a.sortOrder - b.sortOrder).map(i => i.url);
  }
  return car.photos;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
