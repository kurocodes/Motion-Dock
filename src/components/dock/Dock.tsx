import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { DockContextValue, DockProps } from "./types";
import clsx from "clsx";

const DockContext = createContext<DockContextValue | null>(null);

export const useDock = () => {
  const ctx = useContext(DockContext);
  if (!ctx) throw new Error("useDock must be used within a DockProvider");
  return ctx;
};

export default function Dock({
  children,
  className,
  spacing = 8,
  padding = 8,
}: DockProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [rect, setRect] = useState({ width: 0, left: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Measure dock's width and left offset for proximity calculation 
    const measure = () => {
      const rect = el.getBoundingClientRect();
      setRect({ width: rect.width, left: rect.left });
    };

    measure();

    // Resize observer ensures measurement updates when the dock resizes due to item scaling
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <DockContext.Provider
      value={{ width: rect.width, left: rect.left, hovered }}
    >
      <div
        ref={ref}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        className={clsx(
          "fixed bottom-8 left-1/2 -translate-1/2 h-16 flex items-end bg-[#1d1d1d] border border-[#2d2d2d] rounded-xl",
          className
        )}
        style={{ gap: spacing, padding }}
      >
        {children}
      </div>
    </DockContext.Provider>
  );
}
