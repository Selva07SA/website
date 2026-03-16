import AnimatedSection from "./AnimatedSection";

const isJpeg = (src: string) => /\.jpe?g$/i.test(src);
const toWebp = (src: string) => src.replace(/\.jpe?g$/i, ".webp");
const toAvif = (src: string) => src.replace(/\.jpe?g$/i, ".avif");

const logos = [
  { src: "/trusted/logo-1.jpeg", alt: "Trusted company logo 1" },
  { src: "/trusted/logo-2.jpeg", alt: "Trusted company logo 2" },
  { src: "/trusted/logo-3.jpeg", alt: "Trusted company logo 3" },
  { src: "/trusted/logo-4.jpeg", alt: "Trusted company logo 4" },
  { src: "/trusted/logo-5.jpeg", alt: "Trusted company logo 5" },
  { src: "/trusted/logo-6.jpeg", alt: "Trusted company logo 6" },
] as const;

const TrustedUs = () => (
  <section aria-label="Trusted by" className="py-20 bg-background">
    <div className="section-container">
      <AnimatedSection>
        <p className="font-body text-sm text-muted-foreground tracking-widest uppercase mb-4">Trusted By</p>
        <h2 className="section-title mb-10">Teams that trust us</h2>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <div className="relative overflow-hidden">
          <div className="marquee flex w-max items-center gap-6 py-8 px-0 animate-marquee motion-reduce:animate-none">
            {[...logos, ...logos].map((logo, idx) => (
              <div
                key={`${logo.src}-${idx}`}
                className="flex items-center justify-center w-52 h-20 md:w-56 md:h-24 px-6 rounded-xl bg-background shadow-sm"
              >
                {isJpeg(logo.src) ? (
                  <picture className="block">
                    <source srcSet={toAvif(logo.src)} type="image/avif" />
                    <source srcSet={toWebp(logo.src)} type="image/webp" />
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-14 md:max-h-16 max-w-full object-contain"
                      width={160}
                      height={64}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                ) : (
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-14 md:max-h-16 max-w-full object-contain"
                    width={160}
                    height={64}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default TrustedUs;
