import ContactSection from "@/components/sections/contact-section";
import HeroSection from "@/components/sections/hero-section";
import ProductSection from "@/components/sections/product-section";
import TestimonialSection from "@/components/sections/testimonial-section";


export default function Home() {
  return (
    <>
        <HeroSection />
        <ProductSection />
        <TestimonialSection />
        <ContactSection />
    </>
  );
}