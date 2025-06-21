import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Blog: React.FC = () => {
  const { language, translations } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-indigo-800 mb-8 text-center">
          {translations.blog[language]}
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog posts will be dynamically loaded here */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-indigo-800 mb-2">
                {translations.comingSoon[language]}
              </h2>
              <p className="text-gray-600">
                {translations.blogDesc[language]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;