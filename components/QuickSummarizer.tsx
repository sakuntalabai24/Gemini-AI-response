import React, { useState } from 'react';
import { summarizeText } from '../services/geminiService';
import { FileText, ArrowRight, Loader2, Copy, Check } from 'lucide-react';

const QuickSummarizer: React.FC = () => {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setSummary('');
    try {
      const result = await summarizeText(input);
      setSummary(result);
    } catch (error) {
      setSummary("Error: Unable to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
       <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-2">
            <FileText className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Quick Summarizer</h2>
        <p className="text-slate-500">Paste your long text below and get a concise summary in seconds.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
        {/* Input */}
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-100 font-medium text-slate-600 text-sm">
                Input Text
            </div>
            <textarea
                className="flex-1 w-full p-4 resize-none focus:outline-none text-slate-700 leading-relaxed"
                placeholder="Paste article, email, or report here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        </div>

        {/* Output */}
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
            <div className="p-3 bg-blue-50/50 border-b border-blue-100 font-medium text-blue-800 text-sm flex justify-between items-center">
                <span>AI Summary</span>
                {summary && (
                    <button 
                        onClick={handleCopy}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                )}
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50/30">
                {loading ? (
                    <div className="h-full flex flex-col items-center justify-center text-blue-500">
                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                        <span className="text-sm">Processing...</span>
                    </div>
                ) : summary ? (
                    <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {summary}
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
                        Summary will appear here
                    </div>
                )}
            </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
            onClick={handleSummarize}
            disabled={loading || !input.trim()}
            className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? 'Summarizing...' : 'Summarize Now'}
            {!loading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
        </button>
      </div>
    </div>
  );
};

export default QuickSummarizer;