import Timeline, { TimelineItem } from "@/components/TimelineTransition/timeline";

interface TimelineBlockProps {
    information: {
        title: string;
        post: string; // Esto es information_subtitle, no un array
    };
    data: RawPostItem[]; // Tipo corregido para data
}

interface RawPostItem {
    post_type: string;
    post_image: string;
    post_subtitle: string;
    post_information: string;
}

const TimelineBlock = ({ information, data }: TimelineBlockProps) => {
    return (
        // 1. Reducimos el padding vertical general (de py-24 a py-16)
        <section className="py-16 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
                {/* 2. Eliminamos los paddings verticales exagerados del contenedor de texto */}
                <div className="px-6 pb-6 md:px-10 lg:px-16">
                    <div className="max-w-2xl space-y-4">
                        <div className="space-y-3">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                                {information.title}
                            </h2>
                            <p className="md:text-lg text-base text-muted-foreground leading-relaxed">
                                {information.post}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Reducimos drásticamente el espaciador (de h-28 a h-8 md:h-12) */}
                <div className="h-8 md:h-12" />
            </div>
            
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
                <Timeline items={data.map(item => ({
                    type: item.post_type,
                    title: item.post_subtitle,
                    description: item.post_information,
                    image: item.post_image,
                    badge: information?.title // Usamos information.title como el badge
                }))} />
            </div>
        </section>
    );
};

export default TimelineBlock;