'use client';

import { useEffect, useRef, useState, JSX } from 'react';

// ========== TYPES ==========
interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    tension?: number;
  }[];
}

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  checked?: boolean;
}

interface ChartProps {
  data: ChartData;
  type: 'line' | 'bar';
  className?: string;
}

// ========== CHART COMPONENTS ==========
export const LineChart = ({ data, className = '' }: ChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const width = container.clientWidth;
    const height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const padding = 10;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const dataset = data.datasets[0];
    const maxValue = Math.max(...dataset.data);
    const points = dataset.data.map((value, index) => {
      const x = padding + (index / (dataset.data.length - 1)) * chartWidth;
      const y = height - padding - (value / maxValue) * chartHeight;
      return { x, y };
    });

    // Create gradient for line
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(255, 115, 80, 0.35)');
    gradient.addColorStop(1, 'rgba(255, 115, 80, 0)');

    // Fill area under line
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding);
    points.forEach(point => ctx.lineTo(point.x, point.y));
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach((point, index) => {
      if (index > 0) {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.strokeStyle = 'rgba(255, 115, 80, 1)';
    ctx.lineWidth = 2;
    ctx.stroke();

  }, [data]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} className={className} />
    </div>
  );
};

export const BarChart = ({ data, className = '' }: ChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const width = container.clientWidth;
    const height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    const padding = 10;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const dataset = data.datasets[0];
    const maxValue = Math.max(...dataset.data);
    const barWidth = chartWidth / dataset.data.length - 2;

    dataset.data.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x = padding + index * (barWidth + 2);
      const y = height - padding - barHeight;

      // Create gradient for bars
      const gradient = ctx.createLinearGradient(0, y, 0, height - padding);
      gradient.addColorStop(0, 'rgba(244, 63, 94, 1)');
      gradient.addColorStop(1, 'rgba(244, 63, 94, 0.8)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 4);
      ctx.fill();
    });

  }, [data]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} className={className} />
    </div>
  );
};

// ========== SIDEBAR NAVIGATION ==========
const SidebarNavigation = () => {
  const [selectedItem, setSelectedItem] = useState('home');

  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', icon: 'home', checked: true },
    { id: 'dashboard', label: 'Dashboard', icon: 'bar-chart' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar' },
    { id: 'projects', label: 'Projects', icon: 'folder' },
  ];

  return (
    <aside className="lg:col-span-1 relative" style={{ 
      '--main-color': '#f43f5e', 
      '--main-color-opacity': 'rgba(244, 63, 94, 0.11)',
      '--total-radio': '4'
    } as React.CSSProperties}>
      <div className="radio-nav-container">
        {navigationItems.map((item) => (
          <div key={item.id}>
            <input 
              type="radio" 
              id={`nav-${item.id}`} 
              name="nav-menu" 
              checked={selectedItem === item.id}
              onChange={() => setSelectedItem(item.id)}
              className="hidden"
            />
            <label 
              htmlFor={`nav-${item.id}`} 
              className="text-sm flex items-center gap-2 p-3 rounded-xl transition-all cursor-pointer"
              style={{
                color: selectedItem === item.id ? 'var(--main-color)' : 'rgb(163, 163, 163)',
                background: selectedItem === item.id ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                border: selectedItem === item.id ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent'
              }}
            >
              <NavIcon icon={item.icon} />
              {item.label}
            </label>
          </div>
        ))}
        
        {/* Animated Glider */}
        <div className="glider-container">
          <div 
            className="glider" 
            style={{
              transform: `translateY(${navigationItems.findIndex(item => item.id === selectedItem) * 100}%)`
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .radio-nav-container {
          display: flex;
          flex-direction: column;
          position: relative;
          padding-left: 0.5rem;
        }

        .glider-container {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(27, 27, 27, 1) 50%,
            rgba(0, 0, 0, 0) 100%
          );
          width: 1px;
          pointer-events: none;
        }

        .glider-container .glider {
          position: relative;
          height: calc(100% / var(--total-radio));
          width: 100%;
          background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0) 0%,
            var(--main-color) 50%,
            rgba(0, 0, 0, 0) 100%
          );
          transition: transform 0.5s cubic-bezier(0.37, 1.95, 0.66, 0.56);
        }

        .glider-container .glider::before {
          content: "";
          position: absolute;
          height: 60%;
          width: 300%;
          top: 50%;
          transform: translateY(-50%);
          background: var(--main-color);
          filter: blur(10px);
        }

        .glider-container .glider::after {
          content: "";
          position: absolute;
          left: 0;
          height: 100%;
          width: 150px;
          background: linear-gradient(
            90deg,
            var(--main-color-opacity) 0%,
            rgba(0, 0, 0, 0) 100%
          );
        }
      `}</style>
    </aside>
  );
};

const NavIcon = ({ icon }: { icon: string }) => {
  const icons: { [key: string]: JSX.Element } = {
    home: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      </svg>
    ),
    'bar-chart': (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
        <rect x="15" y="5" width="4" height="12" rx="1"></rect>
        <rect x="7" y="8" width="4" height="9" rx="1"></rect>
      </svg>
    ),
    calendar: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4"></path>
        <path d="M16 2v4"></path>
        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
        <path d="M3 10h18"></path>
        <path d="M8 14h.01"></path>
        <path d="M12 14h.01"></path>
        <path d="M16 14h.01"></path>
        <path d="M8 18h.01"></path>
        <path d="M12 18h.01"></path>
        <path d="M16 18h.01"></path>
      </svg>
    ),
    folder: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path>
        <path d="M8 10h8"></path>
        <path d="M8 18h8"></path>
        <path d="M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"></path>
        <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
      </svg>
    ),
  };

  return icons[icon] || icons.home;
};

// ========== REVENUE CARD ==========
const RevenueCard = () => {
  const revenueData = {
    labels: Array.from({ length: 24 }, (_, i) => i + 1),
    datasets: [{
      data: [5,6,5,7,6,8,10,9,11,10,12,13,14,16,15,17,18,19,21,20,23,24,26,28],
      borderColor: 'rgba(255,115,80,1)',
      tension: 0.35,
    }]
  };

  return (
    <div data-card="revenue" className="sm:p-5 bg-white/5 border-white/10 border rounded-xl pt-4 pr-4 pb-4 pl-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-activity w-[20px] h-[20px]"
            style={{ color: 'rgb(52, 211, 153)' }}
          >
            <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
          </svg>
          <h3 className="text-sm font-medium">Total Revenue</h3>
        </div>
        <span className="text-xs ring-1 px-2 py-0.5 rounded-full text-emerald-300 bg-emerald-400/10 ring-emerald-400/30">
          ↑ 80%
        </span>
      </div>
      
      <div className="flex gap-2 mt-3 gap-x-2 gap-y-2 items-baseline">
        <span className="text-2xl sm:text-3xl font-semibold tracking-tight">
          $6,577.44
        </span>
        <span className="text-xs text-neutral-400">
          vs previous 28 days
        </span>
      </div>
      
      <div className="mt-4">
        <div className="h-28 rounded-lg border p-2 bg-neutral-900/70 border-white/10 relative overflow-hidden" 
          style={{ 
            background: 'linear-gradient(135deg, rgba(244,63,94,0.08) 0%, rgba(251,113,133,0.05) 100%)' 
          }}>
          <LineChart data={revenueData as any} type="line" />
          
          {/* Warp Loader Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-45 mix-blend-screen">
            <div className="warp-loader">
              {[0, 0.4, 0.8, 1.2].map((delay, i) => (
                <div 
                  key={i}
                  className="ring"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
              <div className="core-glow" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg border p-3 bg-white/5 border-white/10">
          <div className="text-xs text-neutral-400">Earnings</div>
          <div className="font-medium mt-1">$4,210</div>
        </div>
        <div className="rounded-lg border p-3 bg-white/5 border-white/10">
          <div className="text-xs text-neutral-400">Profit</div>
          <div className="font-medium mt-1">$1,950</div>
        </div>
        <div className="rounded-lg border p-3 bg-white/5 border-white/10">
          <div className="text-xs text-neutral-400">Cashback</div>
          <div className="font-medium mt-1">$417</div>
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

// ========== GROWTH CARD ==========
const GrowthCard = () => {
  const growthData = {
    labels: ['Mo','Tu','We','Th','Fr','Sa','Su'],
    datasets: [{
      data: [12,18,14,26,34,22,20],
      backgroundColor: 'rgba(244,63,94,1)',
    }]
  };

  return (
    <div data-card="growth" className="rounded-xl border p-4 sm:p-5 border-white/10 bg-white/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-trending-up w-[20px] h-[20px]"
            style={{ color: 'rgb(56, 189, 248)' }}
          >
            <line x1="18" x2="18" y1="20" y2="10"></line>
            <line x1="12" x2="12" y1="20" y2="4"></line>
            <line x1="6" x2="6" y1="20" y2="14"></line>
          </svg>
          <h3 className="text-sm font-medium">Revenue Growth</h3>
        </div>
        <span className="text-xs ring-1 px-2 py-0.5 rounded-full text-sky-300 bg-sky-400/10 ring-sky-400/30">
          ↑ 78%
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-lg border p-3 bg-white/5 border-white/10">
          <div className="text-xs text-neutral-400">Weekly report</div>
          <div className="font-medium mt-1">$6,812.31</div>
        </div>
        <div className="rounded-lg border p-3 bg-white/5 border-white/10">
          <div className="text-xs text-neutral-400">Qualified</div>
          <div className="font-medium mt-1">8,214</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-28 rounded-lg border p-2 bg-neutral-900/70 border-white/10">
          <BarChart data={growthData} type="bar" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-neutral-300">
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
          className="lucide lucide-target w-[18px] h-[18px]"
          style={{ color: 'rgb(52, 211, 153)' }}
        >
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
        </svg>
        Projected week revenue:
        <span className="font-medium text-white">$7,204.12</span>
      </div>
    </div>
  );
};

// ========== SCHEDULE CARD ==========
const ScheduleCard = () => {
  const scheduleItems = [
    {
      time: '9:00 AM',
      title: 'Standup with Platform',
      description: '10 attendees',
      icon: 'users'
    },
    {
      time: '11:30 AM',
      title: 'Roadmap grooming',
      description: 'A/B rollout plan',
      icon: 'flask'
    },
    {
      time: '2:15 PM',
      title: 'Finance update draft',
      description: 'ARR target: $3.8M',
      icon: 'file-text'
    }
  ];

  return (
    <div className="md:col-span-2 rounded-xl border p-4 sm:p-5 border-white/10 bg-white/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-clock w-[20px] h-[20px]"
            style={{ color: 'rgb(167, 139, 250)' }}
          >
            <circle cx="12" cy="13" r="8"></circle>
            <path d="M5 3 2 6"></path>
            <path d="m22 6-3-3"></path>
            <path d="M6.38 18.7 4 21"></path>
            <path d="M17.64 18.67 20 21"></path>
            <path d="m9 13 2 2 4-4"></path>
          </svg>
          <h3 className="text-sm font-medium">Today</h3>
        </div>
        <button className="text-xs rounded-lg border px-2.5 py-1 transition border-white/10 bg-white/5 hover:bg-white/10">
          View all
        </button>
      </div>
      
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {scheduleItems.map((item, index) => (
          <div key={index} className="rounded-lg border p-3 bg-neutral-900/70 border-white/10">
            <div className="text-xs text-neutral-400">{item.time}</div>
            <div className="mt-1 font-medium">{item.title}</div>
            <div className="mt-1 text-xs flex items-center gap-1 text-neutral-400">
              <ScheduleIcon icon={item.icon} />
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ScheduleIcon = ({ icon }: { icon: string }) => {
  const icons: { [key: string]: JSX.Element } = {
    users: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-44v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M6 17.13A4 4 0 0 0 3 19v2"></path>
      </svg>
    ),
    flask: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 2v8"></path>
        <path d="M8.5 2h3"></path>
        <path d="M5 22h14"></path>
        <path d="M19 10H5"></path>
        <path d="M6 20l-1-4l6-6l6 6l-1 4"></path>
      </svg>
    ),
    'file-text': (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16l4-4h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
        <path d="M8 7h8"></path>
        <path d="M8 11h8"></path>
      </svg>
    ),
  };

  return icons[icon] || icons.users;
};

// ========== MAIN DASHBOARD PREVIEW ==========
export const DashboardPreview = () => {
  return (
    <div className="sm:px-6 lg:px-8 sm:mt-16 max-w-6xl mt-12 mr-auto ml-auto pr-4 pl-4">
      <div 
        className="rounded-2xl shadow-2xl backdrop-blur bg-neutral-900/60 in-view"
        style={{
          position: 'relative',
          '--border-gradient': 'linear-gradient(180deg, rgba(251, 113, 133, 0), rgba(255, 133, 133, 0.6), rgba(225, 29, 72, 0))',
          '--border-radius-before': '16px'
        } as React.CSSProperties}
        data-scroll-animate="blur-up"
      >
        {/* App Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-tr from-fuchsia-500 to-rose-500 ring-1 ring-white/15">
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
                className="lucide lucide-star w-[18px] h-[18px]"
                style={{ color: 'rgb(255, 255, 255)' }}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </span>
            <span className="font-medium">AIDashboard Console</span>
            <span className="ml-2 hidden sm:inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ring-1 bg-emerald-400/10 text-emerald-300 ring-emerald-400/30">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide lucide-activity w-[14px] h-[14px]"
                style={{ color: 'rgb(110, 231, 183)' }}
              >
                <path d="M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21"></path>
              </svg>
              Live
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
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
                className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px]"
                style={{ color: 'rgb(163, 163, 163)' }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <input 
                className="w-64 rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-neutral-400 border focus:outline-none focus:ring-2 focus:ring-white/20 bg-white/5 border-white/10" 
                placeholder="Search anything..."
              />
            </div>
            
            <button className="p-2 rounded-lg transition hover:bg-white/5" aria-label="Notifications">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide lucide-bell"
                style={{ color: 'rgb(212, 212, 212)' }}
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </button>
            
            <img 
              className="h-8 w-8 rounded-full object-cover ring-2 ring-white/10" 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop" 
              alt="Riley Park" 
            />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:p-6 pt-4 pr-4 pb-4 pl-4 gap-x-4 gap-y-4">
          <SidebarNavigation />
          
          {/* Main Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <RevenueCard />
            <GrowthCard />
            <ScheduleCard />
          </div>
        </div>
      </div>
    </div>
  );
};