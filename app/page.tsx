import { ElectronicRepository } from "@/core/aplication/repository/electronic.repository";

import { Features } from "../components/Features";

import { Hero } from "../components/Hero";

import CardInformation from "@/components/ui/Card/CardInformation"
import { FeatureCards } from "@/components/FeatureCards";


export default async function Home() {
  const homeMultimedia = await ElectronicRepository.getHomeMedia();
  const { homeInformation, homeProducts } = await ElectronicRepository.getHomeInformation();
  const { services } = await ElectronicRepository.getHomeMedia()
  console.log("🚀 ~ Home ~ services:", services)
  const { cardInfo } = homeInformation

  return (
    <main>
      <Hero
        title={homeInformation.title}
        description={homeInformation.description}
        multimedia={homeMultimedia}
        />
      <CardInformation information={cardInfo} />
      <Features
        title={homeProducts.title}
        description={homeProducts.description}
        rawServices={services} // Pasa la data raw de servicios
      />
      {
      /*
      <Pricing />
      <Testimonials />
      <CTA />
      <FAQ />
      */
      }
    </main>
  );
}