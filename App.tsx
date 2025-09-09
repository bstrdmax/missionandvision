import React, { useState, useCallback, useMemo } from 'react';
import { BusinessInfo, GeneratedContentData } from './types';
import BusinessInfoForm from './components/BusinessInfoForm';
import GeneratedContent from './components/GeneratedContent';
import Header from './components/Header';
import { generateMissionAndValues } from './services/geminiService';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: '',
    industry: '',
    audience: '',
    services: '',
    usp: '',
    culture: '',
  });
  const [generatedContent, setGeneratedContent] = useState<GeneratedContentData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isFormValid = useMemo(() => {
    // FIX: Check if value is a string before calling trim() to satisfy TypeScript's type checker,
    // as Object.values can be inferred to return `unknown[]`.
    return Object.values(businessInfo).every(value => typeof value === 'string' && value.trim() !== '');
  }, [businessInfo]);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessInfo(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleGenerate = async () => {
    if (!isFormValid) return;
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    try {
      const result = await generateMissionAndValues(businessInfo);
      setGeneratedContent(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setBusinessInfo({
      name: '',
      industry: '',
      audience: '',
      services: '',
      usp: '',
      culture: '',
    });
    setGeneratedContent(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <BusinessInfoForm
            businessInfo={businessInfo}
            onFormChange={handleFormChange}
            onGenerate={handleGenerate}
            onReset={handleReset}
            isLoading={isLoading}
            isFormValid={isFormValid}
          />
          <GeneratedContent
            content={generatedContent}
            isLoading={isLoading}
            error={error}
          />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;