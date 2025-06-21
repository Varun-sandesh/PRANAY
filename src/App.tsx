import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Quiz from './components/Quiz';
import Results from './components/Results';
import MoodTracker from './components/MoodTracker';
import Resources from './components/Resources';
import Notifications from './components/Notifications';
import Footer from './components/Footer';
import LanguageSwitcher from './components/LanguageSwitcher';
import Dashboard from './components/Dashboard';
import Journal from './components/Journal';
import SelfCareScheduler from './components/SelfCareScheduler';
import AudioResources from './components/AudioResources';
import MindfulnessGames from './components/MindfulnessGames';
import Community from './components/Community';
import Auth from './components/Auth';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [showResults, setShowResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCondition, setQuizCondition] = useState('');
  
  const handleQuizComplete = (score: number, condition: string) => {
    setQuizScore(score);
    setQuizCondition(condition);
    setShowResults(true);
    
    setTimeout(() => {
      const resultsElement = document.getElementById('results');
      if (resultsElement) {
        window.scrollTo({
          top: resultsElement.offsetTop,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const HomePage = () => (
    <>
      <Header />
      <Quiz onQuizComplete={handleQuizComplete} />
      <Results show={showResults} score={quizScore} condition={quizCondition} />
      <MoodTracker />
      <Resources />
      <Notifications />
    </>
  );
  
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <div className="app min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 transition-colors duration-300">
              <LanguageSwitcher />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/scheduler" element={<SelfCareScheduler />} />
                <Route path="/audio" element={<AudioResources />} />
                <Route path="/games" element={<MindfulnessGames />} />
                <Route path="/community" element={<Community />} />
                <Route path="/auth" element={<Auth />} />
              </Routes>
              <Footer />
            </div>
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;