"use client"
import React from 'react'

interface CardInformationItem {
  id: string;
  title: string;
  description: string;
}

interface CardInformationProps {
  information: CardInformationItem[];
}

interface CardContentProps {
  title: string;
  description: string;
  icon: string;
}

const CardContent = ({ title, description, icon }: CardContentProps) => {
  const iconStyle: React.CSSProperties = {
    backgroundColor: 'rgb(0 118 255)',
    maskImage: `url(${icon})`,
    WebkitMaskImage: `url(${icon})`,
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
  };
  return (
    <div data-card="info-card" className="sm:p-5 bg-white/3 border-white/10 border rounded-xl pt-4 pr-4 pb-4 pl-4 flex flex-col items-center">
      <div className="w-16 h-16 mb-4" style={iconStyle} role="img" aria-label={`${title} icon`}>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex mt-3 flex-col items-center justify-center text-center">
        <span className="text-lg font-light text-neutral-600">
          {description}
        </span>
      </div>
    </div>
  )
}

export default function CardInformation({ information }: CardInformationProps) {
  const icons = ['congratulation.svg', 'tag.svg', 'check.svg', 'phone.svg'];
  return (
    <div className="sm:px-6 lg:px-8 sm:mt-16 max-w-7xl mt-12 mr-auto ml-auto pr-4 pl-4">
      <div
        className="rounded-2xl shadow-2xl backdrop-blur bg-white/95 in-view"
        style={{
          position: 'relative',
          '--border-gradient': 'linear-gradient(180deg, rgba(251, 113, 133, 0), rgba(255, 133, 133, 0.6), rgba(225, 29, 72, 0))',
          '--border-radius-before': '16px'
        } as React.CSSProperties}
        data-scroll-animate="blur-up"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:p-6 p-4">
          {information.map((item, index) => (
            <CardContent key={item.id} title={item.title} description={item.description} icon={icons[index]} />
          ))}
        </div>
      </div>
    </div>
  )
}
