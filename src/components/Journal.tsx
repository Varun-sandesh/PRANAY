import React, { useState, useEffect } from 'react';
import { PenTool, Save, Calendar, Filter, Smile, Frown, Meh } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface JournalEntry {
  id: string;
  content: string;
  mood: 'happy' | 'neutral' | 'sad';
  date: string;
  tags: string[];
}

const Journal: React.FC = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState<'happy' | 'neutral' | 'sad'>('neutral');
  const [filterMood, setFilterMood] = useState<string>('all');

  useEffect(() => {
    // Load saved entries from localStorage
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const saveEntry = () => {
    if (!currentEntry.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content: currentEntry,
      mood: selectedMood,
      date: new Date().toISOString(),
      tags: []
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    setCurrentEntry('');
  };

  const filteredEntries = filterMood === 'all' 
    ? entries 
    : entries.filter(entry => entry.mood === filterMood);

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile className="h-5 w-5 text-green-500" />;
      case 'sad': return <Frown className="h-5 w-5 text-red-500" />;
      default: return <Meh className="h-5 w-5 text-yellow-500" />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">Please log in to access your journal</h2>
          <a href="/auth" className="btn-primary">Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-200 mb-2">
            Personal Journal
          </h1>
          <p className="text-indigo-600 dark:text-indigo-300">
            Express your thoughts and feelings in a safe space
          </p>
        </div>

        {/* New Entry Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <PenTool className="h-6 w-6 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">
              New Entry
            </h2>
          </div>

          <textarea
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="How are you feeling today? What's on your mind?"
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
          />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mood:</span>
              <div className="flex space-x-2">
                {['happy', 'neutral', 'sad'].map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood as any)}
                    className={`p-2 rounded-lg transition-colors ${
                      selectedMood === mood 
                        ? 'bg-purple-100 dark:bg-purple-800' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {getMoodIcon(mood)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={saveEntry}
              disabled={!currentEntry.trim()}
              className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Entry
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center mb-6">
          <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
          <select
            value={filterMood}
            onChange={(e) => setFilterMood(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Moods</option>
            <option value="happy">Happy</option>
            <option value="neutral">Neutral</option>
            <option value="sad">Sad</option>
          </select>
        </div>

        {/* Entries List */}
        <div className="space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No journal entries yet. Start writing!</p>
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div key={entry.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getMoodIcon(entry.mood)}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {entry.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;