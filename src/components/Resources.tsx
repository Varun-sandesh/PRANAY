import React from 'react';
import { BookOpen, Video, Headphones, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Resource {
  type: 'article' | 'video' | 'meditation' | 'hotline';
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
  link?: string;
  phone?: string;
}

const Resources: React.FC = () => {
  const { language, translations } = useLanguage();
  
  const resources: Resource[] = [
    {
      type: 'article',
      titleKey: 'Understanding Anxiety',
      descriptionKey: 'Learn about the symptoms, causes, and management strategies for anxiety disorders.',
      icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
      link: '#'
    },
    {
      type: 'video',
      titleKey: 'Mindfulness for Beginners',
      descriptionKey: 'A gentle introduction to mindfulness practices that can help reduce stress.',
      icon: <Video className="h-6 w-6 text-indigo-600" />,
      link: '#'
    },
    {
      type: 'meditation',
      titleKey: 'Guided Sleep Meditation',
      descriptionKey: 'A 15-minute meditation to help you relax and prepare for restful sleep.',
      icon: <Headphones className="h-6 w-6 text-indigo-600" />,
      link: '#'
    },
    {
      type: 'hotline',
      titleKey: 'Crisis Support Line',
      descriptionKey: 'Free, confidential support available 24/7 for those in emotional distress.',
      icon: <Phone className="h-6 w-6 text-indigo-600" />,
      phone: '988'
    }
  ];

  if (!translations || !language) {
    return null; // Don't render anything if translations aren't loaded yet
  }

  return (
    <section id="resources" className="py-16 bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-indigo-800">
            {translations?.resourcesTitle?.[language] ?? 'Resources'}
          </h2>
          <p className="text-lg text-indigo-600 max-w-2xl mx-auto">
            {translations?.resourcesDesc?.[language] ?? 'Helpful resources for your journey'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-6">
                <div className="bg-indigo-100 w-12 h-12 rounded-2xl flex items-center justify-center">
                  {resource.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                {translations?.[resource.titleKey]?.[language] ?? resource.titleKey}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {translations?.[resource.descriptionKey]?.[language] ?? resource.descriptionKey}
              </p>
              
              {resource.link && (
                <a 
                  href={resource.link} 
                  className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                >
                  {translations?.exploreResources?.[language] ?? 'Explore'}
                </a>
              )}
              
              {resource.phone && (
                <a 
                  href={`tel:${resource.phone}`} 
                  className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {resource.phone}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;