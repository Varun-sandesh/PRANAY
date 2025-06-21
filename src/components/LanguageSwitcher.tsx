import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'mr', name: 'मराठी' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'kn', name: 'ಕನ್ನಡ' }
  ];

  return (
    <div className="absolute top-20 right-4 z-50">
      <div className="relative group">
        <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
          <Globe className="h-5 w-5 text-indigo-600" />
          <span className="text-indigo-800 font-medium">
            {languages.find(lang => lang.code === language)?.name}
          </span>
        </button>
        
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code as 'en' | 'hi' | 'te' | 'bn' | 'ta' | 'mr' | 'gu' | 'kn')}
              className={`block w-full text-left px-4 py-2 hover:bg-indigo-50 first:rounded-t-xl last:rounded-b-xl ${
                language === lang.code ? 'bg-indigo-50 text-indigo-800 font-medium' : 'text-gray-700'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;