"use server";
import { HomePageServices } from "@/core/aplication/services/homepage.services";
import { CTA } from "../components/CTA";
import FAQ from "../components/FAQ";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";

import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { Pricing } from "../components/Pricing";
import { Testimonials } from "../components/Testimonials";


export default async function Home() {
   const aemNavigation = await HomePageServices.getNavigation();
    console.log('Navigation data:', aemNavigation); // Log the navigation data for debugging
    
  return (
    <main>
      <Navbar aemNavigation={aemNavigation.collection} />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <CTA/>
      <FAQ/>
      <Footer />
    </main>
  );
}