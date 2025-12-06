import React, { useState } from 'react';
import { generateIdeas } from '../services/geminiService';
import { Lightbulb, Loader2, Sparkles } from 'lucide-react';

const IdeaGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setIdeas([]);
    try {
      const results = await generateIdeas(topic);
      setIdeas(results);
    } catch (error) {
      setIdeas(["Failed to load ideas. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-600 mb-2">
            <Lightbulb className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Idea Generator</h2>
        <p className="text-slate-500">Stuck on a topic? Let AI spark your creativity.</p>
      </div>

      <form onSubmit={handleGenerate} className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex gap-2">
        <input
            type="text"
            className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-slate-700 placeholder-slate-400"
            placeholder="e.g. Sustainable Living, React Hooks, Digital Marketing..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={loading}
        />
        <button
            type="submit"
            disabled={loading || !topic.trim()}
            className="bg-amber-500 text-white px-6 py-2 rounded-xl font-medium hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Generate
        </button>
      </form>

      <div className="space-y-4">
        {ideas.length > 0 && (
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider pl-1">Generated Ideas</h3>
        )}
        
        <div className="grid gap-3">
            {loading && (
                [1, 2, 3].map(i => (
                    <div key={i} className="h-16 bg-white rounded-xl border border-slate-100 shadow-sm animate-pulse flex items-center px-4">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    </div>
                ))
            )}

            {ideas.map((idea, index) => (
                <div 
                    key={index}
                    className="group bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-amber-300 hover:shadow-md transition-all duration-200 flex items-start gap-3"
                >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-bold mt-0.5">
                        {index + 1}
                    </span>
                    <p className="text-slate-700 font-medium leading-relaxed">{idea}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default IdeaGenerator;