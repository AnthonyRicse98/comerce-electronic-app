"use client";

import Timeline from "@/components/Timeline/timeline";
import { Badge } from "@/components/ui/badge";

interface InformationProps{
    title: string,
    description: string
}

interface DataProps {
    title:string,
    post: { // Define the structure of the post array items
        post_subtitle: string;
        post_information: string;
    }[];
}

interface FeatureTimelineProps {
    information?: InformationProps
    data?: DataProps
}

const timelineData = [
    {
        title: "Mantenimiento Preventivo",
        description:
            "Diseñamos y ejecutamos programas de mantenimiento preventivo personalizados siguiendo las indicaciones del fabricante con el objetivo de garantizar la máxima disponibilidad y prolongar la vida útil del grupo electrógeno.",
        slug: "Mantenimiento y Diagnóstico",
        image: "/2_GRUPOS ELECTROGENOS/MANTENIMIENTO/IMG_1.jpg",
    },
    {
        title: "Diagnóstico y Mantenimiento Correctivo ",
        description:
            "Ofrecemos atención inmediata incluyendo diagnóstico y reparación técnico especializado con el objetivo de poner operativo tu grupo electrógeno en el menor tiempo posible.",
        slug: "Mantenimiento y Diagnóstico",
        image: "/2_GRUPOS ELECTROGENOS/MANTENIMIENTO/IMG_2.jpg",

    },
    {
        title: "Mantenimiento Predictivo",
        description:
            "Realizamos mediciones, monitoreo y seguimiento de los parámetros de funcionamiento de los sistemas del grupo electrógeno con el fin de anticipar las fallas.  ",
        slug: "Mantenimiento y Diagnóstico",
        image: "/2_GRUPOS ELECTROGENOS/MANTENIMIENTO/IMG_3.jpg",

    },
];

const FeatureTimeline = ( {information, data}: FeatureTimelineProps) => {
    // Map the incoming data.post to the expected TimelineItemProps format
    const mappedTimelineItems = data?.post?.map(item => ({
        title: item.post_subtitle,
        description: item.post_information,
        slug: information?.title || "Servicio",
        image: item.post_image

    })) || [];

    return (
        <section className="overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
                <div className="px-6 py-10 md:px-10 md:py-16 lg:px-16 lg:py-20">
                    <div className="max-w-2xl space-y-4">
                        <div className="space-y-3">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                             { information?.title}
                            </h2>
                            <p className="md:text-lg text-base text-muted-foreground leading-relaxed">
                             {information?.description}
                           </p>
                        </div>
                    </div>
                </div>
                <div>
                    <Timeline items={mappedTimelineItems} />
                </div>
                <div className="h-18 md:h-28" />
            </div>
        </section>
    );
};

export default FeatureTimeline;
