
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarTask {
  id: string;
  title: string;
  date: string;
  time?: string;
  priority: 'High' | 'Medium' | 'Low';
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarTasks, setCalendarTasks] = useState<CalendarTask[]>(() => {
    const saved = localStorage.getItem('calendarTasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  useEffect(() => {
    localStorage.setItem('calendarTasks', JSON.stringify(calendarTasks));
  }, [calendarTasks]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const addTask = () => {
    if (newTask.trim()) {
      const task: CalendarTask = {
        id: Date.now().toString(),
        title: newTask,
        date: selectedDate.toISOString().split('T')[0],
        time: newTime || undefined,
        priority: newPriority,
      };
      setCalendarTasks([...calendarTasks, task]);
      setNewTask('');
      setNewTime('');
    }
  };

  const getTasksForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return calendarTasks.filter(task => task.date === dateStr);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Calendar View */}
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Week Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} className="p-2 h-24"></div>
          ))}
          
          {/* Days */}
          {days.map(day => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isSelected = selectedDate.toDateString() === date.toDateString();
            const isToday = new Date().toDateString() === date.toDateString();
            const tasksForDay = getTasksForDate(date);

            return (
              <div
                key={day}
                onClick={() => setSelectedDate(date)}
                className={`p-2 h-24 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer transition-colors ${
                  isSelected ? 'bg-blue-100 dark:bg-blue-900 border-blue-500' :
                  isToday ? 'bg-green-50 dark:bg-green-900 border-green-300' :
                  'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className={`text-sm font-medium ${
                  isSelected ? 'text-blue-600 dark:text-blue-400' :
                  isToday ? 'text-green-600 dark:text-green-400' :
                  'text-gray-900 dark:text-white'
                }`}>
                  {day}
                </div>
                <div className="mt-1 space-y-1">
                  {tasksForDay.slice(0, 2).map(task => (
                    <div
                      key={task.id}
                      className={`text-xs px-1 py-0.5 rounded truncate ${getPriorityColor(task.priority)}`}
                    >
                      {task.title}
                    </div>
                  ))}
                  {tasksForDay.length > 2 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      +{tasksForDay.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Details for Selected Date */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>

        {/* Add Task Form */}
        <div className="space-y-3 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add task for this date..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as 'High' | 'Medium' | 'Low')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <button
            onClick={addTask}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            Add Task
          </button>
        </div>

        {/* Tasks for Selected Date */}
        <div className="space-y-3">
          {getTasksForDate(selectedDate).map(task => (
            <div key={task.id} className={`p-3 rounded-lg ${getPriorityColor(task.priority)}`}>
              <div className="font-medium">{task.title}</div>
              {task.time && (
                <div className="text-sm opacity-75">{task.time}</div>
              )}
            </div>
          ))}
          {getTasksForDate(selectedDate).length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              No tasks for this date
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
