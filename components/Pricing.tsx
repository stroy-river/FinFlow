import React from 'react';
import { GlassCard, NeoButton } from './UI';
import { Check, Zap, Shield, Crown, CreditCard, Wallet } from 'lucide-react';

const Pricing: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const plans = [
    {
      name: 'Starter',
      price: '4,900',
      icon: <Zap className="text-blue-400" />,
      features: ['1 организация', 'ДДС (Cash Flow)', 'Интеграция 1 банка', 'AI Советник (Basic)'],
      color: 'blue'
    },
    {
      name: 'Business Pro',
      price: '12,500',
      popular: true,
      icon: <Crown className="text-yellow-400" />,
      features: ['До 5 организаций', 'P&L и Баланс', 'Учет кредитов и зарплат', 'AI Советник (Deep Thinking)', 'До 3 пользователей'],
      color: 'yellow'
    },
    {
      name: 'Sovereign',
      price: '29,000',
      icon: <Shield className="text-red-400" />,
      features: ['Безлимит организаций', 'Учет "черных" касс', 'Партнерский учет', 'Персональный финансовый инженер', 'Крипто-шлюз'],
      color: 'red'
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-3xl animate-fade-in">
       <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
             <h2 className="text-5xl font-black tracking-tighter mb-4">Выберите уровень контроля</h2>
             <p className="text-ios-textSec text-xl">FinFlow 2026 — инвестиция в прозрачность вашего будущего.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {plans.map((plan, i) => (
               <GlassCard key={i} className={`relative flex flex-col p-8 border-2 transition-all duration-500 hover:scale-105 ${plan.popular ? 'border-yellow-500/50 shadow-[0_0_50px_rgba(255,214,10,0.2)]' : 'border-white/5'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                      Most Selected
                    </div>
                  )}
                  
                  <div className="mb-8">
                     <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                        {plan.icon}
                     </div>
                     <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                     <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black">{plan.price} ₽</span>
                        <span className="text-ios-textSec text-sm">/ месяц</span>
                     </div>
                  </div>

                  <div className="space-y-4 mb-10 flex-1">
                     {plan.features.map((f, j) => (
                       <div key={j} className="flex items-center gap-3 text-sm">
                          <Check size={16} className="text-green-400 flex-shrink-0" />
                          <span className="text-ios-text/80">{f}</span>
                       </div>
                     ))}
                  </div>

                  <NeoButton variant={plan.popular ? 'primary' : 'secondary'} className="w-full py-5 text-lg">
                     Активировать
                  </NeoButton>
               </GlassCard>
             ))}
          </div>

          <div className="mt-12 flex justify-center gap-8">
             <div className="flex items-center gap-3 text-ios-textSec">
                <CreditCard size={20} /> <span className="text-sm font-bold">Оплата картой РФ / Мир</span>
             </div>
             <div className="flex items-center gap-3 text-ios-textSec">
                <Wallet size={20} /> <span className="text-sm font-bold">USDT / BTC (Sovereign Only)</span>
             </div>
          </div>
          
          <button onClick={onClose} className="mt-8 text-ios-textSec hover:text-white transition-colors block mx-auto font-bold uppercase tracking-widest text-xs">
             Вернуться в демо-режим
          </button>
       </div>
    </div>
  );
};

export default Pricing;