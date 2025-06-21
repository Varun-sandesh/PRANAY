import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Terms: React.FC = () => {
  const { language, translations } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-indigo-800 mb-8">
          {translations.termsOfService[language]}
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              {translations.acceptance[language]}
            </h2>
            <p className="text-gray-700">
              {translations.acceptanceDesc[language]}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              {translations.userConduct[language]}
            </h2>
            <p className="text-gray-700">
              {translations.userConductDesc[language]}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              {translations.disclaimer[language]}
            </h2>
            <p className="text-gray-700">
              {translations.disclaimerDesc[language]}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              {translations.changes[language]}
            </h2>
            <p className="text-gray-700">
              {translations.changesDesc[language]}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;