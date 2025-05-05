import React from 'react';
import { BookOpenText } from 'lucide-react';

export const GlossaryHeader = () => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2">
        <BookOpenText 
          size={32} 
          className="text-[#0077cc]" 
        />
        <h1 className="text-3xl font-bold text-[#003f73]">
          Glossário de Dados com IA
        </h1>
      </div>
      <p className="mt-3 text-gray-600 max-w-lg mx-auto">
        Tire suas dúvidas sobre terminologia de dados com nossa inteligência artificial especializada.
      </p>
    </div>
  );
};