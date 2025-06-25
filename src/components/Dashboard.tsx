
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Target, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [timeBlocks, setTimeBlocks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedTimeBlocks = localStorage.getItem('timeBlocks');
    
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedTimeBlocks) setTimeBlocks(JSON.parse(savedTimeBlocks));
  }, []);

  // Calculate productivity metrics
  const completedTasks = tasks.filter((task: any) => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Weekly productivity data (mock data for demo)
  const weeklyData = [
    { day: 'Mon', completed: 8, total: 10 },
    { day: 'Tue', completed: 12, total: 15 },
    { day: 'Wed', completed: 6, total: 8 },
    { day: 'Thu', completed: 15, total: 18 },
    { day: 'Fri', completed: 10, total: 12 },
    { day: 'Sat', completed: 5, total: 7 },
    { day: 'Sun', completed: 3, total: 5 },
  ];

  // Task priority distribution
  const priorityData = [
    { name: 'High', value: tasks.filter((task: any) => task.priority === 'High').length, color: '#EF4444' },
    { name: 'Medium', value: tasks.filter((task: any) => task.priority === 'Medium').length, color: '#F59E0B' },
    { name: 'Low', value: tasks.filter((task: any) => task.priority === 'Low').length, color: '#10B981' },
  ];

  const totalScheduledTime = timeBlocks.reduce((acc: number, block: any) => acc + block.duration, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-8">
        <TrendingUp className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Productivity Dashboard</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Target className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalTasks}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{completedTasks}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{completionRate}%</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Clock className="text-orange-600 dark:text-orange-400" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(totalScheduledTime / 60)}h</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Scheduled Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="day" className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="completed" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="total" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Task Priority Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Priority Distribution</h3>
          {priorityData.some(item => item.value > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData.filter(item => item.value > 0)}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <Target size={48} className="mx-auto mb-2 opacity-50" />
                <p>No tasks to display</p>
                <p className="text-sm">Add some tasks to see the distribution</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Productivity Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Productivity Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-green-800 dark:text-green-200 font-semibold">Great Job!</div>
            <div className="text-green-600 dark:text-green-400 text-sm">
              You've completed {completionRate}% of your tasks this week.
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-blue-800 dark:text-blue-200 font-semibold">Time Management</div>
            <div className="text-blue-600 dark:text-blue-400 text-sm">
              {Math.round(totalScheduledTime / 60)} hours scheduled across {timeBlocks.length} time blocks.
            </div>
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-purple-800 dark:text-purple-200 font-semibold">Focus Areas</div>
            <div className="text-purple-600 dark:text-purple-400 text-sm">
              {tasks.filter((task: any) => task.priority === 'High').length} high-priority tasks need attention.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
