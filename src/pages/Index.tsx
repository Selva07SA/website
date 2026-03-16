import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LazyMount from "@/components/LazyMount";

const Products = lazy(() => import("@/components/Products"));
const Services = lazy(() => import("@/components/Services"));
const TrustedUs = lazy(() => import("@/components/TrustedUs"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const Process = lazy(() => import("@/components/Process"));
const Portfolio = lazy(() => import("@/components/Portfolio"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const CtaSection = lazy(() => import("@/components/CtaSection"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => (
  <>
    <Navbar />
    <Hero />
    <LazyMount className="content-visibility" minHeight={720}>
      <Suspense fallback={<div className="section-container py-24" />}>
        <Products />
      </Suspense>
    </LazyMount>
    <LazyMount className="content-visibility" minHeight={640}>
      <Suspense fallback={<div className="section-container py-24" />}>
        <Services />
      </Suspense>
    </LazyMount>
    <LazyMount className="content-visibility" minHeight={360}>
      <Suspense fallback={<div className="section-container py-24" />}>
        <TrustedUs />
      </Suspense>
    </LazyMount>
    <LazyMount className="content-visibility" minHeight={640}>
      <Suspense fallback={<div className="section-container py-24" />}>
        <WhyChooseUs />
      </Suspense>
    </LazyMount>
    <LazyMount className="content-visibility" minHeight={520}>
      <Suspense fallback={<div className="section-container py-24" />}>
        <Process />
      </Suspense>
    </LazyMount>
    <LazyMount className="content-visibility" minHeight={720}>
      <Suspense fallback={<div className="section-container py-24" />}>
        <Portfolio />
      </Suspense>
    </LazyMount>
    <LazyMount className="content-visibility" minHeight={560}>
      <Suspense fallback={<div className="section-container py-24" />}>
        <Testimonials />
      </Suspense>
    </LazyMount>
    <LazyMount className="content-visibility" minHeight={440}>
      <Suspense fallback={<div className="section-container py-24" />}>
        <CtaSection />
      </Suspense>
    </LazyMount>
    <LazyMount className="content-visibility" minHeight={520}>
      <Suspense fallback={<div className="section-container py-24" />}>
        <Contact />
      </Suspense>
    </LazyMount>
    <Suspense fallback={<div className="section-container py-16" />}>
      <Footer />
    </Suspense>
  </>
);

export default Index;
