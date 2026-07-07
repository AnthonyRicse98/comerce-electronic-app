import { ElectronicRepository } from "@/core/aplication/repository/electronic.repository";
import { CTA } from "../components/CTA";
import FAQ from "../components/FAQ";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";

import { Hero } from "../components/Hero";
import { Pricing } from "../components/Pricing";
import { Testimonials } from "../components/Testimonials";
import CardInformation from "@/components/CardInformation";


export default async function Home() {
  const homeMultimedia = await ElectronicRepository.getHomeMedia();
  const homeInformation = await ElectronicRepository.getHomeInformation();

  const { homepage_media } = homeMultimedia;
  const { infoContent1: cardInformation } = homeInformation;

  return (
    <main>
      <Hero multimedia={homepage_media} />
      <CardInformation information={cardInformation} />
      <Features />
      <Pricing />
      <Testimonials />
      <CTA/>
      <FAQ/>
      <Footer />
    </main>
  );
}