import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, TrendingUp, Heart, Brain, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { language, translations } = useLanguage();
  const { user } = useAuth();
  const [moodData, setMoodData] = useState([]);
  const [quizScores, setQuizScores] = useState([]);
  const [dailyQuote, setDailyQuote] = useState('');

  useEffect(() => {
    // Load mock data
    const mockMoodData = [
      { date: '2024-01-01', mood: 4, stress: 2 },
      { date: '2024-01-02', mood: 3, stress: 3 },
      { date: '2024-01-03', mood: 5, stress: 1 },
      { date: '2024-01-04', mood: 4, stress: 2 },
      { date: '2024-01-05', mood: 3, stress: 4 },
      { date: '2024-01-06', mood: 4, stress: 2 },
      { date: '2024-01-07', mood: 5, stress: 1 }
    ];

    const mockQuizScores = [
      { week: 'Week 1', score: 15 },
      { week: 'Week 2', score: 12 },
      { week: 'Week 3', score: 8 },
      { week: 'Week 4', score: 6 }
    ];

    setMoodData(mockMoodData);
    setQuizScores(mockQuizScores);

    // Daily motivational quotes
    const quotes = [
      "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
      "It's okay to not be okay. What's not okay is staying that way.",
      "Healing isn't linear. Be patient with yourself.",
      "You are stronger than you think and more resilient than you know.",
      "Progress, not perfection, is the goal."
    ];
    
    setDailyQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">Please log in to view your dashboard</h2>
          <a href="/auth" className="btn-primary">Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-200 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-indigo-600 dark:text-indigo-300">
            Here's your mental wellness overview
          </p>
        </div>

        {/* Daily Quote */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Quote className="h-6 w-6 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">
              Daily Inspiration
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 italic text-lg">
            "{dailyQuote}"
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Average Mood</p>
                <p className="text-3xl font-bold text-green-600">4.1/5</p>
              </div>
              <Heart className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Stress Level</p>
                <p className="text-3xl font-bold text-yellow-600">2.1/5</p>
              </div>
              <Brain className="h-12 w-12 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Check-ins</p>
                <p className="text-3xl font-bold text-blue-600">7</p>
              </div>
              <Calendar className="h-12 w-12 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mood Tracker Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-6 w-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">
                Mood Trends
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="stress" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quiz Progress Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <BarChart className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">
                Quiz Progress
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={quizScores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;