
import React, { useState } from 'react';
import { GlassCard, NeoButton, NeuralBadge, AmountDisplay } from './UI';
import { MOCK_RULES } from '../constants';
import { 
  Settings as SettingsIcon, User, Bot, Bell, Shield, Wand2, Trash2, Plus, ArrowRight, Brain, Zap, Fingerprint, TrendingUp, CreditCard, Wallet, Crown, Check
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'automation' | 'ai' | 'billing'>('profile');
  const [rules, setRules] = useState(MOCK_RULES);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-40">
       <div className="flex items-center justify-between">
          <h2 className="text-4xl font-black tracking-tighter flex items-center gap-4">
             <SettingsIcon className="text-ios-primary" size={32} />
             Конфигурация
          </h2>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
             <Fingerprint size={16} className="text-ios-primary" />
             <span className="text-[10px] font-black uppercase tracking-widest text-ios-textSec">Session Secure Lvl 4</span>
          </div>
       </div>

       {/* Tabs Scrollable */}
       <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar border-b border-white/5">
          {[
            { id: 'profile', label: 'Профиль', icon: <User size={14}/> },
            { id: 'automation', label: 'Neural Rules', icon: <Wand2 size={14}/> },
            { id: 'ai', label: 'AI Cognition', icon: <Brain size={14}/> },
            { id: 'billing', label: 'Биллинг', icon: <CreditCard size={14}/> }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)} 
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id ? 'bg-white text-black shadow-2xl scale-105' : 'text-ios-textSec hover:text-white hover:bg-white/5'
              }`}
            >
               {tab.icon} {tab.label}
            </button>
          ))}
       </div>

       {activeTab === 'billing' && (
          <div className="space-y-10 animate-fade-in">
             <GlassCard className="bg-gradient-to-br from-ios-warning/10 to-transparent border-ios-warning/20">
                <div className="flex justify-between items-start">
                   <div>
                      <NeuralBadge color="amber">Sovereign Tier</NeuralBadge>
                      <h3 className="text-4xl font-black mt-4 tracking-tighter">Ультра-контроль активен</h3>
                      <p className="text-ios-textSec text-sm mt-2 opacity-70 leading-relaxed max-w-md">
                        Ваш холдинг подключен к высшему уровню безопасности. Все 5 компаний под нейронным надзором.
                      </p>
                   </div>
                   <Crown size={64} className="text-ios-warning opacity-40" />
                </div>
                <div className="mt-12 flex items-center gap-8">
                   <div className="p-6 bg-white/5 rounded-[32px] border border-white/5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-ios-textSec mb-1">След. платеж</p>
                      <p className="text-xl font-black">20 Июн 2026</p>
                   </div>
                   <div className="p-6 bg-white/5 rounded-[32px] border border-white/5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-ios-textSec mb-1">Сумма</p>
                      <p className="text-xl font-black">29,000 ₽ <span className="text-xs opacity-30">/ мес</span></p>
                   </div>
                </div>
             </GlassCard>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <GlassCard title="Методы оплаты">
                   <div className="space-y-4">
                      <div className="flex items-center justify-between p-6 bg-white/5 rounded-[32px] border border-ios-primary/20">
                         <div className="flex items-center gap-4">
                            <CreditCard className="text-ios-primary" />
                            <div>
                               <p className="text-sm font-bold">VISA •••• 0116</p>
                               <p className="text-[10px] text-ios-textSec uppercase">Основной метод</p>
                            </div>
                         </div>
                         <Check size={20} className="text-ios-success" />
                      </div>
                      <NeoButton variant="secondary" className="w-full rounded-[24px] py-4">
                         <Plus size={16} /> Добавить карту
                      </NeoButton>
                   </div>
                </GlassCard>

                <GlassCard title="Sovereign Pay (Crypto)">
                   <p className="text-xs text-ios-textSec mb-6 leading-relaxed italic">
                     Оплачивайте подписку напрямую с крипто-узлов в USDT. Без комиссий банков.
                   </p>
                   <NeoButton variant="mesmerize" className="w-full rounded-[24px] py-6 flex items-center gap-3">
                      <Wallet size={20} /> Pay with Crypto
                   </NeoButton>
                </GlassCard>
             </div>
          </div>
       )}

       {/* Оставляем остальные вкладки как в предыдущей версии для краткости */}
       {activeTab === 'profile' && (
          <div className="space-y-6 animate-fade-in">
             <GlassCard>
                <div className="flex items-center gap-8 mb-8">
                   <div className="relative">
                      <div className="w-24 h-24 rounded-[32px] bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold shadow-2xl">
                         ЯС
                      </div>
                      <div className="absolute -bottom-2 -right-2 p-2 bg-black border border-white/10 rounded-xl">
                         <Plus size={16} />
                      </div>
                   </div>
                   <div>
                      <h3 className="text-2xl font-bold tracking-tighter">Яхно С.В.</h3>
                      <div className="flex items-center gap-2 mt-1">
                         <NeuralBadge color="blue">Sovereign Owner</NeuralBadge>
                         <span className="text-ios-textSec text-[10px] font-black uppercase tracking-widest ml-2">ID: 402-261</span>
                      </div>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-ios-textSec tracking-widest ml-1">Work Email</label>
                      <input type="text" value="director@holding-yahno.ru" readOnly className="w-full glass-input p-6 rounded-[28px] bg-white/5 border-white/10 text-sm font-black" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-ios-textSec tracking-widest ml-1">Secure Phone</label>
                      <input type="text" value="+7 (909) 800-XX-XX" className="w-full glass-input p-6 rounded-[28px] bg-white/5 border-white/10 text-sm font-black" />
                   </div>
                </div>
             </GlassCard>
          </div>
       )}
       
       {/* ... automation и ai вкладки можно добавить аналогично ... */}
    </div>
  );
};

export default Settings;
