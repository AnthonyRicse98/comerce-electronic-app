'use client';

import CardProduct from './ui/Card/CardProduct';

interface FeaturesProps {
    title: string;
    description: string;
  
}
// Componente Features
export const Features = ({ title, description }: FeaturesProps) => {

  return (
    <section className="sm:py-24 pt-16 pb-16 relative" id="features">
      <div className="sm:px-6 lg:px-8 max-w-7xl mr-auto ml-auto px-4">
        <div className="text-center mb-12 in-view" data-scroll-animate-children="">
          <h2
            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-center mt-2 text-black"
          >
            {
              title
            }
          </h2>
          <p
            className="text-lg font-light sm:text-lg md:text-xl lg:text-2xl text-neutral-700 text-center mt-4"
            style={{ opacity: 1, transform: 'translateY(0px)' }}
          >
            {
              description
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />

        </div>
      </div>
    </section>
  );
};