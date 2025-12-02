import { useEffect, useRef, useState } from "react";
import { useMouse } from "./MouseProvider";
import { useDock } from "./Dock";
import { motion, useSpring, useTransform } from "motion/react";
import type { DockItemProps } from "./types";
import clsx from "clsx";

export default function DockItem({
  children,
  baseSize = 48,
  maxSize = 84,
  lift = 10,
  fallOf = 12,
  className,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [centerX, setCenterX] = useState(0);

  const mouse = useMouse();
  const dock = useDock();

  useEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setCenterX(r.left + r.width / 2);
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);

    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Convert mouse X → proximity value (0..1) based on cosine falloff
  const proximity = useTransform(mouse.position.x, (mx) => {
    if (!dock.width) return 0;

    // Normalize mouse distance relative to dock width
    const normalized = (mx - centerX) / dock.width;

    // Convert normalized distance to angle for cosine curve
    const angle = (normalized * Math.PI) / 2;

    // Cosine falls from 1 → 0 smoothly; negative values are clamped
    const v = Math.cos(angle);
    if (v < 0) return 0;

    // Raise to power for sharper falloff
    return dock.hovered ? v ** fallOf : 0;
  });

  const smooth = useSpring(proximity, { stiffness: 300, damping: 30, mass: 0.5 });

  const size = useTransform(smooth, (p) => baseSize + (maxSize - baseSize) * p);
  const y = useTransform(smooth, (p) => -lift * p);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
        y,
      }}
      className={clsx(
        "flex items-center justify-center bg-[#1d1d1d] border border-[#2d2d2d] rounded-lg overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
