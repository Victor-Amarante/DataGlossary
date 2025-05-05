import React from 'react';
import { GlossaryHeader } from './components/GlossaryHeader';
import { QueryForm } from './components/QueryForm';
import { ResponseDisplay } from './components/ResponseDisplay';
import { useDataQuery } from './hooks/useDataQuery';

function App() {
  const { question, setQuestion, response, loading, error, handleSubmit } = useDataQuery();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="w-full max-w-3xl px-4 py-8">
        <GlossaryHeader />
        
        <div className="mt-10 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <QueryForm 
            question={question}
            setQuestion={setQuestion}
            handleSubmit={handleSubmit}
            loading={loading}
          />
          
          <ResponseDisplay 
            response={response}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App;