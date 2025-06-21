import React, { useState, useEffect } from 'react';
import { Brain, Timer, Target, Zap } from 'lucide-react';

const MindfulnessGames: React.FC = () => {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCount, setBreathingCount] = useState(0);
  const [puzzleScore, setPuzzleScore] = useState(0);
  const [memoryCards, setMemoryCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  // Breathing Exercise
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathingCount(prev => {
          const newCount = prev + 1;
          
          if (newCount <= 4) {
            setBreathingPhase('inhale');
          } else if (newCount <= 7) {
            setBreathingPhase('hold');
          } else if (newCount <= 11) {
            setBreathingPhase('exhale');
          } else {
            return 0; // Reset cycle
          }
          
          return newCount;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [breathingActive]);

  // Memory Game
  useEffect(() => {
    const cards = [...Array(8)].map((_, i) => Math.floor(i / 2));
    setMemoryCards(cards.sort(() => Math.random() - 0.5));
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryCards[first] === memoryCards[second]) {
        setMatchedCards(prev => [...prev, first, second]);
        setFlippedCards([]);
        setPuzzleScore(prev => prev + 10);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const resetMemoryGame = () => {
    const cards = [...Array(8)].map((_, i) => Math.floor(i / 2));
    setMemoryCards(cards.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMatchedCards([]);
    setPuzzleScore(0);
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      default: return 'Breathe In';
    }
  };

  const getBreathingColor = () => {
    switch (breathingPhase) {
      case 'inhale': return 'from-blue-400 to-blue-600';
      case 'hold': return 'from-purple-400 to-purple-600';
      case 'exhale': return 'from-green-400 to-green-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-indigo-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-200 mb-2">
            Mindfulness Games
          </h1>
          <p className="text-indigo-600 dark:text-indigo-300">
            Interactive exercises to help you relax and focus
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Breathing Exercise */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Zap className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">
                4-7-8 Breathing Exercise
              </h2>
            </div>

            <div className="text-center">
              <div className={`mx-auto w-48 h-48 rounded-full bg-gradient-to-br ${getBreathingColor()} flex items-center justify-center mb-6 transition-all duration-1000 ${
                breathingActive ? (breathingPhase === 'inhale' ? 'scale-110' : breathingPhase === 'exhale' ? 'scale-90' : 'scale-100') : 'scale-100'
              }`}>
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">{getBreathingInstruction()}</div>
                  <div className="text-lg">{breathingCount > 11 ? 0 : breathingCount}</div>
                </div>
              </div>

              <button
                onClick={() => setBreathingActive(!breathingActive)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  breathingActive
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {breathingActive ? 'Stop' : 'Start'} Breathing Exercise
              </button>

              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds</p>
              </div>
            </div>
          </div>

          {/* Memory Card Game */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Brain className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">
                  Memory Game
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Score: <span className="font-bold text-purple-600">{puzzleScore}</span>
                </div>
                <button
                  onClick={resetMemoryGame}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg text-sm hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {memoryCards.map((card, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`aspect-square rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center text-2xl font-bold ${
                    flippedCards.includes(index) || matchedCards.includes(index)
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  } ${matchedCards.includes(index) ? 'opacity-50' : ''}`}
                >
                  {(flippedCards.includes(index) || matchedCards.includes(index)) && (
                    <span>{['🌸', '🌺', '🌻', '🌷'][card]}</span>
                  )}
                </div>
              ))}
            </div>

            {matchedCards.length === 8 && (
              <div className="text-center p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  Congratulations! You completed the game!
                </p>
              </div>
            )}
          </div>

          {/* Focus Timer */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Timer className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">
                Focus Timer
              </h2>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold text-green-600 mb-4">25:00</div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Use the Pomodoro technique to maintain focus
              </p>
              <div className="flex justify-center space-x-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Start
                </button>
                <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  Pause
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Mindful Coloring */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Target className="h-6 w-6 text-pink-600 mr-3" />
              <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">
                Mindful Patterns
              </h2>
            </div>

            <div className="text-center">
              <div className="w-full h-48 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 rounded-lg mb-4 flex items-center justify-center">
                <svg width="200" height="150" viewBox="0 0 200 150">
                  <defs>
                    <pattern id="mandala" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                      <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                      <circle cx="25" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                      <circle cx="25" cy="25" r="10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                      <circle cx="25" cy="25" r="5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.9" />
                    </pattern>
                  </defs>
                  <rect width="200" height="150" fill="url(#mandala)" className="text-pink-400" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Focus on the patterns to calm your mind
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindfulnessGames;