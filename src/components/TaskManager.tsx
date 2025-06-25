
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Trash2, Edit3 } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  createdAt: Date;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [editingTask, setEditingTask] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
        priority: newPriority,
        createdAt: new Date(),
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (id: string, newText: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText } : task
    ));
    setEditingTask(null);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Task Manager</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {completedTasks}/{totalTasks} completed
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%' }}
          ></div>
        </div>
      </div>

      {/* Add Task */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value as 'High' | 'Medium' | 'Low')}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button
          onClick={addTask}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center space-x-2"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      {/* Tasks List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition-all ${
                        snapshot.isDragging ? 'shadow-lg scale-105' : ''
                      } ${task.completed ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                        
                        {editingTask === task.id ? (
                          <input
                            type="text"
                            defaultValue={task.text}
                            onBlur={(e) => updateTask(task.id, e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                updateTask(task.id, e.currentTarget.value);
                              }
                            }}
                            className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                            autoFocus
                          />
                        ) : (
                          <span
                            className={`flex-1 text-gray-900 dark:text-white ${
                              task.completed ? 'line-through' : ''
                            }`}
                          >
                            {task.text}
                          </span>
                        )}
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingTask(task.id)}
                            className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">No tasks yet</div>
          <div className="text-gray-500 dark:text-gray-400">Add your first task to get started!</div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
