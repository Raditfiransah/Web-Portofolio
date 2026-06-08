"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <section id="projects" className="w-full bg-black py-10 md:py-16 flex flex-col justify-center border-t border-white/5">
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
    category: "Machine Learning Application",
    title: "Star-Correction: Multi-Task BERT for Sentiment & Rating Prediction.",
    src: "/images/pexels-googledeepmind-17483874.jpg",
    content: (
      <ProjectContent
        description="An Indonesian NLP system that predicts review sentiment and corrects inaccurate star ratings from Google Maps tourism reviews using a shared IndoBERT encoder with dual classification heads."
        stack={[
          "Python",
          "PyTorch",
          "IndoBERT",
          "FastAPI",
          "Streamlit",
          "Optuna",
          "MLflow",
          "Docker"
        ]}
        features={[
          "Multi-task learning model for sentiment classification and corrected star rating prediction",
          "Shared IndoBERT encoder with separate sentiment and star-rating heads",
          "Star embedding fusion to combine review text with original user rating",
          "Class-weighted training to handle imbalanced review datasets",
          "Optuna-based hyperparameter tuning with MLflow experiment tracking",
          "FastAPI inference endpoint with Streamlit dashboard for interactive testing"
        ]}
        imageUrl="/images/pexels-googledeepmind-17483874.jpg"
      />
    ),
  },
  {
    category: "Computer Vision Application",
    title: "Show, Attend and Tell: Visual Attention Image Captioning.",
    src: "/images/pexels-googledeepmind-25626431.jpg",
    content: (
      <ProjectContent
        description="An image captioning system that generates descriptive captions from images using a ResNet50 encoder, LSTM decoder, and Bahdanau Attention trained on the Flickr8k dataset."
        stack={[
          "Python",
          "PyTorch",
          "ResNet50",
          "LSTM",
          "Streamlit",
          "Docker",

        ]}
        features={[
          "ResNet50 encoder extracts spatial image features for caption generation",
          "LSTM decoder generates word-by-word natural language descriptions",
          "Bahdanau Attention lets the model focus on relevant image regions",
          "Streamlit web app and Docker deployment for interactive usage"
        ]}
        imageUrl="/images/pexels-googledeepmind-25626431.jpg"
      />
    ),
  },
  {
    category: "Web Application",
    title: "Architecture JobStreet: Architecture Career Discovery Platform.",
    src: "/images/image.png",
    content: (
      <ProjectContent
        description="A specialized job discovery platform designed for architecture students and professionals. It streamlines job searching, portfolio showcasing, and career exploration within the architecture industry."
        stack={[
          "Larevel",
          "Vue",
          "Tailwind",
          "Node.js",
          "MySQL",
          "Docker"
        ]}
        features={[
          "Dedicated architecture-focused job marketplace",
          "Portfolio showcase system for architects and students",
          "Employer dashboard for posting and managing vacancies",
          "Responsive UI optimized for desktop and mobile devices"
        ]}
        imageUrl="/images/image.png"
      />
    ),
  }
];
