import { ReactNode, useEffect, useRef, useState } from "react";

interface LazyMountProps {
  children: ReactNode;
  className?: string;
  minHeight?: number;
  rootMargin?: string;
  id?: string;
}

const LazyMount = ({
  children,
  className,
  minHeight = 320,
  rootMargin = "200px 0px",
  id,
}: LazyMountProps) => {
  const [mounted, setMounted] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mounted) return;
    const node = hostRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div id={id} ref={hostRef} className={className} style={!mounted ? { minHeight } : undefined}>
      {mounted ? children : null}
    </div>
  );
};

export default LazyMount;
