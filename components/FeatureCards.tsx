"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

interface Gallery6Props {
  heading?: string;
  demoUrl?: string;
  items?: GalleryItem[];
  className?: string;
}

const FeatureCards = ({
  heading = "Servicios",
  items = [], 
  className,
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section 
      className={cn(
        "my-16 py-16 bg-white rounded-3xl border border-neutral-200/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.09)] max-w-7xl mx-auto overflow-hidden", 
        className
      )}
    >
      <div className="container px-4 mx-auto md:px-10">
        {/* Encabezado */}
        <div className="mb-10 flex flex-col justify-between items-start md:mb-14 md:flex-row md:items-end">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {heading}
            </h2>
          </div>
          
          {/* Botones de Navegación */}
          <div className="mt-6 flex items-center justify-start gap-3 md:mt-0">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="rounded-full h-11 w-11 border-neutral-200 bg-white text-neutral-600 transition-all duration-200 hover:bg-neutral-50 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="rounded-full h-11 w-11 border-neutral-200 bg-white text-neutral-600 transition-all duration-200 hover:bg-neutral-50 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Contenedor del Carrusel */}
      <div className="w-full max-w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start", // CORRECCIÓN: Obligamos a Embla a alinear los elementos de forma rígida al inicio
            containScroll: "trimSnaps", // CORRECCIÓN: Elimina el espacio fantasma al final para que el último elemento encaje justo al borde
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="w-full max-w-full"
        >
          {/* CORRECCIÓN: Cambiamos los márgenes negativos complejos por paddings uniformes (px-6 md:px-10). Esto asegura que Embla calcule el fin del scroll perfectamente sin importar cuántos elementos tengas */}
          <CarouselContent className="w-full max-w-full -ml-4 px-6 md:px-10">
            {items.map((item) => (
              <CarouselItem key={item.id} className="pl-4 md:max-w-[400px]">
                <motion.a
                  href={item.url}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className={cn(
                    "group flex flex-col justify-between h-full p-6 bg-white rounded-none transition-all duration-300 relative",
                    "border-0 shadow-xs",
                    "hover:bg-[rgb(20,117,172)] hover:shadow-xl hover:shadow-[rgba(20,117,172,0.15)]"
                  )}
                >
                  <div className="w-full relative z-10">
                    {/* Contenedor de la Imagen */}
                    <div className="flex aspect-4/3 overflow-clip rounded-none relative bg-neutral-50 border-0 transition-colors duration-300 group-hover:bg-white/10">
                      <div className="flex-1 overflow-hidden p-4 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      
                      {/* Indicador de Enlace */}
                      <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white text-neutral-900 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-sm flex items-center justify-center">
                        <ArrowUpRight className="size-4" />
                      </div>
                    </div>

                    {/* Título */}
                    <h3 className="mt-6 mb-3 line-clamp-2 text-xl font-bold tracking-tight text-neutral-900 group-hover:text-white transition-colors duration-300 break-words lg:text-2xl">
                      {item.title}
                    </h3>

                    {/* Descripción */}
                    <p className="mb-8 line-clamp-3 text-sm text-neutral-500 leading-relaxed group-hover:text-white/80 transition-colors duration-300 md:text-base">
                      {item.summary}
                    </p>
                  </div>

                  {/* Acción Inferior */}
                  <div className="flex items-center text-sm font-bold text-neutral-800 group-hover:text-white transition-colors duration-300 pt-4 relative z-10">
                    <span>Saber más</span>
                    <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </motion.a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { FeatureCards };