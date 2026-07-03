import { ElectronicRepository } from "@/core/aplication/repository/electronic.repository";
import { CTA } from "../components/CTA";
import FAQ from "../components/FAQ";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";

import { Hero } from "../components/Hero";
import { Pricing } from "../components/Pricing";
import { Testimonials } from "../components/Testimonials";


export default async function Home() {
  const multimedia = await ElectronicRepository.getHomeMedia();
  const { homepage_media } = multimedia;  
  return (
    <main>
      <Hero multimedia={homepage_media} />
      <Features />
      <Pricing />
      <Testimonials />
      <CTA/>
      <FAQ/>
      <Footer />
    </main>
  );
}