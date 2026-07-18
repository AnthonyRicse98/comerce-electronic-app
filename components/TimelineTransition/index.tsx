"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Lightbox } from "@/components/LightBox/lightbox"; 

export interface TimelineDataBlock {
    post_type: string;
    post_image: string;
    post_subtitle: string;
    post_information: string;
    post_stats?: string[];
}

export interface TimelineInfoBlock {
    title: string;
    post: string;
}

interface TimelineProps {
    information?: TimelineInfoBlock;
    data?: TimelineDataBlock[];
    hasStats?: boolean;
    className?: string;
}

const fadeUpVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
};

const containerStatsVariants = {
    animate: {
        transition: {
            staggerChildren: 0.08, // Más rápido y fluido
        }
    }
};

const cardStatVariants: Variants = {
    initial: { opacity: 0, scale: 0.95, y: 15 }, // Reducimos el desplazamiento vertical para evitar saltos bruscos
    animate: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 18 } 
    }
};

export const TimelineBlock = ({ 
    information, 
    data = [], 
    hasStats = false, 
    className 
}: TimelineProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeItem = data[activeIndex] || data[0];
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const [chargingStat, setChargingStat] = useState<string | null>(null);

    useEffect(() => {
        setChargingStat(null);
    }, [activeIndex]);

    const handleStatClick = (stat: string) => {
        setChargingStat(stat);
        
        setTimeout(() => {
            setChargingStat((current) => current === stat ? null : current);
        }, 3000);
    };

    if (!activeItem) return null;

    return (
        <div className={cn("w-full relative container mx-auto px-4 py-8", className)}>
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none !important;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none !important;
                    scrollbar-width: none !important;
                }
            `}</style>

            {/* Encabezado dinámico */}
            {information && (
                <div className="mb-12 text-center lg:text-left max-w-4xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
                        {information.title}
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {information.post}
                    </p>
                </div>
            )}

            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Selector de Navegación Lateral */}
                <div className="relative z-20 flex flex-col items-center shrink-0 w-full lg:w-36 lg:col-span-2 col-span-12">
                    <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-border/40 hidden lg:block" />

                    <div 
                        className={cn(
                            "flex gap-3 relative w-full items-center",
                            "z-10 flex-row overflow-x-auto hide-scrollbar snap-x snap-mandatory px-4 py-3 justify-start sm:justify-center",
                            "lg:z-20 lg:flex-col lg:overflow-y-auto lg:py-12 lg:px-0 lg:justify-start" // CORRECCIÓN: Quitamos h-112 fijo restrictivo
                        )}
                        style={{ 
                            scrollBehavior: "smooth",
                            WebkitOverflowScrolling: "touch"
                        }}
                    >
                        {data.map((item, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <button
                                    key={`${item.post_type}-${index}`}
                                    ref={(el) => { buttonRefs.current[index] = el; }}
                                    onClick={() => setActiveIndex(index)}
                                    className={cn(
                                        "relative rounded-full transition-all duration-300 shrink-0 snap-center focus:outline-hidden cursor-pointer",
                                        "py-2.5 px-5 min-w-[120px]", 
                                        "lg:py-3 lg:px-0 lg:w-32 lg:min-w-0", 
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
                                    <span className="text-sm tracking-tight block text-center truncate px-2">
                                        {item.post_type}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Contenedor de Contenidos - CORRECCIÓN: Eliminamos overflow-hidden global que cortaba las tarjetas */}
                <div className="flex-1 flex flex-col lg:flex-row items-start gap-8 lg:gap-16 w-full lg:col-span-10 col-span-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeItem.post_type}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={{
                                initial: { opacity: 0 },
                                animate: { opacity: 1, transition: { staggerChildren: 0.05 } },
                                exit: { opacity: 0, transition: { duration: 0.15 } }
                            }}
                            className="flex-1 grid lg:grid-cols-11 grid-cols-1 items-start gap-8 w-full"
                        >
                            {/* Panel de Información */}
                            <div className="flex-1 flex flex-col items-start gap-4 xl:ps-8 xl:pe-12 lg:col-span-6 w-full">
                                <motion.div variants={fadeUpVariants}>
                                    <Badge variant="secondary" className="rounded-full px-3 py-1 font-medium bg-secondary/80 backdrop-blur-xs">
                                        {information?.title || "Detalle"}
                                    </Badge>
                                </motion.div>

                                <motion.h2 
                                    variants={{
                                        initial: { opacity: 0, y: 15 },
                                        animate: { opacity: 1, y: 0 }
                                    }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                    className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground"
                                >
                                    {activeItem.post_type}
                                </motion.h2>

                                <motion.h3 variants={fadeUpVariants} className="text-2xl md:text-3xl font-semibold text-foreground leading-tight">
                                    {activeItem.post_subtitle}
                                </motion.h3>

                                <motion.p variants={fadeUpVariants} className="sm:text-lg text-base text-muted-foreground leading-relaxed max-w-xl">
                                    {activeItem.post_information}
                                </motion.p>

                                {/* PANEL INTERACTIVO DE POTENCIAS SIN CORTES */}
                                {hasStats && activeItem.post_stats && activeItem.post_stats.length > 0 && (
                                    <motion.div 
                                        variants={fadeUpVariants}
                                        className="mt-6 w-full"
                                    >
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80 mb-4 block">
                                            Potencias Disponibles
                                        </p>
                                        <motion.div 
                                            variants={containerStatsVariants}
                                            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
                                        >
                                            {activeItem.post_stats.map((stat, i) => {
                                                const isCurrentCharging = chargingStat === stat;

                                                return (
                                                    <motion.button 
                                                        key={i} 
                                                        variants={cardStatVariants}
                                                        whileHover={{ y: isCurrentCharging ? 0 : -4 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleStatClick(stat)}
                                                        className={cn(
                                                            "relative overflow-hidden rounded-2xl p-5 flex flex-col justify-between items-start min-h-[110px] w-full text-left",
                                                            "border bg-linear-to-b from-card to-muted/40 shadow-sm group/stat transition-all duration-300 focus:outline-hidden",
                                                            isCurrentCharging 
                                                                ? "border-primary bg-primary/5 shadow-md shadow-primary/10" 
                                                                : "border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                                                        )}
                                                    >
                                                        {/* Onda expansiva interna controlada */}
                                                        {isCurrentCharging && (
                                                            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl -z-10">
                                                                <motion.div 
                                                                    initial={{ scale: 0.4, opacity: 0.8 }}
                                                                    animate={{ scale: 2, opacity: 0 }}
                                                                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                                                                    className="absolute inset-0 m-auto w-24 h-24 rounded-full border border-primary/60 bg-primary/10"
                                                                />
                                                            </div>
                                                        )}

                                                        <div className="absolute inset-0 bg-radial from-primary/5 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none" />

                                                        <div className="w-full flex items-center justify-between z-10 relative pointer-events-none">
                                                            <span className={cn(
                                                                "text-4xl font-black tracking-tight transition-colors duration-300",
                                                                isCurrentCharging ? "text-primary" : "text-foreground group-hover/stat:text-primary"
                                                            )}>
                                                                {stat.split(" ")[0]}
                                                                <span className="text-sm font-bold text-muted-foreground ml-1">
                                                                    {stat.split(" ")[1] || "kW"}
                                                                </span>
                                                            </span>

                                                            <motion.div 
                                                                animate={isCurrentCharging ? {
                                                                    opacity: [1, 0.3, 1, 0.5, 1],
                                                                    scale: [1, 1.1, 0.95, 1.15, 1]
                                                                } : {
                                                                    opacity: [1, 0.6, 1]
                                                                }}
                                                                transition={isCurrentCharging ? {
                                                                    duration: 0.5, 
                                                                    repeat: Infinity 
                                                                } : {
                                                                    duration: 2.5, 
                                                                    repeat: Infinity, 
                                                                    ease: "easeInOut"
                                                                }}
                                                                className={cn(
                                                                    "transition-colors duration-300",
                                                                    isCurrentCharging ? "text-primary" : "text-primary/40 group-hover/stat:text-primary"
                                                                )}
                                                            >
                                                                <svg 
                                                                    xmlns="http://www.w3.org/2000/svg" 
                                                                    viewBox="0 0 24 24" 
                                                                    fill="currentColor" 
                                                                    className={cn(
                                                                        "w-7 h-7 transition-all duration-300",
                                                                        isCurrentCharging 
                                                                            ? "drop-shadow-[0_0_10px_rgba(var(--primary),0.7)] scale-105" 
                                                                            : "drop-shadow-[0_0_4px_rgba(234,179,8,0.2)] group-hover/stat:drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                                                                    )}
                                                                >
                                                                    <motion.path 
                                                                        initial={{ pathLength: 0, opacity: 0 }}
                                                                        animate={{ pathLength: 1, opacity: 1 }}
                                                                        transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                                                                        fillRule="evenodd" 
                                                                        d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" 
                                                                        clipRule="evenodd" 
                                                                    />
                                                                </svg>
                                                            </motion.div>
                                                        </div>

                                                        <div className="w-full h-[3px] bg-muted rounded-full mt-4 overflow-hidden relative z-10">
                                                            <div className={cn(
                                                                "absolute inset-0 bg-primary h-full transition-all duration-500",
                                                                isCurrentCharging 
                                                                    ? "w-full opacity-100" 
                                                                    : "w-0 group-hover/stat:w-full"
                                                            )} />
                                                        </div>
                                                    </motion.button>
                                                );
                                            })}
                                        </motion.div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Panel de Imagen con Lightbox */}
                            <div className="w-full flex flex-col gap-4 lg:ps-5 lg:col-span-5 self-center">
                                <motion.div 
                                    variants={{
                                        initial: { opacity: 0, scale: 0.95, y: 10 },
                                        animate: { opacity: 1, scale: 1, y: 0 }
                                    }}
                                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full aspect-4/3 lg:aspect-11/9 shadow-2xl rounded-2xl overflow-hidden group relative border border-border/40"
                                >
                                    <Lightbox 
                                        imageSrc={activeItem.post_image} 
                                        title={activeItem.post_subtitle} 
                                        subtitle={information?.title}
                                    >
                                        <div className="w-full h-full bg-muted">
                                            <img
                                                src={activeItem.post_image}
                                                alt={activeItem.post_subtitle}
                                                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
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

export default TimelineBlock;