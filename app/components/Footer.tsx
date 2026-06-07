"use client";

import React from "react";
import { IconBrandGithub, IconBrandLinkedin, IconBrandInstagram, IconMail } from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/5 relative overflow-hidden pt-20 pb-0 flex flex-col justify-between">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
        {/* Brand Column (Left) */}
        <div className="md:col-span-5 flex flex-col justify-between gap-6">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Logo"
              >
                <path
                  d="M14 0 L16 12 L28 14 L16 16 L14 28 L12 16 L0 14 L12 12 Z"
                  fill="white"
                />
              </svg>
            </div>
            {/* Tagline */}
            <p className="text-zinc-400 text-sm max-w-xs leading-relaxed font-sans">
              Bridging design and engineering — crafting premium interactive digital experiences.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/radit_firansah"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
            >
              <IconBrandInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/radit-firansah-550095397"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
            >
              <IconBrandLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Raditfiransah"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
            >
              <IconBrandGithub className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Links Column (Right) */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-4">
          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-sans">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="#roles"
                  className="text-zinc-400 hover:text-white text-sm transition-colors duration-200 font-sans"
                >
                  Roles
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-zinc-400 hover:text-white text-sm transition-colors duration-200 font-sans"
                >
                  Projects
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-sans">
              Contact
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=raditfiransah180@gmail.com&su=Collaboration%20Inquiry&body=Hi%20Radit%2C%0A%0AI%20hope%20you%27re%20doing%20well.%0A%0AI%20came%20across%20your%20portfolio%20and%20was%20impressed%20by%20your%20work%20and%20technical%20background.%20I%20would%20be%20interested%20in%20discussing%20potential%20collaboration%20opportunities%20and%20learning%20more%20about%20your%20experience.%0A%0AI%20look%20forward%20to%20connecting%20with%20you.%0A%0AKind%20regards%2C%0A%0A%5BYour%20Name%5D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white text-sm transition-colors duration-200 font-sans flex items-center gap-1.5"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/radit-firansah-550095397"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white text-sm transition-colors duration-200 font-sans"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Raditfiransah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white text-sm transition-colors duration-200 font-sans"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-sans">
              Socials
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="https://www.instagram.com/radit_firansah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white text-sm transition-colors duration-200 font-sans"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright & Large Footer Brand Text */}
      <div className="w-full flex flex-col items-center relative z-10 border-t border-white/5 pt-8 select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-500 text-xs font-sans pb-4">
          <p>© 2026 Radit. All rights reserved.</p>
          <p>Handcrafted with passion & code.</p>
        </div>
        
        {/* Large "Thank You" Footer Text (Partially cut-off at bottom) */}
        <div className="w-full overflow-hidden flex justify-center translate-y-[25%] pointer-events-none">
          <h2 className="text-[15vw] font-black uppercase tracking-tighter leading-none text-zinc-800/20 dark:text-zinc-800/40 select-none">
            Thank You
          </h2>
        </div>
      </div>
    </footer>
  );
}
