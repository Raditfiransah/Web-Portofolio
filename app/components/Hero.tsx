"use client";

import SplitText from "./SplitText";

export default function Hero() {
  return (
    <section className="relative flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6 z-10">
        <a
          href="#work"
          className="text-sm font-medium tracking-wide hover:opacity-70 transition-opacity"
        >
          Work
        </a>
        {/* Logo / icon center */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Logo"
          >
            {/* Four-pointed star / cross mark */}
            <path
              d="M14 0 L16 12 L28 14 L16 16 L14 28 L12 16 L0 14 L12 12 Z"
              fill="white"
            />
          </svg>
        </div>
        <a
          href="#contact"
          className="text-sm font-medium tracking-wide hover:opacity-70 transition-opacity"
        >
          Contact
        </a>
      </nav>

      {/* Hero content */}
      <div className="flex flex-col flex-1 items-center justify-center gap-10 px-6 text-center">
        {/* Big title: PORT + folio */}
<div className="flex items-baseline leading-none select-none">
  <SplitText
    text="PORT"
    tag="span"
    className="hero-port"
    delay={40}
    duration={1}
    from={{ opacity: 0, y: 80 }}
    to={{ opacity: 1, y: 0 }}
  />

  <SplitText
    text="folio"
    tag="span"
    className="hero-folio"
    delay={60}
    duration={1.2}
    from={{ opacity: 0, y: 80 }}
    to={{ opacity: 1, y: 0 }}
  />
</div>

        {/* Subtitle */}
        <SplitText
          text="Hello! I'm Radit, a UI/UX Designer who will help in your project to create a cool, functional, and user-friendly website. Welcome to my portfolio website!"
          tag="p"
          className="max-w-lg text-sm text-white/60 leading-relaxed"
          splitType="words"
          delay={20}
          duration={0.8}
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          rootMargin="0px"
          threshold={0}
        />
      </div>

      {/* Scroll down indicator */}
      <div className="flex justify-center pb-8 z-10">
        <button
          onClick={() =>
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
          }
          aria-label="Scroll down"
          className="border border-white/30 rounded-full p-2 hover:border-white/70 transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="8 12 12 16 16 12" />
            <line x1="12" y1="8" x2="12" y2="16" />
          </svg>
        </button>
      </div>
    </section>
  );
}
