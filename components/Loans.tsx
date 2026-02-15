
import React, { useState } from 'react';
import { GlassCard, NeoButton, AmountDisplay } from './UI';
import { MOCK_LOANS } from '../constants';
import { Loan } from '../types';
import { Landmark, ArrowRight, Calendar, Percent, Plus, History } from 'lucide-react';

const Loans: React.FC = () => {
  const [loans] = useState<Loan[]>(MOCK_LOANS);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold">Кредиты и Обязательства</h2>
           <p className="text-ios-textSec text-sm">Контроль задолженности и графиков платежей</p>
        </div>
        <NeoButton><Plus size={20} /> Добавить кредит</NeoButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loans.map(loan => {
          const progress = ((loan.totalAmount - loan.remainingAmount) / loan.totalAmount) * 100;
          return (
            <GlassCard key={loan.id} className="border-white/5 hover:border-blue-500/20 transition-all">
               <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <Landmark size={24} />
                     </div>
                     <div>
                        <h3 className="text-xl font-bold">{loan.name}</h3>
                        <p className="text-sm text-ios-textSec">{loan.bankName}</p>
                     </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-widest">
                    Активен
                  </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="space-y-1">
                     <p className="text-[10px] uppercase font-bold text-ios-textSec">Остаток</p>
                     <p className="text-lg font-bold"><AmountDisplay value={loan.remainingAmount} colored={false} /></p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] uppercase font-bold text-ios-textSec">Ставка</p>
                     <div className="flex items-center gap-1">
                        <span className="text-lg font-bold">{loan.interestRate}%</span>
                        <Percent size={12} className="text-blue-400" />
                     </div>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] uppercase font-bold text-ios-textSec">Платеж</p>
                     <p className="text-lg font-bold"><AmountDisplay value={loan.monthlyPayment} colored={false} /></p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] uppercase font-bold text-ios-textSec">Срок до</p>
                     <p className="text-lg font-bold">{new Date(loan.endDate).toLocaleDateString('ru-RU', { month: 'short', year: 'numeric' })}</p>
                  </div>
               </div>

               {/* Progress Bar */}
               <div className="space-y-2 mb-8">
                  <div className="flex justify-between text-xs font-medium">
                     <span className="text-ios-textSec">Выплачено: {progress.toFixed(1)}%</span>
                     <span>Всего: <AmountDisplay value={loan.totalAmount} colored={false} /></span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                     <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-500 transition-all duration-1000" 
                        style={{ width: `${progress}%` }} 
                     />
                  </div>
               </div>

               <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                     <History size={16} /> История
                  </button>
                  <button className="flex-1 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                     График <ArrowRight size={16} />
                  </button>
               </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

export default Loans;
