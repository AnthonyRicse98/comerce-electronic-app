"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { SVGButton } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// --- Interfaces & Types ---
interface NavItem {
  label: string;
  href: string;
}

interface SubItemProps {
  name: string;
  slug: string;
}

interface servicesProps {
  id: number;
  name: string;
  slug: string;
  route: string;
  content?: SubItemProps[];
}

interface NavbarProps {
  className?: string;
  aemNavigation?: AEMNavigationProps;
}

interface AEMNavigationProps {
  logo: {
    name: string;
    image: string;
    route?: string;
  };
  services: servicesProps[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  services: servicesProps[];
}

// --- Helper para formatear la ruta base de manera limpia y segura ---
const getFormatRoute = (route: string) => {
  return route.startsWith('/') ? route : `/${route}`;
};

// --- Desktop Navigation Component ---
const Navigation = ({ services, isScrolled }: { services: servicesProps[]; isScrolled: boolean }) => {
  const textClass = isScrolled ? 'text-black' : 'text-neutral-950';

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="flex gap-x-2 items-center ">
        {services.map((item) => {
          // Si el item cuenta con la propiedad content y tiene elementos, renderiza el dropdown
          if (item.content && item.content.length > 0) {
            return (
              <NavigationMenuItem key={item.id}>
                <NavigationMenuTrigger
                  className={`bg-transparent hover:bg-transparent data-[state=open]:text-sky-500 hover:text-sky-500 transition text-sm font-medium border-none shadow-none focus:bg-transparent px-3 py-2 ${textClass}`}
                >
                  {item.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="shadow-none outline-none">
                  <ul className="grid w-[200px] gap-1 p-2 bg-white border-none rounded-xl shadow-xl border border-neutral-100">
                    {item.content.map((subItem, idx) => (
                      <li key={idx}>
                        <Link
                          href={getFormatRoute(item.route)}
                          className="block select-none rounded-lg p-2 text-sm font-medium text-neutral-700 no-underline outline-none transition-colors hover:bg-neutral-50 hover:text-sky-500"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          // Enlace simple para el resto de items
          return (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuLink
                href={getFormatRoute(item.route)}
                className={`bg-transparent hover:bg-transparent transition text-sm font-medium border-none shadow-none  hover:text-sky-500 focus:bg-transparent px-3 py-2 rounded-md block ${textClass}`}
              >
                {item.name}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

// --- MobileMenu Component ---
const MobileMenu = ({ isOpen, onClose, services }: MobileMenuProps) => {
  return (
    <div
      id="mobile-menu"
      className={`lg:hidden absolute top-16 left-0 right-0 bg-neutral-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl ${isOpen ? 'block' : 'hidden'
        }`}
      style={{ animation: 'slideDown 0.3s ease-out' }}
    >
      <nav className="flex flex-col px-4 py-6 space-y-3 max-h-[75vh] overflow-y-auto">
        {services.map((item) => (
          <div key={item.id} className="flex flex-col">
            {item.content && item.content.length > 0 ? (
              <>
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-3 pt-2 pb-1">
                  {item.name}
                </span>
                {item.content.map((subItem, idx) => (
                  /* CORRECCIÓN AQUÍ: Cambiado a Link de Next.js apuntando a item.route */
                  <Link
                    key={idx}
                    className="text-base text-neutral-300 hover:text-white transition py-2 px-6 rounded-lg hover:bg-white/5"
                    href={getFormatRoute(item.route)}
                    onClick={onClose}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </>
            ) : (
              /* CORRECCIÓN AQUÍ: Cambiado a Link de Next.js apuntando a item.route */
              <Link
                className="text-base text-neutral-300 hover:text-white transition py-2 px-3 rounded-lg hover:bg-white/5"
                href={getFormatRoute(item.route)}
                onClick={onClose}
              >
                {item.name}
              </Link>
            )}
          </div>
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

// --- Navbar Main Component ---
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
        ? 'bg-white/90 backdrop-blur-md border-neutral-200 shadow-sm'
        : 'bg-white border-transparent'
        } ${className}`}
    >
      <div className="flex sm:px-6 lg:pl-46 lg:pr-52 w-full h-16 border-neutral-50/10 border ring-0 pr-4 pl-4 space-x-6 items-center justify-between">

        {/* Mobile Menu Toggle Button */}
        <button
          id="mobile-menu-toggle"
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-neutral-800 hover:bg-neutral-100 transition"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <SVGButton className="lucide lucide-x" color='black'>
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
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
          href={aemNavigation?.logo?.route || "/"}
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
        <div className="hidden lg:flex items-center gap-3">
          <button className="inline-flex transition overflow-hidden group text-sm font-medium rounded-full py-2 px-4 gap-x-2 items-center justify-center border border-black bg-black text-white hover:bg-neutral-800">
            <span>Cotizar</span>
            <SVGButton className="transition-all duration-400 group-hover:translate-x-1" color='white'>
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </SVGButton>
          </button>
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

export type { NavbarProps, NavItem };