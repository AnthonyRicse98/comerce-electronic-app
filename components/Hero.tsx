'use client';

import { useState } from 'react';
import { DashboardPreview } from './DashboardPreview';

const HeroStats = () => {
  return (
    <div 
      className="flex sm:gap-3 bg-white/5 w-max rounded-full mr-auto ml-auto pt-1.5 pr-3 pb-1.5 pl-3 gap-x-2 gap-y-2 items-center justify-center in-view"
      style={{ 
        position: 'relative',
        '--border-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
        '--border-radius-before': '9999px',
        opacity: 1,
        transform: 'translateY(0px)'
      } as React.CSSProperties}
      data-scroll-animate="fade-up"
    >
      <span className="inline-flex -space-x-2 pr-2">
        <img 
          className="w-6 h-6 object-cover rounded-full ring-2 ring-neutral-900" 
          src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg" 
          alt="Customer 1" 
        />
        <img 
          className="h-6 w-6 rounded-full ring-2 object-cover ring-neutral-900" 
          src="https://info.gopassage.com/hubfs/Personnel%20image%204483.jpg" 
          alt="Customer 2" 
        />
        <img 
          className="w-6 h-6 object-cover ring-neutral-900 ring-2 rounded-full" 
          src="https://edencare.org/wp-content/uploads/2023/12/Kayla-Person.jpg" 
          alt="Customer 3" 
        />
        <img 
          className="w-6 h-6 object-cover rounded-full ring-neutral-900/95 ring-2" 
          src="https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg" 
          alt="Customer 4" 
        />
      </span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        aria-hidden="true" 
        role="img" 
        width="1em" 
        height="1em" 
        viewBox="0 0 24 24" 
        className="iconify text-[18px] iconify--solar text-emerald-400"
      >
        <path 
          fill="currentColor" 
          fillRule="evenodd" 
          d="M3.378 5.082C3 5.62 3 7.22 3 10.417v1.574c0 5.638 4.239 8.375 6.899 9.536c.721.315 1.082.473 2.101.473c1.02 0 1.38-.158 2.101-.473C16.761 20.365 21 17.63 21 11.991v-1.574c0-3.198 0-4.797-.378-5.335c-.377-.537-1.88-1.052-4.887-2.081l-.573-.196C13.595 2.268 12.812 2 12 2s-1.595.268-3.162.805L8.265 3c-3.007 1.03-4.51 1.545-4.887 2.082M15.06 10.5a.75.75 0 0 0-1.12-.999l-3.011 3.374l-.87-.974a.75.75 0 0 0-1.118 1l1.428 1.6a.75.75 0 0 0 1.119 0z" 
          clipRule="evenodd" 
        />
      </svg>
      <span className="text-sm text-neutral-300">
        Trusted by 210,000+ teams
      </span>
    </div>
  );
};

const CTAButtons = () => {
  const [isHoveredPrimary, setIsHoveredPrimary] = useState(false);
  const [isHoveredSecondary, setIsHoveredSecondary] = useState(false);

  const primaryButtonLetters = ['S', 't', 'a', 'r', 't', '', 'f', 'r', 'e', 'e'];

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-8 gap-x-3 gap-y-3 items-center justify-center in-view" data-scroll-animate="fade-up">
      {/* Primary Button */}
      <button 
        className="inline-flex transition overflow-hidden group text-sm font-medium text-white rounded-full pt-3 pr-5 pb-3 pl-5 relative gap-x-2 gap-y-1 items-center"
        style={{
          background: 'linear-gradient(135deg, rgb(26, 26, 26) 0%, rgb(10, 10, 10) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'rgba(0, 0, 0, 0.4) 0px 8px 32px, rgba(255, 255, 255, 0.1) 0px 1px 0px inset, rgba(0, 0, 0, 0.5) 0px -1px 0px inset',
          transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateY(0px)'
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
          </>
        )}

        <span style={{
          position: 'relative',
          zIndex: 2,
          fontFamily: "'Inter', sans-serif",
          fontSize: '1em',
          fontWeight: 600,
          userSelect: 'none',
          color: '#fff',
          display: 'flex',
          gap: '0.5rem'
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
          '--x': '90.37103667425299%',
          '--y': '45.71934524781913%',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: 'rgba(0, 0, 0, 0.3) 0px 8px 32px, rgba(255, 255, 255, 0.4) 0px 2px 4px inset, rgba(0, 0, 0, 0.2) 0px -2px 4px inset, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
          backdropFilter: 'blur(20px)',
          transformStyle: 'preserve-3d',
          transition: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(15px)'
        } as React.CSSProperties}
        onMouseEnter={(e) => {
          setIsHoveredSecondary(true);
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          e.currentTarget.style.setProperty('--x', `${x}%`);
          e.currentTarget.style.setProperty('--y', `${y}%`);
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          e.currentTarget.style.setProperty('--x', `${x}%`);
          e.currentTarget.style.setProperty('--y', `${y}%`);
        }}
        onMouseLeave={() => setIsHoveredSecondary(false)}
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
          Watch demo
        </span>
      </button>
    </div>
  );
};

const ProductPreview = () => {
  return (
    <div className="px-2 pt-[60px] lg:pt-[470px] md:pt-[400px] lg:px-8 sm:mt-16 max-w-6xl mt-12 mr-auto ml-auto">
      <div 
        className="rounded-2xl shadow-2xl backdrop-blur bg-neutral-900/60 in-view"
        style={{
          position: 'relative',
          '--border-gradient': 'linear-gradient(180deg, rgba(251, 113, 133, 0), rgba(255, 133, 133, 0.6), rgba(225, 29, 72, 0))',
          '--border-radius-before': '16px'
        } as React.CSSProperties}
        data-scroll-animate="blur-up"
      >
        <div className="lg:px-6 pb-6 pt-1 text-center text-neutral-400">
          <DashboardPreview/>
        </div>
      </div>
    </div>
  );
};

export const Hero = ({ multimedia }: { multimedia: any }) => {
  console.log(multimedia);
  return (
    <section className="pb-12 relative" id="home">
      {/* Background Elements */}
      <div 
    // Ajustado: h-64 para móvil, md:h-screen para escritorio
    className="aura-background-component top-0 w-full h-64 md:h-screen -z-10 absolute opacity-30"
    style={{ 
      maskImage: 'linear-gradient(to bottom, black 0%, black 0%)',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 0%, black 0%, transparent)'
    }}
  >
    <div id="particles-js" className="absolute inset-0 -z-10"></div>
  </div>
  
  <div 
    // Ajustado: h-64 para móvil, md:h-screen para escritorio
    className="bg-center opacity-120 w-full h-64 md:h-screen bg-cover absolute top-0"
    style={{ 
      backgroundImage: `url(${multimedia?.url})`,
      maskImage: 'linear-gradient(180deg, transparent, black 0%, black 80%, transparent)',
      WebkitMaskImage: 'linear-gradient(180deg, transparent, black 0%, black 80%, transparent)'
    }}
    data-alpha-mask="80"
  />

      {/* Main Content */}
      <div className="sm:px-6 lg:px-8 sm:pt-24 max-w-3xl mr-auto ml-auto pt-16 pr-4 pl-4 in-view" data-scroll-animate-children="">
        
        <h1 
          className="sm:text-6xl md:text-7xl text-4xl font-semibold tracking-tight text-center mt-2 mb-2 in-view"
          style={{
            maskImage: 'linear-gradient(90deg, transparent, black 55%, black 60%, transparent)',
            opacity: 1,
            transform: 'translateY(0px)'
          }}
          data-scroll-animate="blur-up"
        >
        </h1>
        
        <p 
          className="sm:text-lg text-base text-neutral-300 text-center mt-5 in-view"
          style={{
            maskImage: 'linear-gradient(90deg, transparent, black 0%, black 100%, transparent)',
            opacity: 1,
            transform: 'translateY(0px)'
          }}
          data-scroll-animate="fade-up"
        >
        </p>

        {/* <CTAButtons /> */}
      </div>

      <ProductPreview />
    </section>
  );
};