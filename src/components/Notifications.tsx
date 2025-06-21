import React, { useState } from 'react';
import { Bell, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Notifications: React.FC = () => {
  const { language, translations } = useLanguage();
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };
  
  if (!translations || !language) {
    return null; // Don't render anything if translations aren't loaded yet
  }
  
  return (
    <section id="notifications" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-indigo-800">
              {translations?.notificationsTitle?.[language] ?? 'Notifications'}
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              {translations?.notificationsDesc?.[language] ?? 'Stay updated with our notifications'}
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700">{translations?.daily?.[language] ?? 'Daily updates'}</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700">{translations?.weekly?.[language] ?? 'Weekly updates'}</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700">{translations?.monthly?.[language] ?? 'Monthly updates'}</span>
              </li>
            </ul>
          </div>
          
          <div className="card-container">
            <div className="notification-card">
              {subscribed ? (
                <div className="text-center py-8">
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-indigo-800">
                    {translations?.subscribed?.[language] ?? 'Successfully subscribed'}
                  </h3>
                  <p className="text-gray-700">
                    {translations?.subscribedDesc?.[language] ?? 'You will now receive notifications'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center mb-6">
                    <Bell className="h-6 w-6 mr-3 text-indigo-700" />
                    <h3 className="text-xl font-medium text-indigo-800">
                      {translations?.enableNotifications?.[language] ?? 'Enable notifications'}
                    </h3>
                  </div>
                  
                  <form onSubmit={handleSubscribe}>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-indigo-700 mb-2">
                        {translations?.emailAddress?.[language] ?? 'Email address'}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="form-input"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="frequency" className="block text-sm font-medium text-indigo-700 mb-2">
                        {translations?.reminderFrequency?.[language] ?? 'Reminder frequency'}
                      </label>
                      <select
                        id="frequency"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="form-select"
                      >
                        <option value="daily">{translations?.daily?.[language] ?? 'Daily'}</option>
                        <option value="weekly">{translations?.weekly?.[language] ?? 'Weekly'}</option>
                        <option value="monthly">{translations?.monthly?.[language] ?? 'Monthly'}</option>
                      </select>
                    </div>
                    
                    <button type="submit" className="btn-primary w-full">
                      {translations?.subscribe?.[language] ?? 'Subscribe'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notifications;