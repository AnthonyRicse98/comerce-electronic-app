'use client';

import { t } from '@/literals';
import Link from 'next/link';
import { JSX } from 'react';

// Types
interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  platform: string;
  href: string;
  icon: string;
  label: string;
}

// Navigation data (debes reemplazar esto con tu data real)
const navItems: FooterLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/' },
  { label: 'Contacto', href: '/' }
];

const socialLinks: SocialLink[] = [
  {
    platform: 'linkedin',
    href: '#',
    icon: 'linkedin',
    label: 'LinkedIn'
  },
  {
    platform: 'instagram',
    href: '#',
    icon: 'instagram',
    label: 'Instagram'
  },
  {
    platform: 'twitter',
    href: '#',
    icon: 'twitter',
    label: 'Twitter'
  },
];
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

interface AEMNavigationProps {
  logo: {
    name: string;
    image: string;
    route?: string;
  };
  phone?: string,
  social?: string,
  description?: string,
  services: servicesProps[];
}

interface FooterProps {
  className?: string;
  aemNavigation?: AEMNavigationProps;
}


// Social Icon Component
const SocialIcon = ({ icon }: { icon: string }) => {
  const icons: { [key: string]: JSX.Element } = {
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect width="4" height="12" x="2" y="9"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
    instagram: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
      </svg>
    ),
    twitter: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
      </svg>
    ),
  };

  return icons[icon] || icons.twitter;
};

// FooterMain Component
const FooterMain = ({ aemNavigation }: FooterProps) => {
  return (
    <div data-card="site-footer" className="space-y-8 in-view" data-scroll-animate="fade-up">
      <div className="flex flex-col md:flex-row gap-6 px-6 gap-x-6 gap-y-6 items-center justify-between">
        {/* Brand */}
        <Link
          href={aemNavigation?.logo?.route || "/"}
          className="inline-flex items-center justify-center w-[150px]  min-w-[250px] shrink-0"
          aria-label={aemNavigation?.logo?.name}
        >
          <img
            src="logo_expand.png"
            alt={aemNavigation?.logo?.name || "Logo"}
            className="h-full w-full object-contain"
          />
        </Link>


        {/* Navigation */}
        <nav className="grid grid-cols-3 sm:flex sm:flex-row items-center gap-4 text-sm">
          {navItems.map((service) => (
            <Link
              key={service.label}
              href={service.href}
              className="transition text-neutral-600 hover:text-neutral-800 whitespace-nowrap"
            >
              {service.label}
            </Link>
          ))}
        </nav>

      </div>

      <div className="w-full  bg-black/210"></div>

      <div className="flex flex-col sm:flex-row gap-4 px-6 gap-x-4 gap-y-4 items-center justify-between">
        <div className="text-sm text-neutral-500">
          <span className="inline-block transition-colors hover:text-neutral-800">{t('SIME-POWER-TITLE').toUpperCase()} - {aemNavigation?.description}</span>
        </div>
        <div className="text-sm text-neutral-500">
          <span className="inline-block transition-colors hover:text-neutral-800">{t('SIME-POWER-PHONE')}:{aemNavigation?.phone}</span>
        </div>
        <div className="text-sm text-neutral-500">
          <span className="inline-block transition-colors hover:text-neutral-800">{t('SIME-POWER-DEVELOPER')}</span>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map((social) => (
            <Link
              key={social.platform}
              href={social.href}
              aria-label={social.label}
              className="inline-flex items-center justify-center w-6 h-6 rounded transition bg-neutral-800 hover:bg-neutral-700 text-white"
            >
              <SocialIcon icon={social.icon} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Footer Component
export const Footer = ({ aemNavigation }: FooterProps) => {
  return (
    <footer className="sm:px-6 lg:pl-0 lg:pr-0 w-full max-w-7xl mr-auto ml-auto pt-10 pr-4 pb-10 pl-4">
      {/* Footer Main */}
      <FooterMain aemNavigation={aemNavigation} />
    </footer>
  );
};