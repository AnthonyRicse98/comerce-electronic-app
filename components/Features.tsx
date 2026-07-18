'use client';

import { FeatureCards } from './FeatureCards';
import { GalleryItem } from './FeatureCards'; // Import GalleryItem
import { RawServicesData } from '@/core/aplication/services/electronic.services'; // Import RawServicesData

interface FeaturesProps {
    title: string;
    description: string;
    rawServices?: RawServicesData; // Acepta la data raw de servicios
}
// Componente Features
export const Features = ({ title, description, rawServices }: FeaturesProps) => {
  const mappedItems: GalleryItem[] = [];

  // Realiza el mapeo de la data raw de servicios al formato esperado por FeatureCards
  if (rawServices) {
    for (let i = 1; i <= 4; i++) {
      const titleKey = `services_title_${i}` as keyof RawServicesData;
      const descriptionKey = `services_description_${i}` as keyof RawServicesData;
      const imgKey = `services_img_${i}` as keyof RawServicesData;
      const urlKey = `services_url_${i}` as keyof RawServicesData;

      // Asegúrate de que todas las propiedades existan antes de agregarlas
      if (
        rawServices[titleKey] &&
        rawServices[descriptionKey] &&
        rawServices[imgKey] &&
        rawServices[urlKey]
      ) {
        mappedItems.push({
          id: `item-${i}`,
          title: rawServices[titleKey] as string,
          summary: rawServices[descriptionKey] as string,
          image: rawServices[imgKey] as string,
          url: rawServices[urlKey] as string,
        });
      }
    }
  }

  return (
    <section className="sm:py-24 pt-16 pb-16 relative" id="features">
      <div className="sm:px-6 lg:px-8 max-w-7xl mr-auto ml-auto px-4">
       <FeatureCards heading={title} items={mappedItems}/> {/* Pasa los items mapeados */}
      </div>
    </section>
  );
};