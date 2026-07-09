import Link from "next/link";

interface WhatsAppButtonProps {
  phoneNumber: string;
  className?: string; // Para permitir estilos adicionales desde el padre
}

export const WhatsAppButton = ({ phoneNumber, className }: WhatsAppButtonProps) => {
  return (
    <Link
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-10 right-6 md:bottom-16 md:right-10 z-50 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all flex items-center justify-center shadow-2xl size-12 md:size-auto md:py-3 md:px-6 md:gap-2 ${className || ''}`}
    >
      <img src='/whatssap.svg' alt="WhatsApp" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
      <span className="hidden md:inline">¡Contáctanos!</span>
    </Link>
  );
};