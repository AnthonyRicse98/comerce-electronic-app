"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, X } from "lucide-react";
import { motion } from "motion/react";

interface LightboxProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Lightbox = ({ imageSrc, title, subtitle, children }: LightboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isInnerZoomed, setIsInnerZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: "50%", y: "50%" });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isInnerZoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setZoomOrigin({ x: `${x}%`, y: `${y}%` });
      setIsInnerZoomed(true);
    } else {
      setIsInnerZoomed(false);
    }
  };

  const handleClose = () => {
    setIsInnerZoomed(false);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative group overflow-hidden rounded-2xl w-full h-full">
        {children}
        {/* LUPA 100% UNIVERSAL: Fondo negro sólido, borde gris de alto contraste e ícono blanco brillante */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="absolute top-4 right-4 z-20 bg-black text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-2xl cursor-pointer border border-neutral-700 md:opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Ver imagen completa"
        >
          <Search className="w-4 h-4 md:w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {isOpen && mounted && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div 
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center z-[9999]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón X de Cierre con el mismo estilo de alto contraste */}
            <button 
              onClick={handleClose}
              className="absolute -top-3 -right-3 md:-top-5 md:-right-5 z-[10000] text-white bg-black hover:bg-neutral-900 border border-neutral-700 p-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-xl"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5 md:w-6 h-6 stroke-[2.5]" />
            </button>

            <div className="overflow-hidden rounded-2xl border border-white/5 shadow-2xl bg-black/40 relative flex items-center justify-center">
              <motion.img
                src={imageSrc}
                alt={title}
                onClick={handleImageClick}
                drag={isInnerZoomed}
                dragConstraints={{ left: -600, right: 600, top: -400, bottom: 400 }}
                dragElastic={0.05}
                animate={{ 
                  scale: isInnerZoomed ? 2.5 : 1, 
                  x: isInnerZoomed ? undefined : 0, 
                  y: isInnerZoomed ? undefined : 0 
                }}
                style={{ 
                  transformOrigin: `${zoomOrigin.x} ${zoomOrigin.y}` 
                }}
                transition={{ type: "spring", damping: 30, stiffness: 180 }}
                className={`max-w-full max-h-[75vh] object-contain select-none
                  ${isInnerZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
              />
            </div>
            
            <div className="mt-4 text-center select-none">
              <h4 className="text-white text-lg font-semibold">{title}</h4>
              {subtitle && <p className="text-white/60 text-sm mt-0.5">{subtitle}</p>}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};