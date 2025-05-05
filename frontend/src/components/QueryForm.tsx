import React from 'react';
import { Send } from 'lucide-react';

interface QueryFormProps {
  question: string;
  setQuestion: (question: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export const QueryForm: React.FC<QueryFormProps> = ({
  question,
  setQuestion,
  handleSubmit,
  loading
}) => {
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ex: O que é um data lake?"
          className="w-full p-4 pr-16 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077cc] focus:border-transparent transition-all"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg ${
            loading || !question.trim()
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-[#0077cc] text-white hover:bg-[#005fa3] active:bg-[#003f73]'
          } transition-colors duration-200`}
          aria-label="Perguntar"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};