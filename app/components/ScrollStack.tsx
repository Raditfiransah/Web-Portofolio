"use client";

/**
 * ScrollStack — sticky-based card stacking.
 *
 * Each card is position:sticky so it pins at the top as you scroll.
 * Subsequent cards slide in on top, creating the stack effect.
 * Scale is applied via CSS custom properties driven by JS scroll listener
 * for the "shrink behind" feel.
 */

import { useEffect, useRef, useCallback, type ReactNode } from "react";

/* ─── ScrollStackItem ─────────────────────────────────────── */
interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem = ({
  children,
  itemClassName = "",
}: ScrollStackItemProps) => (
  <div className={`scroll-stack-item ${itemClassName}`.trim()}>
    <div className="scroll-stack-card">{children}</div>
  </div>
);

/* ─── ScrollStack ─────────────────────────────────────────── */
interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  /** px gap between successive sticky tops — creates the "peek" offset */
  itemStackDistance?: number;
  /** scale of the bottom-most card in the stack (0–1) */
  baseScale?: number;
  /** scale step subtracted per card depth */
  itemScale?: number;
  onStackComplete?: () => void;
}

const ScrollStack = ({
  children,
  className = "",
  itemStackDistance = 16,
  baseScale = 0.92,
  itemScale = 0.04,
  onStackComplete,
}: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const updateScales = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>(".scroll-stack-item")
    );

    items.forEach((item, i) => {
      const card = item.querySelector<HTMLElement>(".scroll-stack-card");
      if (!card) return;

      // Count how many cards AFTER this one are currently pinned at their sticky top
      // A card is "pinned" when its bounding rect top ≈ its sticky-top value
      let depth = 0;
      for (let j = i + 1; j < items.length; j++) {
        const jItem = items[j];
        const jRect = jItem.getBoundingClientRect();
        const jStickyTop = parseInt(jItem.style.top || "0", 10);
        // Consider it pinned if its top edge is within a few px of its sticky top
        if (jRect.top <= jStickyTop + 4) depth++;
      }

      // Each level of depth shrinks the card by itemScale
      const scale = Math.max(1 - depth * itemScale, baseScale - (items.length - 1) * itemScale);
      card.style.transform = `scale(${scale.toFixed(4)})`;
    });
  }, [baseScale, itemScale]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>(".scroll-stack-item")
    );

    // sticky top = i * itemStackDistance (each card peeks that many px above the next)
    // padding-top = 10vh + i * itemStackDistance (so card face aligns with pin position)
    // card height = viewport - padding-top - 4vh bottom gap, clamped to [300, 640]
    const vh = window.innerHeight;
    const paddingTopBase = Math.round(vh * 0.10);
    const bottomGap = Math.round(vh * 0.04);

    if (items.length === 0) return;
    const lastIndex = items.length - 1;
    const lastPinTop = lastIndex * itemStackDistance;
    const lastPaddingTop = paddingTopBase + lastPinTop;
    const lastAvailable = vh - lastPaddingTop - bottomGap;
    const uniformCardHeight = Math.max(300, lastAvailable);

    items.forEach((item, i) => {
      const pinTop = i * itemStackDistance;
      const paddingTop = paddingTopBase + pinTop;
      item.style.top = `${pinTop}px`;
      item.style.paddingTop = `${paddingTop}px`;

      const card = item.querySelector<HTMLElement>(".scroll-stack-card");
      if (card) {
        card.style.height = `${uniformCardHeight}px`;
        card.style.maxHeight = "none";
        card.style.minHeight = "none";
      }
    });

    window.addEventListener("scroll", updateScales, { passive: true });
    updateScales();

    return () => {
      window.removeEventListener("scroll", updateScales);
    };
  }, [itemStackDistance, updateScales]);

  return (
    <div ref={containerRef} className={`scroll-stack-container ${className}`.trim()}>
      {children}
    </div>
  );
};

export default ScrollStack;
