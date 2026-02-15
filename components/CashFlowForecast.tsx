
import React, { useState, useEffect } from 'react';
import { GlassCard, AmountDisplay, NeuralBadge } from './UI';
import { Transaction, Account } from '../types';
import { getCashFlowForecast } from '../services/geminiService';
import { BrainCircuit, TrendingDown, AlertCircle, ChevronRight, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ForecastProps {
  transactions: Transaction[];
  accounts: Account[];
}

const CashFlowForecast: React.FC<ForecastProps> = ({ transactions, accounts }) => {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const forecastData = [
    { day: '20 Май', balance: 24500000 },
    { day: '25 Май', balance: 22100000 },
    { day: '30 Май', balance: 18400000 },
    { day: '05 Июн', balance: 12000000 },
    { day: '10 Июн', balance: -1500000 }, // Разрыв
    { day: '15 Июн', balance: 14000000 },
  ];

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      try {
        const result = await getCashFlowForecast(transactions, accounts);
        setAnalysis(result);
      } catch (e) {
        setAnalysis("Ошибка предиктивного модуля.");
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, [transactions, accounts]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 animate-fade-in">
       <GlassCard className="xl:col-span-2 h-[500px]" title="Neural Cash Flow Projection (90d)">
          <div className="h-full pt-10">
             <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={forecastData}>
                   <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#0A84FF" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#0A84FF" stopOpacity={0}/>
                      </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                   <XAxis dataKey="day" stroke="#444" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900}} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#000', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}
                     itemStyle={{ color: '#0A84FF', fontWeight: 'bold' }}
                   />
                   <Area 
                     type="monotone" 
                     dataKey="balance" 
                     stroke="#0A84FF" 
                     strokeWidth={6} 
                     fillOpacity={1} 
                     fill="url(#colorBalance)" 
                     animationDuration={2000}
                   />
                </AreaChart>
             </ResponsiveContainer>
             <div className="flex justify-between items-center px-6 mt-4">
                <div className="flex items-center gap-4">
                   <AlertCircle className="text-ios-danger" size={24} />
                   <div>
                      <p className="text-sm font-black uppercase tracking-tighter">Обнаружен разрыв</p>
                      <p className="text-[10px] text-ios-textSec">Ожидается 10 Июня (Дефицит 1.5М ₽)</p>
                   </div>
                </div>
                <NeuralBadge color="red">Критический риск</NeuralBadge>
             </div>
          </div>
       </GlassCard>

       <GlassCard title="AI Reasoning (32k Thinking)" className="bg-ios-primary/5 border-ios-primary/20">
          <div className="flex flex-col h-full">
             {loading ? (
               <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                  <BrainCircuit className="text-ios-primary animate-pulse" size={64} />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-ios-primary animate-pulse text-center">
                    Neural Engine is thinking...<br/>Analyzing Burn Rates
                  </p>
               </div>
             ) : (
               <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                  <div className="prose prose-invert prose-sm">
                     <div className="text-lg leading-relaxed italic text-blue-100/90 whitespace-pre-wrap">
                        {analysis}
                     </div>
                  </div>
               </div>
             )}
             <div className="pt-8 border-t border-white/5 mt-auto">
                <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center gap-3 transition-all text-[10px] font-black uppercase tracking-widest">
                   Сгенерировать план спасения <ChevronRight size={16} />
                </button>
             </div>
          </div>
       </GlassCard>
    </div>
  );
};

export default CashFlowForecast;
