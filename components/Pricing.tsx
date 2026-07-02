'use client';

import { useState } from 'react';

// Types
interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  featured?: boolean;
  ctaText: string;
  ctaVariant: 'primary' | 'secondary';
}

interface BillingCycle {
  type: 'monthly' | 'annual';
  label: string;
  discount?: string;
}

// Pricing Header Component
interface PricingHeaderProps {
  billingCycle: 'monthly' | 'annual';
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
}

const PricingHeader = ({ billingCycle, onBillingCycleChange }: PricingHeaderProps) => {
  return (
    <div className="mb-12 text-center in-view" data-scroll-animate="fade-up" data-scroll-animate-children="">
      <span 
        className="text-sm font-medium text-rose-400"
        style={{ opacity: 1, transform: 'translateY(0px)' }}
      >
        Pricing
      </span>
      
      <h2 
        className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
        style={{ opacity: 1, transform: 'translateY(0px)' }}
      >
        Know exactly what you pay, no hidden fees, no surprises.
      </h2>
      
      <p 
        className="mt-4 text-base sm:text-lg text-neutral-300"
        style={{ opacity: 1, transform: 'translateY(0px)' }}
      >
        Switch billing anytime. Save more on annual plans.
      </p>
    </div>
  );
};

// Pricing Toggle Component
interface PricingToggleProps {
  billingCycle: 'monthly' | 'annual';
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
}

const billingCycles: BillingCycle[] = [
  { type: 'monthly', label: 'Monthly' },
  { type: 'annual', label: 'Annual', discount: 'Save 20%' },
];

const PricingToggle = ({ billingCycle, onBillingCycleChange }: PricingToggleProps) => {
  return (
    <div 
      className="inline-flex overflow-hidden rounded-lg mt-6 relative"
      role="tablist" 
      aria-label="Billing period"
      style={{
        '--border-gradient': 'linear-gradient(135deg, rgba(248, 113, 113, 0), rgba(220, 38, 38, 0.25))',
        '--border-radius-before': '8px'
      } as React.CSSProperties}
    >
      {billingCycles.map((cycle) => (
        <button
          key={cycle.type}
          data-billing={cycle.type}
          aria-selected={billingCycle === cycle.type}
          aria-controls="pricing-grid"
          className={`px-4 py-2 text-sm font-medium transition-all relative ${
            billingCycle === cycle.type
              ? 'bg-white text-neutral-900'
              : 'text-neutral-300 bg-[radial-gradient(circle_at_right,var(--tw-gradient-stops))] from-red-400/10 to-red-600/0 bg-white/10'
          }`}
          onClick={() => onBillingCycleChange(cycle.type)}
        >
          <span className="flex items-center gap-2">
            {cycle.label}
            {cycle.discount && (
              <span className="text-xs bg-rose-500 text-white px-1.5 py-0.5 rounded-full">
                {cycle.discount}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
};

// Pricing Card Component
interface PricingCardProps {
  plan: PricingPlan;
  billingCycle: 'monthly' | 'annual';
  index: number;
}

const PricingCard = ({ plan, billingCycle, index }: PricingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
  const isFree = price === 0;

  if (plan.featured) {
    return (
      <div 
        id={`pricing-card-${plan.id}`}
        className="overflow-hidden flex flex-col rounded-2xl ring-1 pt-6 pr-6 pb-6 pl-6 relative bg-neutral-900/80 ring-white/10"
        style={{ 
          position: 'relative',
          '--border-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
          '--border-radius-before': '16px',
          transformStyle: 'preserve-3d',
          transform: isHovered 
            ? 'perspective(800px) rotateX(-5deg) rotateY(5deg) translateZ(10px)'
            : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: 'transform 0.3s ease'
        } as React.CSSProperties}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow background */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{ 
            background: `radial-gradient(120% 120% at 79.7819% 94.743%, rgba(244, 63, 94, 0.25) 0%, rgba(244, 63, 94, 0.12) 35%, rgba(244, 63, 94, 0.05) 55%, rgba(0, 0, 0, 0) 75%)`,
            opacity: isHovered ? 1 : 0.7
          }}
        />

        <div className="relative flex items-center justify-between">
          <div className="text-sm text-neutral-300">{plan.name}</div>
          <span className="inline-flex items-center gap-1 text-xs bg-rose-500 px-2 py-0.5 rounded-full ring-1 text-white ring-white/20">
            Popular
          </span>
        </div>

        <div className="relative mt-2 flex items-baseline gap-2">
          <div className="text-3xl font-semibold tracking-tight" aria-live="polite" aria-atomic="true">
            ${price}
            {!isFree && <span className="text-sm font-normal text-neutral-400">/month</span>}
          </div>
        </div>
        
        <div className="relative mt-1 text-xs text-neutral-400">
          {isFree ? 'Free forever' : `billed ${billingCycle === 'annual' ? 'annually' : 'monthly'}`}
        </div>

        <div className="relative mt-5 text-sm text-neutral-400">
          {plan.description}
        </div>
        
        <ul className="relative mt-3 space-y-2 text-sm text-neutral-300">
          {plan.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="lucide lucide-check mt-0.5 shrink-0"
                style={{ color: '#f43f5e' }}
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="relative mt-6 pt-4">
          <button 
            className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
              plan.ctaVariant === 'primary' 
                ? 'bg-white text-neutral-900 hover:bg-neutral-100' 
                : 'border border-rose-400/40 text-rose-400 hover:bg-white/5'
            }`}
          >
            {plan.ctaText}
          </button>
        </div>
      </div>
    );
  }

  // Regular pricing card
  return (
    <div 
      id={`pricing-card-${plan.id}`}
      className="flex flex-col overflow-hidden bg-linear-to-br from-white/10 to-white/0 rounded-2xl pt-6 pr-6 pb-6 pl-6 relative"
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: isHovered 
          ? 'perspective(800px) rotateX(-5deg) rotateY(5deg) translateZ(10px)'
          : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        transition: 'transform 0.3s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ 
          background: `radial-gradient(120% 120% at 50% 50%, rgba(244, 63, 94, 0.15) 0%, rgba(244, 63, 94, 0.05) 50%, transparent 100%)`,
          opacity: isHovered ? 1 : 0
        }}
      />

      <div className="text-sm relative text-neutral-300">{plan.name}</div>
      
      <div className="mt-2 flex items-baseline gap-2 relative">
        <div className="text-3xl font-semibold tracking-tight" aria-live="polite" aria-atomic="true">
          ${price}
          {!isFree && <span className="text-sm font-normal text-neutral-400">/month</span>}
        </div>
      </div>
      
      <div className="mt-1 text-xs relative text-neutral-400">
        {isFree ? 'Free forever' : `billed ${billingCycle === 'annual' ? 'annually' : 'monthly'}`}
      </div>

      <div className="mt-5 text-xs uppercase relative text-neutral-400">
        {plan.description}
      </div>
      
      <ul className="mt-3 space-y-2 text-sm relative text-neutral-300">
        {plan.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="lucide lucide-check mt-0.5 shrink-0"
              style={{ color: '#f43f5e' }}
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-4 relative">
        <button 
          className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
            plan.ctaVariant === 'primary' 
              ? 'bg-white text-neutral-900 hover:bg-neutral-100' 
              : 'border border-rose-400/40 text-rose-400 hover:bg-white/5'
          }`}
        >
          {plan.ctaText}
        </button>
      </div>
    </div>
  );
};

// Main Pricing Component
const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'For students',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      'Basic analytics and reporting',
      'Essential features',
      'Community support',
      'Limited customization',
      'Single project'
    ],
    ctaText: 'Get started',
    ctaVariant: 'secondary'
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing teams',
    monthlyPrice: 19,
    annualPrice: 15,
    features: [
      'Custom dashboards and segments',
      'Role‑based access & SSO',
      'Priority support',
      'Advanced analytics',
      'API & webhooks'
    ],
    featured: true,
    ctaText: 'Get started',
    ctaVariant: 'primary'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    monthlyPrice: 129,
    annualPrice: 99,
    features: [
      'Enterprise‑grade analytics',
      'Tailored solutions & SLAs',
      'Dedicated Customer Success',
      'SSO/SAML & advanced permissions',
      'Custom pricing'
    ],
    ctaText: 'Get started',
    ctaVariant: 'secondary'
  }
];

export const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section className="sm:py-24 pt-16 pb-16 relative" id="pricing">
      <div className="sm:px-6 lg:px-8 max-w-7xl mr-auto ml-auto pr-4 pl-4">
        <PricingHeader 
          billingCycle={billingCycle}
          onBillingCycleChange={setBillingCycle}
        />

        {/* Billing Toggle */}
        <div className="flex justify-center">
          <PricingToggle 
            billingCycle={billingCycle}
            onBillingCycleChange={setBillingCycle}
          />
        </div>

        {/* Pricing Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 gap-x-6 gap-y-6 in-view mt-12" 
          id="pricing-grid" 
          data-scroll-animate-children=""
        >
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              index={index}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 text-sm text-neutral-400">
          <p>All plans include 14-day free trial. No credit card required.</p>
          <p className="mt-2">Need a custom solution? <a href="#contact" className="text-rose-400 hover:text-rose-300 transition">Contact sales</a></p>
        </div>
      </div>
    </section>
  );
};