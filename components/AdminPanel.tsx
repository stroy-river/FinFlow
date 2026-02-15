
import React, { useState } from 'react';
import { GlassCard, NeoButton, AmountDisplay } from './UI';
import { ADMIN_USERS, MOCK_ORGS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, CreditCard, Search, Activity, Cpu, Database, Wifi, Globe, ShieldCheck, Zap, Briefcase } from 'lucide-react';

const AdminPanel: React.FC<{ tab: string }> = ({ tab }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const SAAS_METRICS = [
     { month: 'Янв', mrr: 1200000, users: 450, churn: 1.2 },
     { month: 'Фев', mrr: 1450000, users: 520, churn: 1.1 },
     { month: 'Мар', mrr: 1800000, users: 610, churn: 0.9 },
     { month: 'Апр', mrr: 2100000, users: 740, churn: 0.8 },
     { month: 'Май', mrr: 2600000, users: 890, churn: 0.7 },
  ];

  const BANK_NODES = [
     { name: 'Тинькофф API', status: 'Online', latency: '24ms', syncs: 1420 },
     { name: 'Сбер Бизнес ID', status: 'Online', latency: '56ms', syncs: 980 },
     { name: 'Альфа-Банк Gateway', status: 'Online', latency: '42ms', syncs: 760 },
     { name: 'Яндекс Пэй (B2B)', status: 'Maintenance', latency: '0ms', syncs: 0 },
  ];

  if (activeTab === 'users' || tab === 'admin_users') {
    return (
      <div className="space-y-8 animate-fade-in pb-20">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="text-4xl font-black tracking-tighter">Управление клиентами</h2>
               <p className="text-ios-textSec text-sm">Мониторинг активных подписок и подключений.</p>
            </div>
            <div className="relative w-96">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-ios-textSec" size={20} />
               <input type="text" placeholder="Поиск по ИНН или email..." className="w-full glass-input pl-14 pr-6 py-5 rounded-[28px] text-sm" />
            </div>
         </div>

         <GlassCard className="p-0 overflow-hidden border-white/10 shadow-3xl">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-ios-textSec border-b border-white/5">
                     <th className="p-8">Клиент / Компания</th>
                     <th className="p-8">Тарифный план</th>
                     <th className="p-8">Банковские мосты</th>
                     <th className="p-8">Статус</th>
                     <th className="p-8 text-right">LTV (Выручка)</th>
                     <th className="p-8 text-center">Действия</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {ADMIN_USERS.map(user => (
                     <tr key={user.id} className="hover:bg-white/5 transition-all">
                        <td className="p-8">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black">
                                 {user.companyName.substring(0,1)}
                              </div>
                              <div>
                                 <p className="font-black text-lg tracking-tight">{user.companyName}</p>
                                 <p className="text-xs text-ios-textSec">{user.email}</p>
                              </div>
                           </div>
                        </td>
                        <td className="p-8">
                           <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                              user.plan === 'Enterprise' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                           }`}>
                              {user.plan}
                           </div>
                        </td>
                        <td className="p-8">
                           <div className="flex -space-x-2">
                              {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center text-[8px] font-bold">B{i}</div>)}
                              <div className="w-8 h-8 rounded-full bg-blue-600/20 border-2 border-black flex items-center justify-center text-[8px] font-bold text-blue-400">+2</div>
                           </div>
                        </td>
                        <td className="p-8">
                           <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-400">
                              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(48,209,88,0.5)] animate-pulse" />
                              Активен
                           </span>
                        </td>
                        <td className="p-8 text-right font-mono font-black text-lg">
                           {(user.totalPaid / 1000).toFixed(0)}k <span className="text-xs opacity-30">₽</span>
                        </td>
                        <td className="p-8 text-center">
                           <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all">
                              <ShieldCheck size={20} className="text-ios-textSec" />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in pb-32">
       <div className="flex items-center justify-between">
          <div>
             <h2 className="text-5xl font-black tracking-tighter flex items-center gap-4">
                <Globe className="text-blue-500 animate-spin-slow" size={44} />
                SaaS Command Center
             </h2>
             <p className="text-ios-textSec text-sm mt-1 uppercase tracking-widest font-black opacity-60">Управление финансовой платформой FinFlow v26.4</p>
          </div>
          <div className="flex gap-2 bg-black/60 p-2 rounded-[28px] border border-white/10 shadow-2xl">
             <button onClick={() => setActiveTab('overview')} className={`px-8 py-3 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-white text-black shadow-xl' : 'text-ios-textSec hover:text-white'}`}>Метрики</button>
             <button onClick={() => setActiveTab('users')} className={`px-8 py-3 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-white text-black shadow-xl' : 'text-ios-textSec hover:text-white'}`}>Клиенты</button>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <GlassCard className="bg-gradient-to-br from-blue-600/10 to-transparent border-blue-500/20">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6">Annual Recurring Revenue</p>
             <h2 className="text-4xl font-black tracking-tighter">31.2M <span className="text-lg opacity-40">₽</span></h2>
             <p className="text-[10px] text-green-400 mt-4 font-black uppercase">+22% к пр. году</p>
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-purple-600/10 to-transparent border-purple-500/20">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-500">Active Companies</p>
             <h2 className="text-4xl font-black tracking-tighter">1,248</h2>
             <div className="flex items-center gap-2 mt-4">
                <div className="flex -space-x-1">
                   {[1,2,3,4].map(i => <div key={i} className="w-4 h-4 rounded-full bg-purple-500/50 border border-black" />)}
                </div>
                <span className="text-[9px] text-ios-textSec font-black uppercase tracking-widest">+12 сегодня</span>
             </div>
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-amber-600/10 to-transparent border-amber-500/20">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">AI Compute Load</p>
             <h2 className="text-4xl font-black tracking-tighter">38.2%</h2>
             <div className="mt-6 flex gap-1">
                {[1,2,3,4,5,6,7,8].map(i => <div key={i} className={`h-4 w-1.5 rounded-sm ${i < 4 ? 'bg-amber-500' : 'bg-white/10'}`} />)}
             </div>
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-emerald-600/10 to-transparent border-emerald-500/20">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">System Health</p>
             <h2 className="text-4xl font-black tracking-tighter text-emerald-500">A+</h2>
             <p className="text-[10px] text-ios-textSec mt-4 font-black uppercase">Все узлы в норме</p>
          </GlassCard>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <GlassCard title="Выручка платформы (SaaS MRR)">
             <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={SAAS_METRICS}>
                      <defs>
                        <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                           <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                      <XAxis dataKey="month" stroke="#444" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 900}} />
                      <YAxis hide />
                      <Tooltip contentStyle={{ backgroundColor: '#000', borderRadius: '28px', border: 'none', backdropFilter: 'blur(30px)' }} />
                      <Area type="monotone" dataKey="mrr" stroke="#3B82F6" fill="url(#colorMrr)" strokeWidth={5} />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </GlassCard>

          <GlassCard title="Статус банковских интеграций (Nodes)">
             <div className="space-y-6">
                {BANK_NODES.map((node, i) => (
                   <div key={i} className="flex items-center justify-between p-6 bg-white/2 rounded-[32px] border border-white/5 hover:border-white/10 transition-all">
                      <div className="flex items-center gap-6">
                         <div className={`w-3 h-3 rounded-full ${node.status === 'Online' ? 'bg-green-500 shadow-[0_0_10px_rgba(48,209,88,0.5)]' : 'bg-yellow-500'}`} />
                         <div>
                            <p className="text-lg font-black tracking-tight text-white">{node.name}</p>
                            <p className="text-[10px] text-ios-textSec uppercase font-black tracking-widest">{node.status} — {node.latency}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-xl font-black font-mono">{node.syncs}</p>
                         <p className="text-[9px] text-ios-textSec uppercase font-black tracking-widest">Синков / ч</p>
                      </div>
                   </div>
                ))}
             </div>
          </GlassCard>
       </div>
       
       <style>{`
          @keyframes spin-slow {
             from { transform: rotate(0deg); }
             to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
             animation: spin-slow 15s linear infinite;
          }
       `}</style>
    </div>
  );
};

export default AdminPanel;
