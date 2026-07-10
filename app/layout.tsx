import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ElectronicRepository } from '@/core/aplication/repository/electronic.repository';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

import { t } from '@/literals';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${t('SIME-POWER-TITLE')} | ${t('SIME-POWER-DESCRIPTION')}`,
  description: t('SIME-POWER-DESCRIPTION'),
  icons:{
    icon: '/vercel.svg',
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const aemNavigation = await ElectronicRepository.getNavigation();
  // Proporciona un objeto predeterminado si aemNavigation es null
  const navigationData = aemNavigation;

  return (
    <html lang="es" className="translate.ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/vercel.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} antialiased text-neutral-100 bg-neutral-950`}>
        <Navbar aemNavigation={navigationData.collection} />
        {children}
        <Footer aemNavigation={navigationData.collection} />
      </body>
    </html>
  );
}