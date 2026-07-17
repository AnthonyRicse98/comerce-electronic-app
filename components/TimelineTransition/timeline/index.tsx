"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface TimelineItem {
    type: string;
    title: string;
    description: string;
    image: string;
    badge?: string;
}

interface TimelineProps {
    items?: TimelineItem[];
    className?: string;
}

const defaultItems: TimelineItem[] = [
    {
        type: "Off Grid",
        title: "Instalación OFF GRID",
        description: "Ideales para la ciudad, se interconecta a la red eléctrica, lo que permite compensar energía y reducir costos de electricidad. ",
        image: "/4_SISTEMA_FOTOVOLTAICO/OFF_GRID.png",
        badge: "Sistemas foltovoitaicos",
    },
    {
        type: "On Grid",
        title: "Instalación ON GRID",
        description: "Ideales para zonas rurales o donde no hay acceso a la electricidad, debido al uso de baterías este sistema ofrece autonomía total. ",
        image: "/4_SISTEMA_FOTOVOLTAICO/ON_GRID.png",
        badge: "Sistemas foltovoitaicos",
    },
    {
        type: "Soporte",
        title: "Mantenimiento preventivo y correctivo",
        description: "Ofrecemos planes de mantenimiento personalizados siguiendo las indicaciones del fabricante con el objetivo de garantizar la máxima disponibilidad y prolongar la vida útil de los componentes del sistema fotovoltaico.",
        image: "/4_SISTEMA_FOTOVOLTAICO/MANTENIMIENTO.jpg",
        badge: "Sistemas foltovoitaicos",
    },
];

const fadeUpVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
};

export const Timeline = ({ items = defaultItems, className }: TimelineProps) => {
    const [activeIndex, setActiveIndex] = useState(2);
    const [isZoomOpen, setIsZoomOpen] = useState(false);
    const activeItem = items[activeIndex];
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const activeRef = buttonRefs.current[activeIndex];
        if (activeRef) {
            activeRef.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center"
            });
        }
    }, [activeIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsZoomOpen(false);
        };
        if (isZoomOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isZoomOpen]);

    return (
        <div className={cn("w-full", className)}>
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none !important;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none !important;
                    scrollbar-width: none !important;
                }
            `}</style>

            <div className="grid grid-cols-12 gap-8 lg:gap-12">
                {/* Selector de Años */}
                <div className="relative flex flex-col items-center shrink-0 w-full lg:w-28 lg:col-span-1 col-span-12">
                    <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-border/40 hidden lg:block" />

                    <div 
                        className="flex flex-row lg:flex-col gap-4 lg:h-112 overflow-auto hide-scrollbar md:snap-y snap-x lg:py-36 lg:px-0 px-10 snap-mandatory w-full items-center relative z-20" 
                        style={{ 
                            scrollBehavior: "smooth",
                            WebkitOverflowScrolling: "touch"
                        }}
                    >
                        {items.map((item, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <button
                                    key={`${item.type}-${index}`}
                                    ref={(el) => { buttonRefs.current[index] = el; }}
                                    onClick={() => setActiveIndex(index)}
                                    className={cn(
                                        "relative rounded-full py-2 px-6 lg:py-3 lg:px-0 lg:w-20 transition-colors duration-300 shrink-0 snap-center focus:outline-hidden cursor-pointer",
                                        isActive ? "text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground font-medium"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTimelineYear"
                                            className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg shadow-primary/25"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <span className="text-sm tracking-tight block text-center">
                                        {item.type}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-30 lg:block hidden" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-30 lg:block hidden" />
                </div>

                {/* Contenedor de Contenidos */}
                <div className="flex-1 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full overflow-hidden lg:col-span-11 col-span-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeItem.type}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={{
                                initial: { opacity: 0 },
                                animate: { opacity: 1, transition: { staggerChildren: 0.08 } },
                                exit: { opacity: 0, transition: { duration: 0.2 } }
                            }}
                            className="flex-1 grid lg:grid-cols-11 grid-cols-1 items-center gap-8 w-full"
                        >
                            {/* Textos Informativos */}
                            <div className="flex-1 flex flex-col items-start gap-4 xl:ps-8 xl:pe-12 lg:col-span-6">
                                <motion.div variants={fadeUpVariants}>
                                    <Badge variant="secondary" className="rounded-full px-3 py-1 font-medium bg-secondary/80 backdrop-blur-xs">
                                        {activeItem.badge}
                                    </Badge>
                                </motion.div>

                                <motion.h2 
                                    variants={{
                                        initial: { opacity: 0, y: 20 },
                                        animate: { opacity: 1, y: 0 }
                                    }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                    className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground"
                                >
                                    {activeItem.type}
                                </motion.h2>

                                <motion.h3 variants={fadeUpVariants} className="text-2xl md:text-3xl font-semibold text-foreground leading-tight">
                                    {activeItem.title}
                                </motion.h3>

                                <motion.p variants={fadeUpVariants} className="sm:text-lg text-base text-muted-foreground leading-relaxed max-w-xl">
                                    {activeItem.description}
                                </motion.p>
                            </div>

                            {/* Tarjeta de Imagen Modificada */}
                            <div className="w-full flex flex-col gap-4 lg:ps-5 lg:col-span-5">
                                <motion.div 
                                    variants={{
                                        initial: { opacity: 0, scale: 0.95, y: 10 },
                                        animate: { opacity: 1, scale: 1, y: 0 }
                                    }}
                                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} // Eliminado: border border-border/50
                                    className="group relative overflow-hidden rounded-2xl bg-muted aspect-4/3 lg:aspect-11/9 shadow-xl"

                                >
                                    {/* Botón de Lupa con Efecto Glassmorphic */}
                                    <button
                                        onClick={() => setIsZoomOpen(true)}
                                        className="absolute top-5 right-5 z-20 bg-white/10 hover:bg-white/20 text-white p-3.5 rounded-full transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer backdrop-blur-md border border-white/20"
                                        aria-label="Ver imagen completa"
                                        title="Ver imagen completa"
                                    >
                                        <Search className="w-5 h-5" />
                                    </button>

                                    <img
                                        src={activeItem.image}
                                        alt={activeItem.title}
                                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02] rounded-2xl"
                                        // Añadido: rounded-2xl para asegurar que la imagen se amolde perfectamente al contenedor sin desbordes de color
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Modal Lightbox Animado con Pie de Foto */}
            <AnimatePresence>
                {isZoomOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsZoomOpen(false)}
                        className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                    >
                        {/* Botón de Cierre */}
                        <button 
                            onClick={() => setIsZoomOpen(false)}
                            className="absolute top-5 right-5 z-50 text-white bg-white/10 hover:bg-white/25 border border-white/10 p-3 rounded-full transition-all duration-300 cursor-pointer backdrop-blur-md"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Contenido Ampliado */}
                        <motion.div
                            initial={{ scale: 0.9, y: 15 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 15 }}
                            transition={{ type: "spring", damping: 25, stiffness: 180 }}
                            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={activeItem.image}
                                alt={activeItem.title}
                                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                            />
                            {/* Información Inferior de la Imagen */}
                            <div className="mt-4 text-center">
                                <h4 className="text-white text-lg font-semibold">
                                    {activeItem.title}
                                </h4>
                                <p className="text-white/60 text-sm mt-0.5">
                                    {activeItem.badge}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Timeline;