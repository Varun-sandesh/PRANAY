import React from 'react';
import { Phone, Globe, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CrisisResources: React.FC = () => {
  const { language, translations } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-indigo-800 mb-8 text-center">
          {translations.crisisResources[language]}
        </h1>
        
        <div className="grid gap-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center mb-4">
              <Phone className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold text-indigo-800">
                {translations.emergencyHotlines[language]}
              </h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center">
                <a href="tel:988" className="text-green-600 font-semibold text-lg">988</a>
                <span className="ml-4 text-gray-700">
                  {translations.suicidePreventionLifeline[language]}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-semibold text-indigo-800">
                {translations.onlineResources[language]}
              </h2>
            </div>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                  {translations.crisisTextLine[language]}
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-semibold text-indigo-800">
                {translations.immediateHelp[language]}
              </h2>
            </div>
            <p className="text-gray-700">
              {translations.emergencyDesc[language]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisResources;