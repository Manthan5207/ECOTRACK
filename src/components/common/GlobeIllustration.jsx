import React from 'react';
import { motion } from 'framer-motion';

export default function GlobeIllustration({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Deep Ocean Blue Background Bloom */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-blue-600/40 via-cyan-500/30 to-sky-400/35 blur-3xl pointer-events-none animate-pulse-slow"></div>

      {/* Floating Animated Holographic Earth */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-72 h-72 sm:w-88 sm:h-88 md:w-[420px] md:h-[420px] flex items-center justify-center"
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full overflow-visible drop-shadow-[0_20px_45px_rgba(37,99,235,0.40)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Holographic Glowing Ocean Earth Core */}
            <radialGradient id="oceanCore" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="25%" stopColor="#38BDF8" />
              <stop offset="55%" stopColor="#2563EB" />
              <stop offset="80%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#0B132B" />
            </radialGradient>

            {/* Atmosphere Rim Highlight */}
            <radialGradient id="atmosphereGlowOcean" cx="50%" cy="50%" r="50%">
              <stop offset="78%" stopColor="transparent" />
              <stop offset="92%" stopColor="rgba(56, 189, 248, 0.5)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0.9)" />
            </radialGradient>

            {/* Specular Highlight */}
            <linearGradient id="specularOcean" x1="0%" y1="0%" x2="70%" y2="70%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
              <stop offset="35%" stopColor="rgba(255, 255, 255, 0.35)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>

            {/* Cyan Continent Gradient */}
            <linearGradient id="continentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A5F3FC" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            <filter id="oceanGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Sprouting Top Holographic Nodes */}
          <g className="text-cyan-300">
            <path
              d="M 200 80 C 198 50, 205 35, 210 20"
              stroke="#67E8F9"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 205 45 C 180 35, 175 15, 205 5 C 220 20, 215 38, 205 45 Z"
              fill="url(#continentGrad)"
              filter="url(#oceanGlowFilter)"
              opacity="0.95"
            />
            <path
              d="M 208 35 C 235 25, 245 45, 220 58 C 210 50, 205 42, 208 35 Z"
              fill="url(#continentGrad)"
              filter="url(#oceanGlowFilter)"
              opacity="0.95"
            />
          </g>

          {/* Orbital Cyan Energy Waves */}
          <g>
            <motion.path
              d="M 50 230 C 40 170, 75 120, 120 90 C 150 70, 175 60, 200 55"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
            <path
              d="M 55 210 C 35 195, 38 175, 60 170 C 75 185, 70 205, 55 210 Z"
              fill="url(#continentGrad)"
            />
            <path
              d="M 85 140 C 70 120, 80 100, 100 105 C 108 122, 100 138, 85 140 Z"
              fill="url(#continentGrad)"
            />
            <path
              d="M 145 80 C 135 60, 155 48, 170 62 C 165 78, 152 86, 145 80 Z"
              fill="url(#continentGrad)"
            />

            <motion.path
              d="M 350 190 C 365 140, 335 85, 280 65"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
            <path
              d="M 345 160 C 368 148, 365 125, 342 118 C 325 130, 328 152, 345 160 Z"
              fill="url(#continentGrad)"
            />
            <path
              d="M 305 90 C 322 75, 315 55, 292 62 C 285 78, 292 92, 305 90 Z"
              fill="url(#continentGrad)"
            />
          </g>

          {/* Main Glowing Holographic Earth Base */}
          <circle cx="200" cy="200" r="120" fill="url(#oceanCore)" filter="url(#oceanGlowFilter)" />

          {/* Continents Texture */}
          <g clipPath="url(#globeClip)">
            <clipPath id="globeClip">
              <circle cx="200" cy="200" r="120" />
            </clipPath>

            {/* Landmass 1: Eurasia & Asia */}
            <path
              d="M 135 125 Q 165 105 200 115 Q 235 125 255 155 Q 245 195 215 205 Q 185 215 175 255 Q 155 245 145 215 Q 120 175 135 125 Z"
              fill="url(#continentGrad)"
              opacity="0.9"
            />

            {/* Landmass 2: Americas */}
            <path
              d="M 235 95 Q 265 85 285 115 Q 295 145 275 175 Q 255 185 245 155 Q 235 125 235 95 Z"
              fill="url(#continentGrad)"
              opacity="0.88"
            />

            {/* Landmass 3: Southern continents */}
            <path
              d="M 155 225 Q 185 215 215 245 Q 225 275 195 285 Q 165 275 155 225 Z"
              fill="url(#continentGrad)"
              opacity="0.85"
            />

            {/* Luminous Biosphere Swirls */}
            <path
              d="M 95 165 C 130 155, 175 170, 205 160 C 245 150, 275 175, 315 165"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 115 225 C 155 215, 195 235, 245 220 C 275 215, 295 230, 315 225"
              stroke="rgba(6, 182, 212, 0.35)"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Atmosphere Rim Highlight & Specular */}
          <circle cx="200" cy="200" r="120" fill="url(#atmosphereGlowOcean)" />
          <ellipse cx="160" cy="140" rx="72" ry="48" fill="url(#specularOcean)" transform="rotate(-25 160 140)" />

          {/* Glowing Atmospheric Particles & Telemetry Sparkles */}
          <g fill="#06B6D4">
            <circle cx="85" cy="65" r="3" className="animate-ping" opacity="0.85" />
            <circle cx="325" cy="285" r="3" className="animate-ping" opacity="0.75" />
            <circle cx="65" cy="275" r="2.5" opacity="0.9" />
            <circle cx="335" cy="55" r="3" opacity="0.95" />
            <circle cx="200" cy="340" r="2" opacity="0.7" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

