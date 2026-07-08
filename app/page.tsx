import { ElectronicRepository } from "@/core/aplication/repository/electronic.repository";
import { CTA } from "../components/CTA";
import FAQ from "../components/FAQ";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";

import { Hero } from "../components/Hero";
import { Pricing } from "../components/Pricing";
import { Testimonials } from "../components/Testimonials";
import CardInformation from "@/components/ui/Card/CardInformation"


export default async function Home() {
  const homeMultimedia = await ElectronicRepository.getHomeMedia();
  const { homeInformation, homeProducts } = await ElectronicRepository.getHomeInformation();

  const { homepage_media } = homeMultimedia;
  const { cardInfo } = homeInformation

  console.log(homeInformation)
  return (
    <main>
      <Hero
        title={homeInformation.title}
        description={homeInformation.description}
        multimedia={homepage_media} />
      <CardInformation information={cardInfo} />
      <Features
        title={homeProducts.title}
        description={homeProducts.description}
      />
      <Pricing />
      <Testimonials />
      <CTA />
      <FAQ />
      <Footer />
    </main>
  );
}