"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { SVGButton } from '@/lib/utils';
// Types
interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  className?: string;
  aemNavigation?: AEMNavigationProps;
}

interface AEMNavigationProps {
  logo: {
    name: string;
    image: string;
  },
  services: servicesProps[];
}

interface servicesProps {
  id: number;
  name: string;
  route: string;
  slug: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  services: servicesProps[];
}

const Navigation = ({ services, isScrolled }: { services: servicesProps[], isScrolled: boolean }) => {
  return (
    <nav className="hidden lg:flex gap-x-8 items-center justify-between">
      {services.map((item) => (
        <Link
          key={item.id}
          // Lógica: Si isScrolled es true, texto blanco. Si no, negro.
          // El hover siempre es celeste (sky-500).
          className={`transition text-sm font-medium hover:text-sky-500 ${isScrolled ? 'text-black' : 'text-neutral-950'
            }`}
          href={item.route}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

// MobileMenu Component
const MobileMenu = ({ isOpen, onClose, services }: MobileMenuProps) => {
  // This would typically come from your links file

  return (
    <div
      id="mobile-menu"
      className={`lg:hidden absolute top-16 left-0 right-0 bg-neutral-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl ${isOpen ? 'block' : 'hidden'
        }`}
      style={{ animation: 'slideDown 0.3s ease-out' }}
    >
      <nav className="flex flex-col px-4 py-6 space-y-4">
        {services.map((item) => (
          <Link
            key={item.id}
            className="text-base text-neutral-300 hover:text-white transition py-2 px-3 rounded-lg hover:bg-white/5"
            href={item.route}
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
        <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
          <button className="inline-flex transition overflow-hidden group text-sm font-medium rounded-full py-2 px-4 gap-x-2 items-center justify-center border border-black bg-black text-white hover:bg-neutral-800">
            <span>Cotizar</span>
            <SVGButton className="transition-all duration-400 group-hover:translate-x-1" color='black'>
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </SVGButton>
          </button>
        </div>
      </nav>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export const Navbar = ({ className = '', aemNavigation }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky z-20 top-0 w-full transition-all duration-300 border-b flex items-center justify-between ${isScrolled
        ? 'bg-white backdrop-blur-md border-white/10' // Efecto "vidrio" al bajar
        : 'bg-white border-transparent'                        // Blanco sólido al inicio
        } ${className}`}
    >
      <div className="flex sm:px-6 lg:pl-46 lg:pr-52 w-full h-16 border-neutral-50/10 border ring-0 pr-4 pl-4 space-x-6 items-center justify-between">
        {/* Mobile Menu Toggle Button */}
        <button
          id="mobile-menu-toggle"
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <SVGButton className="lucide lucide-x" color='black'>
              <path className='bg-black' d="M18 6 6 18"></path>
              <path className='bg-black' d="m6 6 12 12"></path>
            </SVGButton>
          ) : (
            <SVGButton className="lucide lucide-menu" color='black'>
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </SVGButton>
          )}
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center justify-center w-[120px] h-10 min-w-[120px] shrink-0"
          aria-label={aemNavigation?.logo?.name}
        >
          <img
            src="logo_expand.png"
            alt={aemNavigation?.logo?.name || "Logo"}
            className="h-full w-full object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <Navigation services={aemNavigation?.services || []} isScrolled={isScrolled} />

        {/* CTA Button - Desktop */}
        <div className="hidden lg:flex items-center gap-3 ">
          <div className=" flex flex-col gap-3">
            <button className="inline-flex transition overflow-hidden group text-sm font-medium rounded-full py-2 px-4 gap-x-2 items-center justify-center border border-black bg-black text-white hover:bg-neutral-800">
              <span>Cotizar</span>
              <SVGButton className="transition-all duration-400 group-hover:translate-x-1" color='white'>
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </SVGButton>
            </button>
          </div>
        </div>

        {/* CTA Button - Mobile */}
        <div className="lg:hidden flex items-center gap-3">
          <button className="inline-flex transition overflow-hidden group text-sm font-medium rounded-full py-2 px-4 items-center border border-black bg-black text-white hover:bg-neutral-800 hover:border-neutral-800">
            <span className="relative z-10 transition-all duration-300">
              Cotizar
            </span>
            <SVGButton className="transition-all duration-400 group-hover:translate-x-1" color='white'>
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </SVGButton>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} services={aemNavigation?.services || []} />
    </header>
  );
};

// Export types
export type { NavbarProps, NavItem };