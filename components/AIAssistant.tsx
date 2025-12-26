
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Maximize2, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getFinancialAdvice } from '../services/geminiService';
import { METRICS } from '../constants';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: "Hello! I'm your **FinVue AI** assistant. How can I help you optimize your finances today?" }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const context = {
      revenue: METRICS[0].value,
      expenses: METRICS[1].value,
      balance: METRICS[2].value,
      transactions: METRICS[3].value
    };

    try {
      const response = await getFinancialAdvice(userMsg, context);
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble connecting to my brain right now. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-8 right-6 md:right-8 w-14 h-14 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200 dark:shadow-none hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center z-[60] group"
      >
        <Bot size={28} />
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center animate-pulse">
          <Sparkles size={10} />
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed z-[120] md:z-[70] transition-all duration-300 overflow-hidden flex flex-col bg-white dark:bg-slate-800 shadow-2xl border border-slate-100 dark:border-slate-700 ${
      isMinimized 
      ? 'bottom-20 md:bottom-8 right-6 md:right-8 h-16 w-64 rounded-2xl' 
      : 'bottom-0 right-0 w-full h-full md:bottom-8 md:right-8 md:h-[600px] md:w-[400px] md:rounded-3xl'
    }`}>
      {/* Header */}
      <div className={`bg-slate-900 dark:bg-slate-950 text-white p-4 flex justify-between items-center cursor-pointer ${isMinimized ? 'h-full' : ''}`} onClick={() => setIsMinimized(!isMinimized)}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Bot size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold">FinVue AI</h4>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Active</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isMinimized && (
            <button 
              onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
              className="hidden md:flex p-1 hover:bg-slate-800 dark:hover:bg-slate-900 rounded transition-colors"
            >
              <Minimize2 size={16} />
            </button>
          )}
          {isMinimized && (
            <button 
              onClick={(e) => { e.stopPropagation(); setIsMinimized(false); }}
              className="hidden md:flex p-1 hover:bg-slate-800 dark:hover:bg-slate-900 rounded transition-colors"
            >
              <Maximize2 size={16} />
            </button>
          )}
          <button 
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            className="p-1 hover:bg-slate-800 dark:hover:bg-slate-900 rounded transition-colors active:scale-90"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] md:text-xs leading-relaxed prose-markdown ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-200/20 dark:shadow-none' 
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-600 rounded-tl-none'
                }`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-700 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-600 rounded-tl-none flex items-center gap-3">
                  <div className="relative">
                    <Loader2 size={16} className="animate-spin text-indigo-600 dark:text-indigo-400" />
                    <Sparkles size={10} className="absolute -top-1 -right-1 text-indigo-400 animate-pulse" />
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">Processing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 safe-area-bottom">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask insights..."
                className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-2xl py-4 md:py-3.5 pl-5 pr-14 text-base md:text-xs font-medium focus:ring-2 focus:ring-indigo-500/50 dark:text-white transition-all outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-2 md:top-1.5 w-11 h-11 md:w-10 md:h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-md active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-3 text-center uppercase font-black tracking-widest pb-2 md:pb-0">
              FinVue AI Engine v2.0
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAssistant;
