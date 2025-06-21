import React from 'react';
import { Heart, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-pink-400 mr-2" />
              <span className="text-2xl font-bold">OurSpace</span>
            </div>
            <p className="text-indigo-200 mb-4 max-w-md">
              Your safe haven for mental wellness, self-discovery, and inner peace. We're on a mission to make mental health support accessible to everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#quiz" className="text-indigo-200 hover:text-white transition-colors">Wellness Quiz</a>
              </li>
              <li>
                <a href="#mood" className="text-indigo-200 hover:text-white transition-colors">Mood Tracker</a>
              </li>
              <li>
                <a href="#resources" className="text-indigo-200 hover:text-white transition-colors">Resources</a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">Blog</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">Crisis Resources</a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">Find a Therapist</a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-indigo-800 text-center text-indigo-300 text-sm">
          <p>&copy; {new Date().getFullYear()} OurSpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;