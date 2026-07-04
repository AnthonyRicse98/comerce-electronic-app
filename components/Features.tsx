'use client';

import { useEffect, useRef } from 'react';

// Interfaces
interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
  variant?: 'default' | 'hero' | 'analytics' | 'scalable';
  charts?: {
    type: 'line' | 'bar' | 'pie' | 'radar';
    data: number[];
    labels?: string[];
  };
}

interface ChartProps {
  type: 'line' | 'bar' | 'pie' | 'radar';
  data: number[];
  labels?: string[];
  className?: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

// Componente AnimatedChart
const AnimatedChart = ({ type, data, labels, className = '' }: ChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Calculate points for line chart
    const maxValue = Math.max(...data);
    const points = data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = height - padding - (value / maxValue) * chartHeight;
      return { x, y };
    });

    // Draw line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach((point, index) => {
      if (index > 0) {
        ctx.lineTo(point.x, point.y);
      }
    });

    ctx.strokeStyle = '#fb7185'; // rose-400
    ctx.lineWidth = 2;
    ctx.stroke();

    // Create gradient for fill
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(251, 113, 133, 0.35)');
    gradient.addColorStop(1, 'rgba(251, 113, 133, 0)');

    // Fill area under line
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding);
    points.forEach(point => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

  }, [data, type]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        width={300}
        height={120}
        className="w-full h-full"
      />

      {/* Animated overlay effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-45 mix-blend-screen">
        <div className="warp-loader">
          <div className="ring"></div>
          <div className="ring"></div>
          <div className="ring"></div>
          <div className="ring"></div>
          <div className="core-glow"></div>
        </div>
      </div>

      <style jsx>{`
        .warp-loader {
          position: relative;
          width: 160px;
          height: 160px;
        }

        .ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle,
            rgba(244, 63, 94, 0.15) 30%,
            transparent 70%
          );
          animation: pulse 2.2s ease-out infinite;
          opacity: 0;
          box-shadow:
            0 0 12px rgba(244, 63, 94, 0.4),
            0 0 24px rgba(244, 63, 94, 0.2);
          border: 2px solid rgba(244, 63, 94, 0.2);
        }

        .ring:nth-child(1) {
          animation-delay: 0s;
        }
        .ring:nth-child(2) {
          animation-delay: 0.4s;
        }
        .ring:nth-child(3) {
          animation-delay: 0.8s;
        }
        .ring:nth-child(4) {
          animation-delay: 1.2s;
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.3);
            opacity: 1;
          }
          70% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.15;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.4);
            opacity: 0;
          }
        }

        .core-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 24px;
          height: 24px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle at center, #f43f5e, #dc2626);
          box-shadow:
            0 0 25px #f43f5e,
            0 0 60px rgba(244, 63, 94, 0.5),
            0 0 100px rgba(244, 63, 94, 0.2);
          animation: corePulse 1.6s ease-in-out infinite;
        }

        @keyframes corePulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

// Componente FeatureCard
const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const { title, description, variant = 'default' } = feature;

  if (variant === 'hero') {
    return (
      <div
        data-card="hero-feature"
        className="overflow-hidden sm:p-8 bg-center bg-[url(https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/0e462543-eb2b-45e3-ab99-f68cecbaef90_1600w.jpg)] bg-cover border rounded-2xl p-6 relative bg-neutral-900/70 border-white/10 in-view"
        data-scroll-animate="fade-up"
      >
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background: 'radial-gradient(120% 120% at 50% 120%, rgba(244,63,94,0.25) 0%, rgba(244,63,94,0.12) 35%, rgba(244,63,94,0.05) 55%, rgba(0,0,0,0) 75%)'
          }}
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-center">
          <div className="order-2 xl:order-1">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium">
              Transparent Reporting Made Simple
            </h3>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-neutral-300 max-w-2xl">
              Build shareable reports your whole org understands. No hidden
              metrics—just precise, readable insights your team can act on.
            </p>
            <div className="slide-up stagger-3 flex flex-col sm:flex-row gap-4 gap-x-4 gap-y-4 justify-start mt-6">
              <button className="glow-btn my-6" style={{ '--x': '135px', '--y': '10.25px' } as React.CSSProperties}>
                <span className="icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right w-[24px] h-[24px]"
                    style={{ color: 'rgb(17, 24, 39)' }}
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
                Cotizar
              </button>
            </div>
          </div>

          <div className="relative order-1 xl:order-2 flex justify-center xl:justify-end">
            {/* Mini chart cards */}
            <div className="w-full xl:w-96 lg:w-80 bg-neutral-900/20 border-white/10 border rounded-xl px-4 py-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-300">Total Revenue</span>
                <button className="p-1 rounded transition hover:bg-white/5" aria-label="More">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    style={{ width: '18px', height: '18px', color: 'rgb(245, 245, 245)' }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <g fill="none">
                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                      <path fill="#f5f5f5" d="M6 10.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m6 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m6 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"></path>
                    </g>
                  </svg>
                </button>
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">
                $86,577.41
              </div>
              <div className="mt-3 h-32 lg:h-24 rounded-lg border p-2 bg-neutral-900/70 border-white/10">
                <AnimatedChart
                  type="line"
                  data={[42, 45, 44, 46, 49, 53, 52, 55, 58, 60, 64, 63, 68, 72]}
                  className="h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .glow-btn {
            --x: 135px;
            --y: 10.25px;
            --glow-core: rgba(255, 255, 255, 0.8);
            --glow-color: rgba(192, 132, 252, 0.35);
            --glow-color-strong: rgba(192, 132, 252, 0.55);
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            appearance: none;
            border: 1px solid #e5e7eb;
            background: #fff;
            color: #111827;
            padding: 14px 28px;
            font-weight: 700;
            border-radius: 9999px;
            cursor: pointer;
            letter-spacing: .2px;
            transition: transform .2s ease, border-color .2s ease;
            box-shadow: 0 1px 2px rgba(0, 0, 0, .05), 0 8px 24px rgba(0, 0, 0, .08);
            isolation: isolate;
          }

          .glow-btn:hover {
            transform: translateY(-1px);
            border-color: #d1d5db;
          }

          .glow-btn::before,
          .glow-btn::after {
            content: "";
            position: absolute;
            inset: -4px;
            border-radius: inherit;
            pointer-events: none;
            opacity: 0;
            transition: opacity .2s ease;
            will-change: background;
            z-index: -1;
          }

          .glow-btn::before {
            background:
              radial-gradient(90px 90px at var(--x) var(--y),
                var(--glow-core) 0%,
                rgba(255, 255, 255, 0.25) 45%,
                transparent 70%),
              radial-gradient(140px 140px at var(--x) var(--y),
                var(--glow-color-strong) 0%,
                transparent 75%);
            mix-blend-mode: screen;
          }

          .glow-btn::after {
            inset: -8px;
            border-radius: inherit;
            background:
              radial-gradient(200px 200px at var(--x) var(--y),
                var(--glow-color) 0%,
                transparent 80%);
            filter: blur(20px);
            z-index: -2;
          }

          .glow-btn:hover::before,
          .glow-btn:hover::after {
            opacity: 1;
          }

          .icon-box {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .icon-box svg {
            width: 20px;
            height: 20px;
            stroke: currentColor;
          }
        `}</style>
      </div>
    );
  }

  if (variant === 'analytics') {
    return (
      <div data-card="advanced-analytics" className="bg-neutral-900/70 border-white/10 border rounded-2xl p-6 h-full">
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="mt-3 text-sm text-neutral-300">
          {description}
        </p>

        <div className="bg-neutral-900/70 border-white/10 border rounded-xl mt-5 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-neutral-300">Earning Reports</div>
            <span className="text-xs ring-1 px-2 py-0.5 rounded-full text-amber-300 bg-amber-400/10 ring-amber-400/30">
              78%
            </span>
          </div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">
            $8,214.61
          </div>
          <div className="overflow-hidden flex bg-neutral-900/70 h-40 border-white/10 border rounded-lg mt-3 p-4 relative items-center justify-center"
            style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 30%, transparent 70%)' }}>

            {/* Animated Loader */}
            <div className="loader-main" style={{ position: 'relative', width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '4px solid transparent',
                borderTopColor: 'rgba(244, 63, 94, 0.6)',
                animation: 'loader-spin 2s linear infinite'
              }}></div>

              <div style={{
                position: 'absolute',
                inset: '10%',
                borderRadius: '50%',
                background: 'conic-gradient(from 90deg, rgba(244, 63, 94, 0.3), transparent)',
                filter: 'blur(2px)',
                animation: 'loader-spin-reverse 1.5s linear infinite'
              }}></div>

              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '50px',
                height: '50px',
                background: 'rgba(244, 63, 94, 0.9)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 15px rgba(244, 63, 94, 0.6)',
                animation: 'loader-pulse 1s ease-in-out infinite',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '16px', fontWeight: 600, color: 'white', fontFamily: 'Inter, system-ui' }}>
                  78%
                </span>
              </div>

              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                animation: 'orbit-rotate 3s linear infinite'
              }}>
                {[0, 90, 180, 270].map((rotation, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: '8px',
                      height: '8px',
                      background: i % 2 === 0 ? 'rgba(244, 63, 94, 0.8)' : 'rgba(251, 113, 133, 0.8)',
                      borderRadius: '50%',
                      transform: `rotate(${rotation}deg) translate(60px)`,
                      boxShadow: '0 0 8px rgba(244, 63, 94, 0.6)'
                    }}
                  />
                ))}
              </div>
            </div>

            <style jsx>{`
              @keyframes loader-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }

              @keyframes loader-spin-reverse {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(-360deg); }
              }

              @keyframes loader-pulse {
                0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
              }

              @keyframes orbit-rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'scalable') {
    return (
      <div
        className="bg-neutral-900/70 border-white/10 border rounded-2xl p-6 in-view relative overflow-hidden h-full"
        data-scroll-animate="fade-up"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Animated background effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-rose-500 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="mt-3 text-sm text-neutral-300">{description}</p>

          {/* Scalable animation */}
          <div className="mt-6 flex items-center justify-center">
            <div className="relative w-full max-w-xs h-32">
              {/* Base line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-full"></div>

              {/* Growing bars animation */}
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="absolute bottom-0 w-4 bg-linear-to-t from-rose-500 to-purple-500 rounded-t-lg"
                  style={{
                    left: `${20 + i * 20}%`,
                    height: `${30 + i * 15}%`,
                    animation: `growBar 2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}

              {/* Floating elements */}
              <div className="absolute top-4 left-1/4 w-6 h-6 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="absolute top-8 right-1/4 w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>

          <style jsx>{`
            @keyframes growBar {
              0%, 100% {
                height: ${30}%;
                opacity: 0.7;
              }
              50% {
                height: ${30 + 15}%;
                opacity: 1;
              }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Default feature card
  return (
    <div
      className="bg-neutral-900/70 border-white/10 border rounded-2xl p-6 in-view h-full"
      data-scroll-animate="fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="mt-3 text-sm text-neutral-300">{description}</p>

      {feature.charts && (
        <div className="mt-4">
          <AnimatedChart {...feature.charts} />
        </div>
      )}
    </div>
  );
};

// Componente Features
export const Features = () => {
  const features: Feature[] = [
    {
      id: 'hero-feature',
      title: 'Transparent Reporting Made Simple',
      description: 'Build shareable reports your whole org understands. No hidden metrics—just precise, readable insights your team can act on.',
      variant: 'hero'
    },
    {
      id: 'advanced-analytics',
      title: 'Advanced Analytics',
      description: 'Adapt dashboards to your team\'s process with metrics, segments, and cohorts that match how you work.',
      variant: 'analytics'
    },
    {
      id: 'scalable-solutions',
      title: 'Scalable Solutions',
      description: 'Grow without rewrites. Our pipelines scale from thousands to billions of events with the same interface.',
      variant: 'scalable'
    }
  ];

  return (
    <section className="sm:py-24 pt-16 pb-16 relative" id="features">
      <div className="sm:px-6 lg:px-8 max-w-7xl mr-auto ml-auto px-4">
        <div className="text-center mb-12 in-view" data-scroll-animate-children="">
          <span
            className="text-sm font-medium text-rose-400 text-center"
            style={{ opacity: 1, transform: 'translateY(0px)' }}
          >
            Features
          </span>
          <h2
            className="sm:text-4xl md:text-5xl text-3xl font-semibold tracking-tight text-center mt-2"
            style={{ opacity: 1, transform: 'translateY(0px)' }}
          >
            Sharper features for faster decisions
          </h2>
          <p
            className="sm:text-lg text-base text-neutral-300 text-center mt-4"
            style={{ opacity: 1, transform: 'translateY(0px)' }}
          >
            Opinionated defaults, clear insights, and embedded intelligence so
            every team can move with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hero card - ocupa 2 columnas en desktop */}
          <div className="lg:col-span-3">
            <FeatureCard
              key={features[0].id}
              feature={features[0]}
              index={0}
            />
          </div>

   
            <div className="lg:col-span-2">
              <FeatureCard
                key={features[1].id}
                feature={features[1]}
                index={1}
              />
            </div>
            <div className="lg:col-span-1">
              <FeatureCard
                key={features[2].id}
                feature={features[2]}
                index={2}
              />
            </div>
         
        </div>
      </div>
    </section>
  );
};