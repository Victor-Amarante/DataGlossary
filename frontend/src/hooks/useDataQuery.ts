import { useState } from 'react';

// In a real application, this would be in an environment variable
const API_URL = import.meta.env.VITE_API_URL;

export const useDataQuery = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      
      if (!res.ok) {
        throw new Error(`Erro ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.json();
      console.log('Resposta do backend:', data); // Log para debug
      
      if (data && data.answer) {
        setResponse(data.answer);
      } else {
        setError('Resposta não encontrada no formato esperado');
      }
    } catch (err) {
      console.error('Erro ao fazer a requisição:', err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao processar sua pergunta');
    } finally {
      setLoading(false);
    }
  };

  return {
    question,
    setQuestion,
    response,
    loading,
    error,
    handleSubmit,
  };
};