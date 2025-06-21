import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutUs: React.FC = () => {
  const { language, translations } = useLanguage();

  if (!translations || !language) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-indigo-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-indigo-100 rounded w-3/4"></div>
              <div className="h-4 bg-indigo-100 rounded w-2/3"></div>
              <div className="h-4 bg-indigo-100 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-indigo-800 mb-8">
          {translations?.aboutUs?.[language] ?? 'About Us'}
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              {translations?.ourMission?.[language] ?? 'Our Mission'}
            </h2>
            <p className="text-gray-700 mb-6">
              {translations?.missionDesc?.[language] ?? 'Loading mission description...'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              {translations?.ourApproach?.[language] ?? 'Our Approach'}
            </h2>
            <p className="text-gray-700 mb-6">
              {translations?.approachDesc?.[language] ?? 'Loading approach description...'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              {translations?.ourTeam?.[language] ?? 'Our Team'}
            </h2>
            <p className="text-gray-700 mb-6">
              {translations?.teamDesc?.[language] ?? 'Loading team description...'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              {translations?.getInTouch?.[language] ?? 'Get in Touch'}
            </h2>
            <p className="text-gray-700">
              {translations?.contactDesc?.[language] ?? 'Loading contact description...'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;