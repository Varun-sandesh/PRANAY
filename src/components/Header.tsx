import React from 'react';
import { Heart, Menu, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { language, translations } = useLanguage();
  const { isDark, toggleTheme, isHighContrast, toggleHighContrast } = useTheme();

  return (
    <header className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      {/* Accessibility Controls */}
      <div className="absolute top-4 left-4 z-50 flex space-x-2">
        <button
          onClick={toggleTheme}
          className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-indigo-600" />}
        </button>
        
        <button
          onClick={toggleHighContrast}
          className={`p-2 rounded-full shadow-md hover:shadow-lg transition-shadow ${
            isHighContrast 
              ? 'bg-black text-white' 
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'
          }`}
          aria-label="Toggle high contrast"
        >
          <span className="text-sm font-bold">A</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="absolute top-4 right-4 z-50">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
            Dashboard
          </Link>
          <Link to="/journal" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
            Journal
          </Link>
          <Link to="/community" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
            Community
          </Link>
          <Link to="/auth" className="btn-primary">
            Login
          </Link>
        </div>
      </nav>

      <div className="particles absolute inset-0 z-0"></div>
      
      <div className="container px-4 mx-auto text-center z-10 py-16">
        <div className="flex justify-center mb-4">
          <Heart className="h-16 w-16 text-indigo-500 animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-indigo-800 dark:text-indigo-200 tracking-tight">
          {translations.welcome[language]}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-indigo-700 dark:text-indigo-300 max-w-3xl mx-auto font-light">
          {translations.tagline[language]}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#quiz" className="btn-primary">
            {translations.takeQuiz[language]}
          </a>
          <Link to="/resources" className="btn-secondary">
            {translations.exploreResources[language]}
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="h-16 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.27C57.71,77.7,129.3,65.05,198.54,62.56,252.39,60.66,297.43,65.05,321.39,56.44Z" fill="currentColor" className="text-white dark:text-gray-800"></path>
        </svg>
      </div>
    </header>
  );
};

export default Header;