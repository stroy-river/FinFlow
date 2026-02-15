
import React, { useState, useEffect, useRef } from 'react';
import { GlassCard, NeoButton, NeuralBadge } from './UI';
import { Send, BrainCircuit, Zap, Sparkles, TrendingUp, AlertTriangle, Shield, Target, Network, Cpu, User } from 'lucide-react';
import { analyzeFinances } from '../services/geminiService';
import { MOCK_METRICS, MOCK_LOANS, MOCK_BUDGET } from '../constants';
import { Transaction, Account } from '../types';

interface Message {
  role: 'user' | 'ai';
  text: string;
  isThinking?: boolean;
}

const AIAdvisor: React.FC<{ transactions: Transaction[]; accounts: Account[] }> = ({ transactions, accounts }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Sovereign Core 26.4 initialized. All company ledgers synced. Analyzing non-obvious correlations in logistics and debt scaling. How shall we simulate your capital today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [thinkStage, setThinkStage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const stages = [
    "Cross-referencing entities ledger...",
    "Running Monte Carlo on Cash Gap probability...",
    "Validating EBITDA vs Debt Scaling...",
    "Applying Silicon Valley efficiency metrics...",
    "Synthesizing Neural Conclusion..."
  ];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => setThinkStage(s => (s + 1) % stages.length), 3000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const query = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setLoading(true);

    try {
      const result = await analyzeFinances(MOCK_METRICS, transactions, MOCK_LOANS, MOCK_BUDGET, query, true, accounts);
      setMessages(prev => [...prev, { role: 'ai', text: result }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "Neural bridge disrupted. Please check API credentials." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col max-w-6xl mx-auto w-full animate-fade-in gap-8">
      
      {/* Neural Header */}
      <div className="flex items-center justify-between bg-white/[0.02] p-8 rounded-[48px] border border-white/5 backdrop-blur-4xl shadow-2xl">
         <div className="flex items-center gap-6">
            <div className="p-5 bg-ios-primary/10 rounded-3xl animate-pulse">
               <BrainCircuit className="text-ios-primary" size={32} />
            </div>
            <div>
               <h2 className="text-3xl font-black tracking-tighter">Neural CFO <span className="text-ios-primary">Quantum</span></h2>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-ios-textSec opacity-50">Silicon Valley Intelligence • 32K Thinking Budget</p>
            </div>
         </div>
         <div className="flex gap-4">
            <NeuralBadge color="blue">Secure Lvl 5</NeuralBadge>
            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-2xl border border-white/10">
               <Cpu size={14} className="text-ios-success" />
               <span className="text-[10px] font-black uppercase tracking-widest text-ios-textSec">G-3 Pro Active</span>
            </div>
         </div>
      </div>

      {/* Messages Area */}
      <GlassCard className="flex-1 flex flex-col p-0 bg-black/40 border-white/5 rounded-[56px] overflow-hidden">
         <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 md:p-14 space-y-10 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-8 rounded-[40px] shadow-2xl transition-all duration-700 ${
                  m.role === 'user' 
                  ? 'bg-ios-primary text-white rounded-br-none' 
                  : 'bg-white/[0.03] border border-white/10 text-white rounded-bl-none'
                }`}>
                  <div className="flex items-center gap-3 mb-4 opacity-40 text-[9px] font-black uppercase tracking-widest">
                    {m.role === 'user' ? <User size={14}/> : <Sparkles size={14}/>}
                    {m.role === 'user' ? 'Konstantin' : 'Neural Core'}
                  </div>
                  <div className="text-lg leading-relaxed whitespace-pre-line font-medium tracking-tight prose prose-invert max-w-none">
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start animate-fade-in">
                 <div className="bg-white/[0.02] border border-ios-primary/20 p-10 rounded-[40px] rounded-bl-none flex flex-col gap-6 min-w-[400px]">
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 border-4 border-ios-primary/10 border-t-ios-primary rounded-full animate-spin" />
                       <div>
                          <p className="text-xl font-black text-white italic">Thinking deeply...</p>
                          <p className="text-[10px] text-ios-primary uppercase font-black tracking-widest animate-pulse mt-1">
                             {stages[thinkStage]}
                          </p>
                       </div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-ios-primary animate-shimmer" style={{ width: `${(thinkStage + 1) * 20}%` }} />
                    </div>
                 </div>
              </div>
            )}
         </div>

         {/* Input Area */}
         <div className="p-8 bg-black/60 border-t border-white/5 backdrop-blur-4xl">
            <div className="relative flex items-center group">
               <input 
                 type="text"
                 value={input}
                 onChange={e => setInput(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && handleSend()}
                 placeholder="Run complex financial simulations..."
                 className="w-full bg-white/[0.03] border border-white/10 p-8 pr-24 rounded-[32px] text-xl font-bold outline-none focus:border-ios-primary/50 transition-all placeholder:opacity-20"
               />
               <button 
                 onClick={handleSend}
                 disabled={loading || !input.trim()}
                 className={`absolute right-4 p-5 rounded-2xl transition-all duration-500 ${input.trim() ? 'bg-ios-primary text-white scale-110 shadow-lg' : 'bg-white/5 text-ios-textSec'}`}
               >
                 <Send size={28} />
               </button>
            </div>
            <div className="flex gap-4 mt-6 overflow-x-auto no-scrollbar pb-2">
               {[
                 { text: "Run Scenario: USDT at 120", icon: <TrendingUp size={14}/> },
                 { text: "Simulate River Stroy Bankruptcy", icon: <AlertTriangle size={14}/> },
                 { text: "Optimize Holding Tax Lvl 5", icon: <Target size={14}/> },
                 { text: "Consolidated EBITDA Forecast 2027", icon: <Network size={14}/> }
               ].map((s, i) => (
                 <button 
                   key={i} 
                   onClick={() => setInput(s.text)}
                   className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all whitespace-nowrap"
                 >
                   {s.icon} {s.text}
                 </button>
               ))}
            </div>
         </div>
      </GlassCard>
    </div>
  );
};

export default AIAdvisor;
