import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ElectronicRepository } from '@/core/aplication/repository/electronic.repository';
import { Navbar } from '@/components/Navbar';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AIDashboard — AI analytics that accelerate growth',
  description: 'AIDashboard helps product and revenue teams turn data into action with AI-powered analytics.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
     const aemNavigation = await ElectronicRepository.getNavigation();
  return (
    <html lang="en" className="">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} antialiased text-neutral-100 bg-neutral-950`}>
        <Navbar aemNavigation={aemNavigation.collection} />
        {children}
      </body>
    </html>
  );
}