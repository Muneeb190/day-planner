
import React from 'react';
import { Calendar } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 pt-20 pb-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Plan your day.
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">Stay productive.</span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Achieve more.
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                An intuitive planner to manage your daily tasks, notes, and routines. 
                Stay organized and boost your productivity with our powerful planning tools.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                Start Planning Free
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Watch Demo
              </button>
            </div>

            {/* Features Preview */}
            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Task Management</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Calendar Integration</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Time Blocking</span>
              </div>
            </div>
          </div>

          {/* Mockup */}
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="text-blue-600" size={24} />
                <span className="font-semibold text-gray-900 dark:text-white">Today's Plan</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Morning workout</span>
                  <span className="text-sm text-gray-500 ml-auto">9:00 AM</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="w-4 h-4 border-2 border-blue-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Team meeting</span>
                  <span className="text-sm text-gray-500 ml-auto">10:30 AM</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="w-4 h-4 border-2 border-purple-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Project review</span>
                  <span className="text-sm text-gray-500 ml-auto">2:00 PM</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
                <div className="text-sm opacity-90">Productivity Score</div>
                <div className="text-2xl font-bold">87%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
