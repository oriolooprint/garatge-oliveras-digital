import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import CarsSection from "@/components/CarsSection";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AdminGear from "@/components/AdminGear";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <CarsSection />
        <AboutSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <AdminGear />
    </>
  );
};

export default Index;
