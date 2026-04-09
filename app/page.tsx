import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Philosophy from "./components/Philosophy";
import Protocol from "./components/Protocol";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
}
