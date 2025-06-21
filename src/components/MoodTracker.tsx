import React, { useState } from 'react';
import { Calendar, BarChart2, PlusCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type Mood = 'happy' | 'neutral' | 'sad' | 'stressed' | 'calm';

interface MoodEntry {
  date: string;
  mood: Mood;
  note: string;
}

const MoodTracker: React.FC = () => {
  const { language, translations } = useLanguage();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);
  const [note, setNote] = useState('');

  if (!translations || !language) {
    return null;
  }

  const getTranslation = (key: string, fallback: string) => {
    return translations[key]?.[language] || fallback;
  };

  const handleAddEntry = () => {
    if (!currentMood) return;

    const today = new Date().toISOString().split('T')[0];

    setEntries([
      ...entries,
      {
        date: today,
        mood: currentMood,
        note,
      },
    ]);

    setCurrentMood(null);
    setNote('');
  };

  const moodOptions: { value: Mood; label: string; emoji: string; color: string }[] = [
    { value: 'happy', label: getTranslation('good', 'Happy'), emoji: '😊', color: 'bg-yellow-100 border-yellow-300' },
    { value: 'calm', label: getTranslation('rarely', 'Calm'), emoji: '😌', color: 'bg-blue-100 border-blue-300' },
    { value: 'neutral', label: getTranslation('average', 'Neutral'), emoji: '😐', color: 'bg-gray-100 border-gray-300' },
    { value: 'stressed', label: getTranslation('often', 'Stressed'), emoji: '😫', color: 'bg-orange-100 border-orange-300' },
    { value: 'sad', label: getTranslation('poor', 'Sad'), emoji: '😢', color: 'bg-indigo-100 border-indigo-300' },
  ];

  const getMoodColor = (mood: Mood): string => {
    return moodOptions.find(option => option.value === mood)?.color || '';
  };

  const getMoodEmoji = (mood: Mood): string => {
    return moodOptions.find(option => option.value === mood)?.emoji || '';
  };

  return (
    <section id="mood" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-indigo-800">
            {getTranslation('trackMood', 'Track Your Mood')}
          </h2>
          <p className="text-lg text-indigo-700 max-w-2xl mx-auto">
            {getTranslation('moodTrackerDesc', 'Reflect on how you’ve felt lately')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card-container">
            <div className="mood-card">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 mr-2 text-indigo-700" />
                <h3 className="text-xl font-medium text-indigo-800">
                  {getTranslation('q1', 'How are you feeling today?')}
                </h3>
              </div>

              <div className="grid grid-cols-5 gap-2 mb-6">
                {moodOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setCurrentMood(option.value)}
                    className={`mood-btn ${currentMood === option.value ? 'selected' : ''}`}
                  >
                    <span className="text-2xl mb-1">{option.emoji}</span>
                    <span className="text-sm">{option.label}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleAddEntry}
                disabled={!currentMood}
                className={`btn-primary w-full ${!currentMood ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                {getTranslation('trackMood', 'Track Mood')}
              </button>
            </div>
          </div>

          <div className="card-container">
            <div className="mood-card">
              <div className="flex items-center mb-4">
                <BarChart2 className="h-5 w-5 mr-2 text-indigo-700" />
                <h3 className="text-xl font-medium text-indigo-800">
                  {getTranslation('trackMood', 'Track Mood')}
                </h3>
              </div>

              {entries.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>{getTranslation('moodTrackerDesc', 'No entries yet. Start tracking your mood!')}</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {[...entries].reverse().map((entry, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${getMoodColor(entry.mood)}`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-600">
                          {new Date(entry.date).toLocaleDateString(
                            language === 'en' ? 'en-US' : language === 'hi' ? 'hi-IN' : 'te-IN',
                            {
                              month: 'short',
                              day: 'numeric',
                            }
                          )}
                        </span>
                        <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                      </div>
                      {entry.note && (
                        <p className="text-sm text-gray-700 mt-1">{entry.note}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodTracker;
