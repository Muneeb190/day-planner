
import React, { useState, useEffect } from 'react';
import { StickyNote, Plus, X } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  color: string;
  position: { x: number; y: number };
  createdAt: Date;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const colorOptions = [
    '#FBBF24', '#F87171', '#34D399', '#60A5FA', 
    '#A78BFA', '#FB7185', '#4ADE80', '#FBBF24'
  ];

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNote,
        color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        position: { x: Math.random() * 100, y: Math.random() * 100 },
        createdAt: new Date(),
      };
      setNotes([...notes, note]);
      setNewNote('');
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const updateNote = (id: string, content: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, content } : note
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <StickyNote className="text-yellow-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sticky Notes</h2>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">{notes.length} notes</span>
      </div>

      {/* Add Note */}
      <div className="flex gap-2 mb-6">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a quick note..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
          rows={2}
        />
        <button
          onClick={addNote}
          className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center space-x-2"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Note</span>
        </button>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="relative group transform rotate-1 hover:rotate-0 transition-transform duration-200"
            style={{ backgroundColor: note.color }}
          >
            <div className="p-4 rounded-lg shadow-md min-h-[120px]">
              <button
                onClick={() => deleteNote(note.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-white/20 hover:bg-white/40 rounded-full p-1 transition-all"
              >
                <X size={14} className="text-white" />
              </button>
              
              <textarea
                value={note.content}
                onChange={(e) => updateNote(note.id, e.target.value)}
                className="w-full h-full bg-transparent text-gray-800 placeholder-gray-600 border-none outline-none resize-none text-sm"
                style={{ 
                  background: 'transparent',
                  color: note.color === '#FBBF24' ? '#1F2937' : '#FFFFFF'
                }}
              />
              
              <div className="mt-2 text-xs opacity-70">
                {new Date(note.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="text-center py-12">
          <StickyNote className="mx-auto text-gray-400 dark:text-gray-500 mb-3" size={48} />
          <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">No notes yet</div>
          <div className="text-gray-500 dark:text-gray-400">Add your first sticky note to capture quick thoughts!</div>
        </div>
      )}
    </div>
  );
};

export default Notes;
