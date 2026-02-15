
import React, { useState, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Line } from 'recharts';
import { GlassCard, GlowCard, AmountDisplay, NeoButton, NeuralBadge, StatusOrb } from './UI';
import { MOCK_METRICS, MOCK_ORGS, MOCK_TRANSACTIONS } from '../constants';
import { LedgerType, Transaction, Account, Organization } from '../types';
import { 
  Shield, ShieldAlert, TrendingUp, Layers, Zap, Landmark, Globe, RefreshCw, BrainCircuit, Activity, AlertTriangle, ArrowUpRight, Target, Sparkles, MessageSquare, Cpu, Network, ArrowRight, HandCoins
} from 'lucide-react';
import { getDailyBriefing } from '../services/geminiService';
import ScenarioPlanner from './ScenarioPlanner';

const Dashboard: React.FC<{ transactions: Transaction[]; accounts: Account[] }> = ({ transactions, accounts }) => {
  const [baseCurrency, setBaseCurrency] = useState<'RUB' | 'USDT'>('RUB');
  const [view, setView] = useState<'decision' | 'matrix' | 'scenarios'>('decision');
  const [briefing, setBriefing] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const fetchBriefing = async () => {
      setIsAnalyzing(true);
      try {
        const result = await getDailyBriefing(MOCK_METRICS, accounts, transactions);
        setBriefing(result);
      } catch (e) {
        setBriefing("Не удалось загрузить нейронный брифинг.");
      } finally {
        setIsAnalyzing(false);
      }
    };
    fetchBriefing();
  }, []);

  return (
    <div className="space-y-12 animate-fade-in pb-32 max-w-[1800px] mx-auto">
      
      {/* Platform Status Ribbon */}
      <div className="flex items-center justify-between bg-white/[0.03] border border-white/5 rounded-full px-8 py-3 backdrop-blur-3xl">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
               <StatusOrb status="online" />
               <span className="text-[10px] font-black uppercase tracking-widest text-ios-textSec">Banking Nodes: 5/5 Active</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-3">
               <Cpu size={14} className="text-ios-primary" />
               <span className="text-[10px] font-black uppercase tracking-widest text-ios-textSec">Last AI Sync: 2m ago</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <NeuralBadge color="purple">Sovereign Protocol</NeuralBadge>
         </div>
      </div>

      {/* Decision Center: Primary High-Leverage Blocks */}
      {view === 'decision' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Decision Matrix */}
            <div className="lg:col-span-8 space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <GlowCard color="green" className="flex flex-col justify-between h-80">
                     <div>
                        <div className="flex items-center gap-3 mb-6">
                           <HandCoins className="text-ios-success" size={24} />
                           <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-ios-success">Safe to Withdraw (Dividends)</h4>
                        </div>
                        <AmountDisplay value={8450000} size="xl" />
                     </div>
                     <div className="flex justify-between items-end border-t border-ios-success/20 pt-6 mt-6">
                        <p className="text-[9px] text-ios-textSec uppercase font-black">Verified by Neural Audit</p>
                        <NeoButton variant="secondary" className="px-6 py-3 rounded-2xl text-[8px] bg-white/10">Вывести</NeoButton>
                     </div>
                  </GlowCard>

                  <GlowCard color="blue" className="flex flex-col justify-between h-80">
                     <div>
                        <div className="flex items-center gap-3 mb-6">
                           <TrendingUp className="text-ios-primary" size={24} />
                           <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-ios-primary">Estimated EBITDA Q2</h4>
                        </div>
                        <AmountDisplay value={12400000} size="xl" />
                     </div>
                     <div className="flex justify-between items-end border-t border-ios-primary/20 pt-6 mt-6">
                        <p className="text-[9px] text-ios-textSec uppercase font-black">Holding Convergence: 94%</p>
                        <NeoButton variant="secondary" className="px-6 py-3 rounded-2xl text-[8px] bg-white/10">Детали</NeoButton>
                     </div>
                  </GlowCard>
               </div>

               <GlassCard title="Neural Strategic Briefing" className="bg-gradient-to-br from-ios-primary/5 to-transparent">
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-8">
                       <BrainCircuit size={64} className="text-ios-primary animate-pulse" />
                       <div className="text-center">
                          <p className="text-xl font-black tracking-tighter mb-1">Синтез финансовой стратегии...</p>
                          <p className="text-[10px] text-ios-textSec uppercase tracking-[0.4em] animate-pulse">Running 32k Thinking Tokens</p>
                       </div>
                    </div>
                  ) : (
                    <div className="prose prose-invert max-w-none">
                       <p className="text-2xl leading-relaxed font-medium italic text-blue-50/90 whitespace-pre-wrap">
                          {briefing}
                       </p>
                       <div className="mt-12 flex gap-4">
                          <NeoButton variant="secondary" className="px-8 py-4">Архив советов</NeoButton>
                          <NeoButton className="px-8 py-4 shadow-ios-primary/20">Применить рекомендации</NeoButton>
                       </div>
                    </div>
                  )}
               </GlassCard>
            </div>

            {/* Side Action Panel */}
            <div className="lg:col-span-4 space-y-10">
               <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-ios-textSec ml-6">Decision Center</h4>
               
               <div className="space-y-6">
                  {[
                    { title: "Неразнесенные", value: "42", label: "операции", icon: <Layers className="text-ios-warning" />, color: "amber" },
                    { title: "Кассовый разрыв", value: "05.06", label: "ожидается", icon: <AlertTriangle className="text-ios-danger" />, color: "red" },
                    { title: "Налоги (НДС)", value: "1.2M", label: "к оплате", icon: <Shield className="text-ios-primary" />, color: "blue" }
                  ].map((item, i) => (
                    <div key={i} className={`p-8 rounded-[40px] border bg-white/[0.03] border-white/5 hover:border-${item.color}-500/30 transition-all duration-500 cursor-pointer group`}>
                       <div className="flex justify-between items-center mb-6">
                          <div className="p-4 rounded-2xl bg-white/5">{item.icon}</div>
                          <NeuralBadge color={item.color as any}>Active</NeuralBadge>
                       </div>
                       <p className="text-[9px] font-black uppercase tracking-[0.3em] text-ios-textSec mb-1">{item.title}</p>
                       <h3 className="text-4xl font-black tracking-tighter">{item.value} <span className="text-sm font-medium opacity-40">{item.label}</span></h3>
                       <button className="mt-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-ios-primary group-hover:gap-5 transition-all">
                          Исправить <ArrowRight size={14} />
                       </button>
                    </div>
                  ))}
               </div>

               <GlowCard color="blue" className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                     <Network size={20} className="text-ios-primary" />
                     <h4 className="text-[10px] font-black uppercase tracking-widest">Global Sync Status</h4>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-ios-primary w-[88%] animate-shimmer" />
                  </div>
                  <p className="text-[8px] font-black uppercase tracking-[0.4em] text-ios-textSec mt-4 text-center">Cloud Ledger Consistency: 99.99%</p>
               </GlowCard>
            </div>
          </div>
        </>
      )}

      {/* Analytics Matrix View */}
      {view === 'matrix' && (
        <div className="animate-fade-in space-y-10">
           <GlassCard className="h-[600px]" title="Autonomous Performance Matrix">
              <ResponsiveContainer width="100%" height="100%">
                 <ComposedChart data={MOCK_METRICS}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" vertical={false} />
                    <XAxis dataKey="month" stroke="#444" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900}} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.95)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(50px)' }} />
                    <Bar dataKey="profit" name="EBITDA" fill="#30D158" radius={[20, 20, 0, 0]} barSize={80} />
                    <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#0A84FF" strokeWidth={8} dot={{ r: 8, fill: '#0A84FF', strokeWidth: 4, stroke: '#000' }} />
                 </ComposedChart>
              </ResponsiveContainer>
           </GlassCard>
        </div>
      )}

      {view === 'scenarios' && <ScenarioPlanner transactions={transactions} accounts={accounts} />}
      
      {/* View Switcher Overlay (iOS 26 Sticky Style) */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[80] bg-black/60 border border-white/10 p-2 rounded-full backdrop-blur-5xl shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
         <div className="flex gap-2">
            {[
              { id: 'decision', label: 'Decision Center', icon: <Target size={16} /> },
              { id: 'matrix', label: 'Financial Matrix', icon: <Layers size={16} /> },
              { id: 'scenarios', label: 'Quantum Scenarios', icon: <Sparkles size={16} /> }
            ].map(v => (
              <button 
                key={v.id}
                onClick={() => setView(v.id as any)}
                className={`flex items-center gap-4 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${view === v.id ? 'bg-white text-black' : 'text-ios-textSec hover:text-white'}`}
              >
                {v.icon} {v.label}
              </button>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
