import { useState, useEffect, useRef } from "react";

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

    // Start sequence
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
    <section id="home" className="min-h-screen flex items-center grid-bg pt-16">
      <div className="section-container py-24 md:py-32">
        <div className="max-w-4xl">
          <h1 className="section-title text-4xl md:text-5xl lg:text-6xl leading-tight min-h-[4em] md:min-h-[3em]">
            {displayText}
            {showCursor && <span className="cursor-blink text-primary">_</span>}
          </h1>
          <p className="section-subtitle mt-6 text-lg md:text-xl leading-relaxed">
            Problem Info Tech builds scalable SaaS products and custom digital
            solutions for modern businesses.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button onClick={() => scrollTo("contact")} className="btn-primary">
              Request Demo
            </button>
            <button onClick={() => scrollTo("contact")} className="btn-secondary">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
