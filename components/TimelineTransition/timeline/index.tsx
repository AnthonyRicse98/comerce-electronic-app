"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Lightbox } from "@/components/LightBox/lightbox"; 

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
        badge: "Sistemas fotovoltaicos",
    },
    {
        type: "On Grid",
        title: "Instalación ON GRID",
        description: "Ideales para zonas rurales o donde no hay acceso a la electricidad, debido al uso de baterías este sistema ofrece autonomía total. ",
        image: "/4_SISTEMA_FOTOVOLTAICO/ON_GRID.png",
        badge: "Sistemas fotovoltaicos",
    },
    {
        type: "Soporte",
        title: "Mantenimiento preventivo y correctivo",
        description: "Ofrecemos planes de mantenimiento personalizados siguiendo las indicaciones del fabricante con el objetivo de garantizar la máxima disponibilidad y prolongar la vida útil de los componentes del sistema fotovoltaico.",
        image: "/4_SISTEMA_FOTOVOLTAICO/MANTENIMIENTO.jpg",
        badge: "Sistemas fotovoltaicos",
    },
];

const fadeUpVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
};

export const Timeline = ({ items = defaultItems, className }: TimelineProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeItem = items[activeIndex] || items[0];
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const activeRef = buttonRefs.current[activeIndex];
        if (activeRef) {
            activeRef.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });
        }
    }, [activeIndex]);

    return (
        <div className={cn("w-full relative z-0", className)}>
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none !important;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none !important;
                    scrollbar-width: none !important;
                }
            `}</style>

            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Selector de Navegación */}
                {/* CORRECCIÓN: Se cambió 'relative' global por un z-index controlado (z-10 en móvil, z-20 en desktop) */}
                <div className="relative z-10 lg:z-20 flex flex-col items-center shrink-0 w-full lg:w-28 lg:col-span-1 col-span-12">
                    <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-border/40 hidden lg:block" />

                    <div 
                        className={cn(
                            "flex gap-3 relative w-full items-center",
                            // CORRECCIÓN: Se reduce de z-20 a z-10 en móvil para que pase por DEBAJO del Navbar de SIME POWER
                            "z-10 flex-row overflow-x-auto hide-scrollbar snap-x snap-mandatory px-4 py-3 justify-start sm:justify-center",
                            "lg:z-20 lg:flex-col lg:h-112 lg:overflow-y-auto lg:py-36 lg:px-0 lg:justify-start"
                        )}
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
                                        "relative rounded-full transition-all duration-300 shrink-0 snap-center focus:outline-hidden cursor-pointer",
                                        "py-2.5 px-5 min-w-[110px]", 
                                        "lg:py-3 lg:px-0 lg:w-20 lg:min-w-0", 
                                        isActive 
                                            ? "text-primary-foreground font-semibold" 
                                            : "text-muted-foreground hover:text-foreground font-medium"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTimelineYear"
                                            className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg shadow-primary/25"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <span className="text-sm tracking-tight block text-center truncate px-1">
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

                            {/* Tarjeta de Imagen */}
                            <div className="w-full flex flex-col gap-4 lg:ps-5 lg:col-span-5">
                                <motion.div 
                                    variants={{
                                        initial: { opacity: 0, scale: 0.95, y: 10 },
                                        animate: { opacity: 1, scale: 1, y: 0 }
                                    }}
                                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full aspect-4/3 lg:aspect-11/9 shadow-xl rounded-2xl overflow-hidden"
                                >
                                    <Lightbox 
                                        imageSrc={activeItem.image} 
                                        title={activeItem.title} 
                                        subtitle={activeItem.badge}
                                    >
                                        <div className="w-full h-full bg-muted">
                                            <img
                                                src={activeItem.image}
                                                alt={activeItem.title}
                                                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                            />
                                        </div>
                                    </Lightbox>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Timeline;