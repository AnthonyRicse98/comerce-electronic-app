"use client"

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Search, X } from "lucide-react";

interface ElectronicBoardData {
    title: string;
    post: {
        post_image: string;
        post_subtitle: string;
        post_information: string;
    }[];
}

interface GalleryProps { electronicBoard: ElectronicBoardData; }

const Gallery = ({ electronicBoard }: GalleryProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isZoomOpen, setIsZoomOpen] = useState(false);

    const handleCardClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <>
            <section className="overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
                    <div className="py-8 lg:py-12">
                        <div className="max-w-5xl space-y-4">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                                {electronicBoard.post[activeIndex].post_subtitle}
                            </h2>
                            <p className="md:text-lg text-base text-muted-foreground leading-relaxed">
                                {electronicBoard.post[activeIndex].post_information}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="lg:py-1 sm:py-1 py-1 w-full">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16 py-6 w-full">
                    <div className="flex flex-col gap-6">
                        
                        {/* 1. TARJETA GRANDE */}
                        {electronicBoard.post.length > 0 && (
                            <Card className="group relative overflow-hidden rounded-3xl border border-white/10 dark:border-white/5 bg-neutral-900/40 p-0 shadow-2xl transition-all duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/90 after:via-black/30 after:to-transparent after:z-10">
                                
                                {/* BOTÓN DE LUPA CON EFECTO GLASS */}
                                <button
                                    onClick={() => setIsZoomOpen(true)}
                                    className="absolute top-5 right-5 z-20 bg-white/10 hover:bg-white/20 text-white p-3.5 rounded-full transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer backdrop-blur-md border border-white/20"
                                    aria-label="Ver imagen completa"
                                    title="Ver imagen completa"
                                >
                                    <Search className="w-5 h-5" />
                                </button>

                                <img
                                    src={electronicBoard.post[activeIndex].post_image}
                                    alt={electronicBoard.post[activeIndex].post_subtitle}
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02] h-[550px] md:h-[600px] lg:h-[750px] w-full"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-20 flex flex-col gap-1.5">
                                    <span className="text-white/60 text-xs md:text-sm font-semibold uppercase tracking-wider">
                                        {electronicBoard.title}
                                    </span>
                                    <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-none">
                                        {electronicBoard.post[activeIndex].post_subtitle}
                                    </h3>
                                </div>
                            </Card>
                        )}

                        {/* 2. TARJETAS PEQUEÑAS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {electronicBoard.post.map((post, index) => {
                                if (index === activeIndex) return null;

                                return (
                                    <div 
                                        key={index} 
                                        onClick={() => handleCardClick(index)} 
                                        className="cursor-pointer"
                                    >
                                        <Card className="group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-neutral-100/50 dark:bg-neutral-900/30 p-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/80 after:via-black/20 after:to-transparent after:z-10">
                                            <img
                                                src={post.post_image}
                                                alt={post.post_subtitle}
                                                className="object-cover transition-transform duration-500 group-hover:scale-105 h-[250px] md:h-[300px] w-full"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col gap-1">
                                                <span className="text-white/60 text-xs uppercase tracking-wider font-medium">
                                                    {electronicBoard.title}
                                                </span>
                                                <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                                                    {post.post_subtitle}
                                                </h3>
                                            </div>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </div>

            {/* MODAL / LIGHTBOX PARA VER LA IMAGEN COMPLETA */}
            {isZoomOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-300"
                    onClick={() => setIsZoomOpen(false)}
                >
                    {/* Botón de cerrar con efecto Blur */}
                    <button 
                        onClick={() => setIsZoomOpen(false)}
                        className="absolute top-5 right-5 z-50 text-white bg-white/10 hover:bg-white/25 border border-white/10 p-3 rounded-full transition-all duration-300 cursor-pointer backdrop-blur-md"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Contenedor de la imagen */}
                    <div 
                        className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={electronicBoard.post[activeIndex].post_image}
                            alt={electronicBoard.post[activeIndex].post_subtitle}
                            className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                        />
                        <div className="mt-4 text-center">
                            <h4 className="text-white text-lg font-semibold">
                                {electronicBoard.post[activeIndex].post_subtitle}
                            </h4>
                            <p className="text-white/60 text-sm mt-0.5">
                                {electronicBoard.title}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Gallery;