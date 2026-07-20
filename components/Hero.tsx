'use client';

import Link from "next/link";
import { WhatsAppButton } from "./WhatsAppButton"; // Importa el nuevo componente

interface OuserlveProps {
  title: string,
  description: string
}

interface HeroProps extends OuserlveProps {
  multimedia: any;
}

// --- ProductPreview Component (Sección independiente) ---
const OurselveTitle = ({ title, description }: OuserlveProps) => {
  return (
    /* CORRECCIÓN: Quitamos los paddings exagerados (pt-[470px]). 
       Ahora usamos un flujo normal con py-16 (padding arriba y abajo) y mt-24 para separarlo con seguridad de la sección superior. */
    <div className="px-8 py-0 mt-18 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12 in-view" data-scroll-animate-children="">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-center mt-2 text-black">
          {
            title
          }
        </h2>
        <p
          className="text-lg font-extralight sm:text-lg md:text-xl lg:text-2xl text-neutral-700 text-center mt-4"
          style={{ opacity: 1, transform: 'translateY(0px)' }}
        >
          {
            description
          }
        </p>
      </div>
    </div>
  );
};

// --- Hero Component ---
export const Hero = ({ multimedia, title, description }: HeroProps) => {
  const { description :carruselTitle } = multimedia.content.homepage_media
  return ( 
    <>
      {/* El Hero ahora solo maneja la sección de la imagen principal */}
      <section className="h-64 md:h-screen relative w-full" id="home">
        {/* Background Elements */}
        <div
          className="aura-background-component top-0 w-full h-full -z-10 absolute opacity-30"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 0%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 0%, black 0%, transparent)'
          }}
        >
          <div id="particles-js" className="absolute inset-0 -z-10"></div>
        </div>
        <div className="relative w-full h-full">
          {/* Fondo */}
          <div
            className="bg-center w-full h-full bg-cover absolute top-0"
            style={{
              backgroundImage: `url('/1_INICIO-NOSOTROS/homepage.png')`,
              maskImage: 'linear-gradient(180deg, transparent, black 0%, black 95%, transparent)',
              WebkitMaskImage: 'linear-gradient(180deg, transparent, black 0%, black 95%, transparent)'
            }}
          />

          {/* Contenedor del Título */}
          <div className="absolute inset-x-0 top-16 sm:top-24 flex justify-center px-4">
            <h1
              className="text-white text-2xl sm:text-4xl md:text-6xl font-bold text-center max-w-3xl"
              style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
            >
              { carruselTitle }
            </h1>
          </div>

          <WhatsAppButton phoneNumber="51940058361" />
        </div>

        {/* Main Content */}
        <div className="sm:px-6 lg:px-8 sm:pt-24 max-w-3xl mx-auto pt-16 px-4 in-view relative z-10" data-scroll-animate-children="">
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
        </div>
      </section>

      {/* 👇 AL PONERLO AQUÍ AFUERA: Rompe el comportamiento del absolute del Hero 
          y se renderizará perfectamente ABAJO de la tarjeta blanca de Misión/Visión */}
      <OurselveTitle title={title} description={description} />
    </>
  );
};