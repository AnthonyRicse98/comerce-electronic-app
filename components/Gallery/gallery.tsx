"use client";

import { useState, useRef } from "react";
// Importamos el nuevo componente reutilizable2
import { Lightbox } from "@/components/LightBox/lightbox"

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
    const topGalleryRef = useRef<HTMLDivElement>(null);

    const handleCardClick = (index: number) => {
        setActiveIndex(index);
        topGalleryRef.current?.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
        });
    };

    return (
        <>
            <section ref={topGalleryRef} className="overflow-hidden scroll-mt-24">
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
                        
                        {/* 1. TARJETA GRANDE CON LIGHTBOX */}
                        {electronicBoard.post.length > 0 && (
                            <Lightbox 
                                imageSrc={electronicBoard.post[activeIndex].post_image}
                                title={electronicBoard.post[activeIndex].post_subtitle}
                                subtitle={electronicBoard.title}
                            >
                                <div className="group relative z-0 overflow-hidden rounded-3xl bg-transparent p-0 m-0 shadow-2xl transition-all duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/90 after:via-black/20 after:to-transparent after:z-10">
                                    <img
                                        src={electronicBoard.post[activeIndex].post_image}
                                        alt={electronicBoard.post[activeIndex].post_subtitle}
                                        className="object-cover block w-full transition-transform duration-700 group-hover:scale-[1.01] h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-20 flex flex-col gap-1.5">
                                        <span className="text-white/60 text-xs md:text-sm font-semibold uppercase tracking-wider">
                                            {electronicBoard.title}
                                        </span>
                                        <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-none">
                                            {electronicBoard.post[activeIndex].post_subtitle}
                                        </h3>
                                    </div>
                                </div>
                            </Lightbox>
                        )}

                        {/* 2. TARJETAS PEQUEÑAS (¡También con Lightbox individual!) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {electronicBoard.post.map((post, index) => {
                                if (index === activeIndex) return null;

                                return (
                                    <div 
                                        key={index} 
                                        onClick={() => handleCardClick(index)} 
                                        className="cursor-pointer"
                                    >
                                        <Lightbox
                                            imageSrc={post.post_image}
                                            title={post.post_subtitle}
                                            subtitle={electronicBoard.title}
                                        >
                                            <div className="group relative overflow-hidden rounded-2xl bg-transparent p-0 m-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/80 after:via-black/10 after:to-transparent after:z-10">
                                                <img
                                                    src={post.post_image}
                                                    alt={post.post_subtitle}
                                                    className="object-cover block w-full transition-transform duration-500 group-hover:scale-105 h-[250px] md:h-[300px] rounded-2xl"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col gap-1">
                                                    <span className="text-white/60 text-xs uppercase tracking-wider font-medium">
                                                        {electronicBoard.title}
                                                    </span>
                                                    <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                                                        {post.post_subtitle}
                                                    </h3>
                                                </div>
                                            </div>
                                        </Lightbox>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Gallery;