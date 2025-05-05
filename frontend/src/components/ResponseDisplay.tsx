import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

interface ResponseDisplayProps {
  response: string | null;
  loading: boolean;
  error: string | null;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({
  response,
  loading,
  error
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <Loader2 className="h-8 w-8 text-[#0077cc] animate-spin mb-3" />
        <p className="text-gray-600">Buscando resposta...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
        <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
        <p className="text-red-700 font-medium">Erro ao processar sua pergunta</p>
        <p className="text-red-600 mt-1 text-sm">{error}</p>
        <p className="text-gray-600 mt-3 text-sm">Por favor, tente novamente mais tarde ou reformule sua pergunta.</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="py-8 text-center text-gray-400">
        <p>Faça uma pergunta para receber uma resposta</p>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-blue-50 p-5 rounded-lg border border-blue-100 animate-fadeIn">
      <h3 className="font-medium text-[#003f73] mb-2">Resposta:</h3>
      <div className="text-gray-700 leading-relaxed">
        {response}
      </div>
    </div>
  );
};