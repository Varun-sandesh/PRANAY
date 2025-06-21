import React from 'react';
import { BookOpen, BarChart, Smile, Frown, Meh } from 'lucide-react';
import { Link } from '../utils/ScrollLink';
import { useLanguage } from '../contexts/LanguageContext';

interface ResultsProps {
  show: boolean;
  score: number;
  condition: string;
}

const Results: React.FC<ResultsProps> = ({ show, score, condition }) => {
  const { language, translations } = useLanguage();
  
  if (!show) return null;
  
  const getMoodIcon = () => {
    if (score >= 12) return <Frown className="h-16 w-16 text-red-500" />;
    if (score >= 8) return <Meh className="h-16 w-16 text-yellow-500" />;
    return <Smile className="h-16 w-16 text-green-500" />;
  };
  
  return (
    <section id="results" className="py-16 bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="results-card">
          <div className="flex justify-center mb-6">
            {getMoodIcon()}
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-800">
            {translations.resultsTitle[language]}
          </h2>
          
          <div className="mb-8 px-6 py-4 bg-white rounded-lg shadow-sm border border-indigo-100">
            <p className="text-lg text-center text-indigo-700">{condition}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="mood" className="btn-primary">
              <BarChart className="mr-2 h-5 w-5" />
              {translations.trackMood[language]}
            </Link>
            <Link to="resources" className="btn-secondary">
              <BookOpen className="mr-2 h-5 w-5" />
              {translations.exploreResources[language]}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;