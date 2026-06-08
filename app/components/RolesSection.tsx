"use client";

import ScrollStack, { ScrollStackItem } from "./ScrollStack";

/* ── SVG Icons ──────────────────────────────────────────────── */

const IconRole = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <circle cx="32" cy="20" r="10" stroke="currentColor" strokeWidth="3" />
    <path
      d="M12 52c0-11.046 8.954-20 20-20s20 8.954 20 20"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const IconAIML = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <rect x="8" y="24" width="12" height="16" rx="3" stroke="currentColor" strokeWidth="3" />
    <rect x="26" y="12" width="12" height="28" rx="3" stroke="currentColor" strokeWidth="3" />
    <rect x="44" y="18" width="12" height="22" rx="3" stroke="currentColor" strokeWidth="3" />
    <circle cx="14" cy="20" r="3" fill="currentColor" />
    <circle cx="32" cy="8" r="3" fill="currentColor" />
    <circle cx="50" cy="14" r="3" fill="currentColor" />
    <path d="M14 20 L32 8 L50 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconMLOps = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    {/* Gear */}
    <circle cx="32" cy="32" r="9" stroke="currentColor" strokeWidth="3" />
    <path
      d="M32 10v5M32 49v5M10 32h5M49 32h5M16.1 16.1l3.5 3.5M44.4 44.4l3.5 3.5M16.1 47.9l3.5-3.5M44.4 19.6l3.5-3.5"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Inner circle accent */}
    <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.6" />
  </svg>
);

const IconWebsite = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <rect x="6" y="10" width="52" height="40" rx="5" stroke="currentColor" strokeWidth="3" />
    {/* Browser bar */}
    <line x1="6" y1="22" x2="58" y2="22" stroke="currentColor" strokeWidth="3" />
    {/* Dots */}
    <circle cx="14" cy="16" r="2" fill="currentColor" />
    <circle cx="21" cy="16" r="2" fill="currentColor" />
    <circle cx="28" cy="16" r="2" fill="currentColor" />
    {/* Content lines */}
    <line x1="14" y1="31" x2="50" y2="31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="14" y1="38" x2="42" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="14" y1="45" x2="36" y2="45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/* ── Card data ──────────────────────────────────────────────── */

const cards = [
  {
    title: "Role",
    subtitle: "What I do",
    description:
      "Passionate about building intelligent solutions through AI, Machine Learning, Cloud Computing, and modern software development.",
    icon: <IconRole />,
    bg: "bg-white",
    text: "text-black",
    accent: "text-black/40",
  },
  {
    title: "AI / ML",
    subtitle: "Machine Learning",
    description:
      "Building and fine-tuning machine learning models from data pipelines and feature engineering to model training, evaluation, and deployment.",
    icon: <IconAIML />,
    bg: "bg-zinc-900",
    text: "text-white",
    accent: "text-white/40",
  },
  {
    title: "MLOps",
    subtitle: "Operations & Infrastructure",
    description:
      "Building reliable ML workflows with model deployment, monitoring, automation, and scalable cloud infrastructure.",
    icon: <IconMLOps />,
    bg: "bg-zinc-800",
    text: "text-white",
    accent: "text-white/40",
  },
  {
    title: "Website",
    subtitle: "Frontend & Full-stack",
    description:
      "Creating responsive web applications with modern technologies, focusing on performance, usability, and seamless user experiences.",
    icon: <IconWebsite />,
    bg: "bg-zinc-100",
    text: "text-black",
    accent: "text-black/40",
  },
];

/* ── Section ────────────────────────────────────────────────── */

export default function RolesSection() {
  return (
    <section id="roles" className="w-full bg-black">
      <ScrollStack
        itemStackDistance={48}
        baseScale={0.9}
        itemScale={0.04}
      >
        {cards.map((card) => (
          <ScrollStackItem key={card.title}>
            <div
              className={`role-card ${card.bg} ${card.text} w-full h-full rounded-[2.5rem] p-10 md:p-14 flex flex-col justify-between`}
            >
              {/* Top row: icon + subtitle */}
              <div className="flex items-start justify-between">
                <div className={`${card.accent} mb-6`}>{card.icon}</div>
                <span className={`text-sm font-medium tracking-widest uppercase ${card.accent}`}>
                  {card.subtitle}
                </span>
              </div>

              {/* Bottom row: title + description */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <h2
                  className="font-extrabold uppercase leading-none"
                  style={{ fontSize: "clamp(3.5rem, 7vw, 7rem)", letterSpacing: "-0.03em" }}
                >
                  {card.title}
                </h2>
                <p
                  className={`max-w-sm text-base leading-relaxed ${card.accent} md:text-right`}
                  style={{ opacity: 0.75 }}
                >
                  {card.description}
                </p>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
