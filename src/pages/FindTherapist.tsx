import React from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FindTherapist: React.FC = () => {
  const { language, translations } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-indigo-800 mb-8 text-center">
          {translations.findTherapist[language]}
        </h1>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {translations.location[language]}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={translations.enterLocation[language]}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {translations.specialization[language]}
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">{translations.selectSpecialization[language]}</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-end">
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                <Search className="h-5 w-5 mr-2" />
                {translations.search[language]}
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          <p className="text-center text-gray-600">
            {translations.therapistSearchDesc[language]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FindTherapist;