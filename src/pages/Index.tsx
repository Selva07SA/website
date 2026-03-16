import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Services from "@/components/Services";
import TrustedUs from "@/components/TrustedUs";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Navbar />
    <Hero />
    <div className="content-visibility">
      <Products />
    </div>
    <div className="content-visibility">
      <Services />
    </div>
    <div className="content-visibility">
      <TrustedUs />
    </div>
    <div className="content-visibility">
      <WhyChooseUs />
    </div>
    <div className="content-visibility">
      <Process />
    </div>
    <div className="content-visibility">
      <Portfolio />
    </div>
    <div className="content-visibility">
      <Testimonials />
    </div>
    <div className="content-visibility">
      <CtaSection />
    </div>
    <div className="content-visibility">
      <Contact />
    </div>
    <Footer />
  </>
);

export default Index;
