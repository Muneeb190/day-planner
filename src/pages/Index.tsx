
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TaskManager from '../components/TaskManager';
import Calendar from '../components/Calendar';
import TimeBlocks from '../components/TimeBlocks';
import Notes from '../components/Notes';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';

const Index = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [activeView, setActiveView] = useState('home');

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderActiveView = () => {
    switch (activeView) {
      case 'features':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8 space-y-8">
              <TaskManager />
              <TimeBlocks />
              <Notes />
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
              <Calendar />
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
              <Dashboard />
            </div>
          </div>
        );
      default:
        return (
          <>
            <Hero />
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
              <div className="container mx-auto px-4 py-16 space-y-16">
                <TaskManager />
                {/* <Dashboard /> */}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      {renderActiveView()}
      <Footer />
    </div>
  );
};

export default Index;
