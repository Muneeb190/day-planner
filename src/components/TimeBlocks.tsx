
import React, { useState, useEffect } from 'react';
import { Clock, Plus } from 'lucide-react';

interface TimeBlock {
  id: string;
  time: string;
  title: string;
  duration: number; // in minutes
  color: string;
}

const TimeBlocks = () => {
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>(() => {
    const saved = localStorage.getItem('timeBlocks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newBlock, setNewBlock] = useState({
    time: '09:00',
    title: '',
    duration: 60,
    color: '#3B82F6'
  });

  useEffect(() => {
    localStorage.setItem('timeBlocks', JSON.stringify(timeBlocks));
  }, [timeBlocks]);

  const addTimeBlock = () => {
    if (newBlock.title.trim()) {
      const block: TimeBlock = {
        id: Date.now().toString(),
        time: newBlock.time,
        title: newBlock.title,
        duration: newBlock.duration,
        color: newBlock.color,
      };
      setTimeBlocks([...timeBlocks, block].sort((a, b) => a.time.localeCompare(b.time)));
      setNewBlock({ time: '09:00', title: '', duration: 60, color: '#3B82F6' });
    }
  };

  const deleteTimeBlock = (id: string) => {
    setTimeBlocks(timeBlocks.filter(block => block.id !== id));
  };

  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  const getBlocksForHour = (hour: number) => {
    const hourStr = hour.toString().padStart(2, '0') + ':00';
    return timeBlocks.filter(block => block.time.startsWith(hourStr.slice(0, 2)));
  };

  const formatTime = (hour: number) => {
    if (hour === 0) return '12:00 AM';
    if (hour < 12) return `${hour}:00 AM`;
    if (hour === 12) return '12:00 PM';
    return `${hour - 12}:00 PM`;
  };

  const colorOptions = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
    '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Clock className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Time Blocks</h2>
        </div>
      </div>

      {/* Add Time Block Form */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input
            type="time"
            value={newBlock.time}
            onChange={(e) => setNewBlock({ ...newBlock, time: e.target.value })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newBlock.title}
            onChange={(e) => setNewBlock({ ...newBlock, title: e.target.value })}
            placeholder="Activity title..."
            className="md:col-span-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newBlock.duration}
            onChange={(e) => setNewBlock({ ...newBlock, duration: parseInt(e.target.value) })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value={30}>30 min</option>
            <option value={60}>1 hour</option>
            <option value={90}>1.5 hours</option>
            <option value={120}>2 hours</option>
          </select>
          <button
            onClick={addTimeBlock}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center space-x-2"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>
        
        <div className="flex space-x-2 mt-3">
          {colorOptions.map(color => (
            <button
              key={color}
              onClick={() => setNewBlock({ ...newBlock, color })}
              className={`w-6 h-6 rounded-full border-2 ${
                newBlock.color === color ? 'border-gray-800 dark:border-white' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Time Schedule */}
      <div className="space-y-1">
        {hours.map(hour => (
          <div key={hour} className="flex items-start border-b border-gray-100 dark:border-gray-700 pb-2">
            <div className="w-20 text-sm text-gray-500 dark:text-gray-400 pt-2">
              {formatTime(hour)}
            </div>
            <div className="flex-1 min-h-[50px] relative">
              {getBlocksForHour(hour).map(block => (
                <div
                  key={block.id}
                  className="mb-1 p-2 rounded-lg text-white text-sm relative group"
                  style={{ backgroundColor: block.color }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{block.title}</div>
                      <div className="text-xs opacity-90">
                        {block.time} • {block.duration} min
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTimeBlock(block.id)}
                      className="opacity-0 group-hover:opacity-100 text-white hover:text-red-200 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              {getBlocksForHour(hour).length === 0 && (
                <div className="h-12 border-l-2 border-gray-200 dark:border-gray-600 ml-4"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {timeBlocks.length === 0 && (
        <div className="text-center py-12">
          <Clock className="mx-auto text-gray-400 dark:text-gray-500 mb-3" size={48} />
          <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">No time blocks scheduled</div>
          <div className="text-gray-500 dark:text-gray-400">Add your first time block to organize your day!</div>
        </div>
      )}
    </div>
  );
};

export default TimeBlocks;
