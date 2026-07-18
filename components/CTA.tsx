'use client';

import { useState } from 'react';
import { SVGButton } from '@/components/ui/SVGButton'; // Add import for SVGButton

interface CTAButton {
  variant: 'primary' | 'secondary';
  label: string;
  icon: string;
  onClick?: () => void;
}

const CTAButtons = () => {
  const [isHoveredPrimary, setIsHoveredPrimary] = useState(false);
  const [isHoveredSecondary, setIsHoveredSecondary] = useState(false);

  const primaryButtonLetters = ['S', 't', 'a', 'r', 't', '', 'f', 'r', 'e', 'e'];

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-8 gap-x-3 gap-y-3 items-center justify-center">
      {/* Primary Button */}
      <button 
        className="inline-flex transition overflow-hidden group text-sm font-medium text-white rounded-full pt-3 pr-5 pb-3 pl-5 relative gap-x-2 gap-y-2 items-center"
        style={{
          background: 'linear-gradient(135deg, rgb(26, 26, 26) 0%, rgb(10, 10, 10) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'rgba(0, 0, 0, 0.4) 0px 8px 32px, rgba(255, 255, 255, 0.1) 0px 1px 0px inset, rgba(0, 0, 0, 0.5) 0px -1px 0px inset',
          transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={() => setIsHoveredPrimary(true)}
        onMouseLeave={() => setIsHoveredPrimary(false)}
      >
        {isHoveredPrimary && (
          <>
            <div className="loader" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              zIndex: 1,
              backgroundColor: 'transparent',
              mask: 'repeating-linear-gradient(90deg, transparent 0, transparent 6px, black 7px, black 8px)',
              WebkitMask: 'repeating-linear-gradient(90deg, transparent 0, transparent 6px, black 7px, black 8px)'
            }}>
              <div style={{
                content: '',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `radial-gradient(circle at 50% 50%, #f43f5e 0%, transparent 50%), 
                                 radial-gradient(circle at 45% 45%, #ef4444 0%, transparent 45%), 
                                 radial-gradient(circle at 55% 55%, #fb7185 0%, transparent 45%), 
                                 radial-gradient(circle at 45% 55%, #f87171 0%, transparent 45%), 
                                 radial-gradient(circle at 55% 45%, #dc2626 0%, transparent 45%)`,
                mask: 'radial-gradient(circle at 50% 50%, transparent 0%, transparent 10%, black 25%)',
                WebkitMask: 'radial-gradient(circle at 50% 50%, transparent 0%, transparent 10%, black 25%)',
                animation: 'transform-animation 2s infinite alternate, opacity-animation 4s infinite',
                animationTimingFunction: 'cubic-bezier(0.6, 0.8, 0.5, 1)',
                filter: 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.6))'
              }} />
            </div>

            {/* Horizontal scanning light */}
            <div className="scan-light" style={{
              position: 'absolute',
              top: '0px',
              bottom: '0px',
              left: '-100%',
              width: '3px',
              background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.9) 50%, rgba(244, 63, 94, 0.7), rgba(255, 255, 255, 0.9) 50%, transparent)',
              filter: 'blur(1px)',
              boxShadow: 'rgba(255, 255, 255, 0.8) 0px 0px 10px, rgba(244, 63, 94, 0.6) 0px 0px 15px',
              pointerEvents: 'none',
              zIndex: 10,
              animation: isHoveredPrimary ? 'scanSweep 1.5s ease-out forwards' : 'none'
            }} />

            {/* Sparkle container */}
            <div className="sparkle-container" style={{
              position: 'absolute',
              inset: '0px',
              borderRadius: 'inherit',
              overflow: 'hidden',
              pointerEvents: 'none',
              opacity: isHoveredPrimary ? 1 : 0.6,
              transition: 'opacity 0.4s'
            }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i}
                  className="sparkle"
                  style={{
                    position: 'absolute',
                    width: `${2 + i % 2}px`,
                    height: `${2 + i % 2}px`,
                    background: 'white',
                    borderRadius: '50%',
                    boxShadow: '0 0 6px rgba(255,255,255,0.8)',
                    animation: `driftSparkle${i} ${4 + i * 0.5}s ease-in-out infinite`
                  }}
                />
              ))}
            </div>
          </>
        )}

        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="lucide lucide-arrow-right relative z-10 transition-transform duration-400 group-hover:translate-x-1"
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>

        <span style={{
          position: 'relative',
          zIndex: 2,
          fontFamily: "'Inter', sans-serif",
          fontSize: '1em',
          fontWeight: 600,
          userSelect: 'none',
          color: '#fff',
          display: 'flex',
          gap: '0.5rem',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}>
          {primaryButtonLetters.map((letter, index) => (
            <span 
              key={index}
              className={letter ? "loader-letter" : ""}
              style={{
                display: 'inline-block',
                opacity: isHoveredPrimary ? 0 : 1,
                animation: isHoveredPrimary ? `loader-letter-anim 4s infinite linear ${index * 0.1}s` : 'none',
                width: letter ? 'auto' : '0.3rem'
              }}
            >
              {letter}
            </span>
          ))}
        </span>

        <style jsx>{`
          @keyframes scanSweep {
            0% {
              left: -100%;
              opacity: 0;
            }
            5% {
              opacity: 1;
            }
            95% {
              opacity: 1;
            }
            100% {
              left: calc(100% + 100px);
              opacity: 0;
            }
          }

          @keyframes driftSparkle1 {
            0% { left: 10%; top: 20%; opacity: 0; }
            10% { opacity: 1; }
            50% { left: 85%; top: 70%; opacity: 1; }
            90% { opacity: 0; }
            100% { left: 90%; top: 80%; opacity: 0; }
          }
          @keyframes driftSparkle2 {
            0% { left: 70%; top: 15%; opacity: 0; }
            10% { opacity: 1; }
            50% { left: 20%; top: 80%; opacity: 1; }
            90% { opacity: 0; }
            100% { left: 15%; top: 85%; opacity: 0; }
          }
          @keyframes driftSparkle3 {
            0% { left: 40%; top: 10%; opacity: 0; }
            10% { opacity: 1; }
            50% { left: 60%; top: 85%; opacity: 1; }
            90% { opacity: 0; }
            100% { left: 65%; top: 90%; opacity: 0; }
          }
          @keyframes driftSparkle4 {
            0% { left: 80%; top: 60%; opacity: 0; }
            10% { opacity: 1; }
            50% { left: 30%; top: 25%; opacity: 1; }
            90% { opacity: 0; }
            100% { left: 25%; top: 20%; opacity: 0; }
          }
          @keyframes driftSparkle5 {
            0% { left: 50%; top: 75%; opacity: 0; }
            10% { opacity: 1; }
            50% { left: 75%; top: 30%; opacity: 1; }
            90% { opacity: 0; }
            100% { left: 80%; top: 25%; opacity: 0; }
          }

          @keyframes transform-animation {
            0% { transform: translate(-55%); }
            100% { transform: translate(55%); }
          }

          @keyframes opacity-animation {
            0%, 100% { opacity: 0; }
            15% { opacity: 1; }
            65% { opacity: 0; }
          }

          @keyframes loader-letter-anim {
            0% { opacity: 0; }
            5% { 
              opacity: 1; 
              text-shadow: 0 0 8px #f43f5e, 0 0 12px #f43f5e;
              transform: scale(1.1) translateY(-2px);
            }
            20% { opacity: 0.2; }
            100% { opacity: 0; }
          }
        `}</style>
      </button>

      {/* Secondary Button */}
      <button 
        className="inline-flex transition overflow-hidden group text-sm text-white/90 rounded-full pt-3 pr-5 pb-3 pl-5 relative gap-x-2 gap-y-2 items-center"
        style={{
          '--x': '50%',
          '--y': '50%',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: 'rgba(0, 0, 0, 0.3) 0px 8px 32px, rgba(255, 255, 255, 0.4) 0px 2px 4px inset, rgba(0, 0, 0, 0.2) 0px -2px 4px inset, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
          backdropFilter: 'blur(20px)',
          transformStyle: 'preserve-3d',
          transition: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        } as React.CSSProperties}
        onMouseEnter={() => setIsHoveredSecondary(true)}
        onMouseLeave={() => setIsHoveredSecondary(false)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          e.currentTarget.style.setProperty('--x', `${x}%`);
          e.currentTarget.style.setProperty('--y', `${y}%`);
        }}
      >
        {/* Button layers */}
        <div className="absolute inset-0 rounded-full" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.05) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="inner-layer-1 absolute inset-0 rounded-full" style={{
          background: `radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)`,
          opacity: isHoveredSecondary ? 1 : 0.6,
          transition: 'opacity 0.5s',
          pointerEvents: 'none',
          zIndex: 2
        }} />

        <div className="inner-layer-2 absolute inset-0 rounded-full" style={{
          background: `radial-gradient(ellipse at var(--x) var(--y), rgba(244,63,94,0.4) 0%, rgba(251,113,133,0.2) 30%, transparent 60%)`,
          opacity: isHoveredSecondary ? 0.8 : 0.4,
          transition: 'opacity 0.5s',
          pointerEvents: 'none',
          filter: 'blur(8px)',
          zIndex: 3
        }} />

        <div className="light-sweep absolute inset-0 rounded-full" style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
          transform: isHoveredSecondary ? 'translate(150%, -150%) rotate(45deg)' : 'translate(-150%, 150%) rotate(45deg)',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
          filter: 'blur(6px)',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          zIndex: 4
        }} />

        <span className="iconify text-[18px] relative z-10" data-icon="solar:video-play-bold" aria-hidden="true" style={{
          textShadow: '0 1px 3px rgba(0,0,0,0.4), 0 0 8px rgba(255,255,255,0.3)',
          filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.5))'
        }} />

        <span className="z-10 relative" style={{
          textShadow: '0 1px 3px rgba(0,0,0,0.4), 0 0 8px rgba(255,255,255,0.2)'
        }}>
          Schedule demo
        </span>
      </button>
    </div>
  );
};

export const CTA = () => {
  return (
    <section className="sm:py-24 pt-16 pb-16 relative" id="cta">
      <div className="sm:px-6 lg:px-8 max-w-7xl mr-auto ml-auto pr-4 pl-4">
        <div data-card="cta-primary" className="rounded-2xl border overflow-hidden border-white/10 bg-neutral-900/70 in-view" data-scroll-animate="blur-up">
          <div className="sm:pb-44 sm:pt-44 pt-8 pr-8 pb-8 pl-8 relative">
            {/* Background Images */}
            <div className="absolute inset-0 bg-center bg-cover" style={{
              backgroundImage: 'url(bg-liquid.webp)'
            }} />
            <div className="bg-center bg-neutral-950/50 absolute top-0 right-0 bottom-0 left-0" />

            <div className="relative text-center max-w-3xl mx-auto">
              <h2 className="sm:text-4xl md:text-5xl text-3xl font-semibold text-neutral-50 tracking-tight">
                Make analytics effortless risk‑free.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-neutral-300">
                Start your 14‑day free trial and unlock sharper insights today.
              </p>
              
              <CTAButtons />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};