"use client"
import React from 'react'

// --- Interfaces Actualizadas para soportar la nueva estructura ---
interface CardInformationItem {
  id: number; // Cambiado a number según tu JSON
  title: string;
  description?: string; // Opcional, ya que Valores no tiene
  content?: string[];   // Lista de valores
  onList?: boolean;
}

interface CardInformationProps {
  information: CardInformationItem[];
}

interface CardContentProps {
  title: string;
  description?: string;
  content?: string[];
  onList?: boolean;
  icon: string;
}

const CardContent = ({ title, description, content, onList, icon }: CardContentProps) => {
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
    <div data-card="info-card" className="sm:p-5 bg-transparent rounded-xl pt-4 pr-4 pb-4 pl-4 flex flex-col items-center w-full">
      {/* Icono */}
      <div className="w-12 h-12 mb-4" style={iconStyle} role="img" aria-label={`${title} icon`} />
      
      {/* Título (Capitalizado automáticamente para consistencia con Misión/Visión) */}
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-neutral-900 capitalize">{title.toLowerCase()}</h2>
      </div>
      
      {/* Contenido Condicional */}
      <div className="flex mt-3 flex-col items-center justify-center text-center w-full">
        {onList && content ? (
          /* Renderizado de la lista de Valores */
          <ul className="space-y-1 text-lg font-light text-neutral-600">
            {content.map((value, idx) => (
              <li key={idx} className="hover:text-sky-500 transition-colors">
                {value}
              </li>
            ))}
          </ul>
        ) : (
          /* Texto normal de Misión y Visión */
          <span className="text-base font-light text-neutral-600 leading-relaxed">
            {description}
          </span>
        )}
      </div>
    </div>
  )
}

export default function CardInformation({ information }: CardInformationProps) {
  // SVG mapeados según el orden de tu array
  const icons = ['congratulation.svg', 'check.svg', 'tag.svg'];

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
        {/* CORRECCIÓN DEL GRID: Cambiado de lg:grid-cols-4 a lg:grid-cols-3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:p-8 p-6 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
          {information.map((item, index) => (
            <CardContent 
              key={item.id} 
              title={item.title} 
              description={item.description} 
              content={item.content}
              onList={item.onList}
              icon={icons[index]} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}