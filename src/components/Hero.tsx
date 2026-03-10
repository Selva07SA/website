import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const PROBLEM_TEXT = "Problem.";
const FINAL_TEXT = "Powerful Software Solutions to Grow Your Business";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing-problem" | "pause" | "deleting" | "typing-final" | "done">("typing-problem");
  const [showCursor, setShowCursor] = useState(true);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) {
      setDisplayText(FINAL_TEXT);
      setPhase("done");
      setShowCursor(false);
      return;
    }
    hasAnimated.current = true;

    let timeout: ReturnType<typeof setTimeout>;
    let i = 0;

    const typeText = (text: string, onDone: () => void, speed = 80) => {
      i = 0;
      const type = () => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
          timeout = setTimeout(type, speed);
        } else {
          onDone();
        }
      };
      type();
    };

    const deleteText = (text: string, onDone: () => void) => {
      let j = text.length;
      const del = () => {
        if (j > 0) {
          setDisplayText(text.slice(0, j - 1));
          j--;
          timeout = setTimeout(del, 50);
        } else {
          onDone();
        }
      };
      del();
    };

    timeout = setTimeout(() => {
      setPhase("typing-problem");
      typeText(PROBLEM_TEXT, () => {
        setPhase("pause");
        timeout = setTimeout(() => {
          setPhase("deleting");
          deleteText(PROBLEM_TEXT, () => {
            setPhase("typing-final");
            typeText(FINAL_TEXT, () => {
              setPhase("done");
              setTimeout(() => setShowCursor(false), 2000);
            }, 40);
          });
        }, 800);
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div className="section-container py-32 md:py-40 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted font-body text-xs text-muted-foreground tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
              Software Development Company
            </span>
          </motion.div>

          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.1] min-h-[3.5em] md:min-h-[2.5em]">
            {displayText}
            {showCursor && <span className="cursor-blink text-muted-foreground font-light">|</span>}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-body text-muted-foreground text-lg md:text-xl leading-relaxed mt-8 max-w-xl"
          >
            Problem Info Tech builds scalable SaaS products and custom digital
            solutions for modern businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <button onClick={() => scrollTo("contact")} className="btn-primary inline-flex items-center gap-2 group">
              Request Demo
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={() => scrollTo("contact")} className="btn-secondary">
              Start Your Project
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-20 flex gap-16"
          >
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "99%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support Available" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="font-body text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
