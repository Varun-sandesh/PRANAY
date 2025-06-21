import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Clock, Plus, Bell, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import 'react-calendar/dist/Calendar.css';

interface SelfCareActivity {
  id: string;
  title: string;
  time: string;
  date: string;
  type: 'meditation' | 'exercise' | 'journaling' | 'hydration' | 'other';
  completed: boolean;
}

const SelfCareScheduler: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activities, setActivities] = useState<SelfCareActivity[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    time: '',
    type: 'meditation' as const
  });

  useEffect(() => {
    const savedActivities = localStorage.getItem('selfCareActivities');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
  }, []);

  const saveActivities = (updatedActivities: SelfCareActivity[]) => {
    setActivities(updatedActivities);
    localStorage.setItem('selfCareActivities', JSON.stringify(updatedActivities));
  };

  const addActivity = () => {
    if (!newActivity.title || !newActivity.time) return;

    const activity: SelfCareActivity = {
      id: Date.now().toString(),
      title: newActivity.title,
      time: newActivity.time,
      date: selectedDate.toISOString().split('T')[0],
      type: newActivity.type,
      completed: false
    };

    saveActivities([...activities, activity]);
    setNewActivity({ title: '', time: '', type: 'meditation' });
    setShowAddForm(false);
  };

  const toggleComplete = (id: string) => {
    const updated = activities.map(activity =>
      activity.id === id ? { ...activity, completed: !activity.completed } : activity
    );
    saveActivities(updated);
  };

  const deleteActivity = (id: string) => {
    const updated = activities.filter(activity => activity.id !== id);
    saveActivities(updated);
  };

  const selectedDateActivities = activities.filter(
    activity => activity.date === selectedDate.toISOString().split('T')[0]
  );

  const getActivityIcon = (type: string) => {
    const icons = {
      meditation: '🧘',
      exercise: '🏃',
      journaling: '📝',
      hydration: '💧',
      other: '✨'
    };
    return icons[type as keyof typeof icons] || '✨';
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">Please log in to access your scheduler</h2>
          <a href="/auth" className="btn-primary">Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-green-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-200 mb-2">
            Self-Care Scheduler
          </h1>
          <p className="text-indigo-600 dark:text-indigo-300">
            Plan and track your wellness activities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200 mb-4">
              Select Date
            </h2>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="w-full"
              tileClassName={({ date }) => {
                const dateStr = date.toISOString().split('T')[0];
                const hasActivities = activities.some(activity => activity.date === dateStr);
                return hasActivities ? 'has-activities' : '';
              }}
            />
          </div>

          {/* Activities for Selected Date */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">
                Activities for {selectedDate.toLocaleDateString()}
              </h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Activity
              </button>
            </div>

            {/* Add Activity Form */}
            {showAddForm && (
              <div className="mb-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Activity title"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="time"
                      value={newActivity.time}
                      onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    />
                    <select
                      value={newActivity.type}
                      onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value as any })}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="meditation">Meditation</option>
                      <option value="exercise">Exercise</option>
                      <option value="journaling">Journaling</option>
                      <option value="hydration">Hydration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={addActivity} className="btn-primary">
                      Add
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Activities List */}
            <div className="space-y-3">
              {selectedDateActivities.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No activities scheduled for this date
                </p>
              ) : (
                selectedDateActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      activity.completed
                        ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                        <div>
                          <h3 className={`font-medium ${
                            activity.completed 
                              ? 'line-through text-gray-500 dark:text-gray-400' 
                              : 'text-gray-800 dark:text-gray-200'
                          }`}>
                            {activity.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4 mr-1" />
                            {activity.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleComplete(activity.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            activity.completed
                              ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200'
                              : 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500'
                          }`}
                        >
                          {activity.completed ? 'Completed' : 'Mark Done'}
                        </button>
                        <button
                          onClick={() => deleteActivity(activity.id)}
                          className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfCareScheduler;