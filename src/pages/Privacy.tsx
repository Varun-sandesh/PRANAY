import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Privacy: React.FC = () => {
  const { language, translations } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-indigo-800 mb-8">
          {translations.privacyPolicy[language]}
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              {translations.dataCollection[language]}
            </h2>
            <p className="text-gray-700">
              {translations.dataCollectionDesc[language]}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              {translations.dataUsage[language]}
            </h2>
            <p className="text-gray-700">
              {translations.dataUsageDesc[language]}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              {translations.dataSecurity[language]}
            </h2>
            <p className="text-gray-700">
              {translations.dataSecurityDesc[language]}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              {translations.contactUs[language]}
            </h2>
            <p className="text-gray-700">
              {translations.privacyContactDesc[language]}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;