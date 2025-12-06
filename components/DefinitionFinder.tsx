import React, { useState } from 'react';
import { defineWord } from '../services/geminiService';
import { BookOpen, Search, Loader2 } from 'lucide-react';
import { DefinitionResponse } from '../types';

const DefinitionFinder: React.FC = () => {
  const [word, setWord] = useState('');
  const [data, setData] = useState<DefinitionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;

    setLoading(true);
    setData(null);
    setError('');

    try {
      const result = await defineWord(word);
      if (result) {
        setData(result);
      } else {
        setError("Could not find definition.");
      }
    } catch (err) {
      setError("An error occurred while fetching the definition.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 mt-4">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-2">
            <BookOpen className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Definition Finder</h2>
        <p className="text-slate-500">Expand your vocabulary instantly.</p>
      </div>

      <form onSubmit={handleSearch} className="relative">
        <input
            type="text"
            className="w-full pl-5 pr-14 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg text-slate-800 placeholder-slate-400"
            placeholder="Enter a word..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
        />
        <button
            type="submit"
            disabled={loading || !word.trim()}
            className="absolute right-2 top-2 p-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 disabled:opacity-50 transition-colors"
        >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center text-sm">
            {error}
        </div>
      )}

      {data && !loading && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
            <div className="p-6 bg-teal-50/30">
                <h3 className="text-3xl font-bold text-slate-900 capitalize mb-1">{data.word}</h3>
                <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded uppercase tracking-wide font-semibold">Noun / Verb</span>
            </div>
            
            <div className="p-6 space-y-4">
                <div>
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Definition</h4>
                    <p className="text-slate-800 text-lg leading-relaxed">{data.definition}</p>
                </div>
                
                {data.example && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Example Usage</h4>
                        <p className="text-slate-600 italic">"{data.example}"</p>
                    </div>
                )}
            </div>

            {data.synonyms && data.synonyms.length > 0 && (
                 <div className="p-6 bg-slate-50/50">
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Synonyms</h4>
                    <div className="flex flex-wrap gap-2">
                        {data.synonyms.map((syn, i) => (
                            <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-teal-300 transition-colors cursor-default">
                                {syn}
                            </span>
                        ))}
                    </div>
                 </div>
            )}
        </div>
      )}
    </div>
  );
};

export default DefinitionFinder;