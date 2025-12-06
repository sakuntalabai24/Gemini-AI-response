import React from 'react';
import { ToolType } from '../types';
import { MessageSquare, FileText, Lightbulb, BookOpen, BrainCircuit } from 'lucide-react';

interface LayoutProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTool, setActiveTool, children }) => {
  const navItems = [
    { id: ToolType.ASK, label: 'Ask Me Anything', icon: MessageSquare },
    { id: ToolType.SUMMARIZE, label: 'Quick Summarizer', icon: FileText },
    { id: ToolType.IDEAS, label: 'Idea Generator', icon: Lightbulb },
    { id: ToolType.DEFINE, label: 'Definition Finder', icon: BookOpen },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b border-slate-100">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            GenAI Studio
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTool(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                activeTool === item.id
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTool === item.id ? 'text-indigo-600' : 'text-slate-400'}`} />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <p className="text-xs text-center text-slate-400">Powered by Gemini 2.5 Flash</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;