"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <section className="w-full bg-black py-24 md:py-32 flex flex-col justify-center border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-8 flex flex-col items-center text-center">
        <h3 className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-4">
          Portfolio
        </h3>
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-white font-sans tracking-tight">
          Featured Projects
        </h2>
      </div>
      <Carousel items={cards} />
    </section>
  );
}

const ProjectContent = ({
  description,
  features,
  stack,
  imageUrl,
}: {
  description: string;
  features: string[];
  stack: string[];
  imageUrl: string;
}) => {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-white/5 p-8 md:p-14 rounded-3xl mb-4 font-sans text-left">
      <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg max-w-3xl leading-relaxed mb-8">
        {description}
      </p>
      
      {/* Tech Stack */}
      <div className="mb-8">
        <h4 className="text-neutral-400 dark:text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-3">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-zinc-300 px-3 py-1 rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-10">
        <h4 className="text-neutral-400 dark:text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-3">Key Features</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start text-sm text-neutral-600 dark:text-neutral-300 gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mockup / Image */}
      <div className="w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-white/10">
        <img
          src={imageUrl}
          alt="Project showcase"
          className="w-full h-auto object-cover max-h-[400px]"
        />
      </div>
    </div>
  );
};

const data = [
  {
    category: "Web Application",
    title: "Zenith: Next-gen Analytics Dashboard.",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    content: (
      <ProjectContent
        description="A real-time data visualization platform designed for high-throughput enterprise systems. It provides deep analytics, customizable reporting widgets, and sleek animations."
        stack={["React", "Next.js", "Tailwind CSS", "GSAP", "Laravel"]}
        features={[
          "Interactive dashboard widgets with real-time websocket updates",
          "Ultra-smooth charts powered by custom SVG rendering and animations",
          "Optimized Lighthouse scores with near-instant paint times",
          "Comprehensive light/dark mode design system"
        ]}
        imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
      />
    ),
  },
  {
    category: "Machine Learning",
    title: "Aura AI: Real-time Object Detection.",
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    content: (
      <ProjectContent
        description="An end-to-end computer vision pipeline capable of detecting, classifying, and tracking multiple objects in live video streams with ultra-low latency."
        stack={["Python", "PyTorch", "TensorFlow", "FastAPI", "Docker"]}
        features={[
          "Live stream inference at 60+ FPS with state-of-the-art YOLO weights",
          "Asynchronous batch processing backend using FastAPI and WebSockets",
          "Scalable container deployment via Docker and Kubernetes",
          "Comprehensive model monitoring dashboard built using Grafana"
        ]}
        imageUrl="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
      />
    ),
  },
  {
    category: "UI/UX Design",
    title: "Nova: A Premium Design System.",
    src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
    content: (
      <ProjectContent
        description="A unified language and component library designed to align design teams and engineering, focusing heavily on accessibility, pixel perfection, and fluid animations."
        stack={["Figma", "React", "Tailwind CSS", "TypeScript", "Storybook"]}
        features={[
          "Over 100+ production-ready responsive UI primitives",
          "Strict WCAG 2.1 AA accessibility compliance",
          "Custom Figma plugin to sync design tokens directly to Tailwind config",
          "Automatic code generation for React and CSS modules"
        ]}
        imageUrl="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop"
      />
    ),
  },
  {
    category: "MLOps & Infrastructure",
    title: "Chronos: Automated ML Training Pipeline.",
    src: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2194&auto=format&fit=crop",
    content: (
      <ProjectContent
        description="An enterprise-grade continuous training and zero-downtime serving infrastructure built to automate ML lifecycles from raw data ingest to deployment."
        stack={["Kubernetes", "Docker", "Prometheus", "Grafana", "Python"]}
        features={[
          "Automated model drift detection and automated retraining loops",
          "Canary and blue-green deployment strategies managed via Kubernetes",
          "Full system observability with Prometheus alerts and custom Grafana panels",
          "Versioned model registry and automated metadata tracking"
        ]}
        imageUrl="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2194&auto=format&fit=crop"
      />
    ),
  },
];
