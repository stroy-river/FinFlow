import React, { useState } from 'react';
import { GlassCard, NeoButton, AmountDisplay } from './UI';
import { MOCK_BUDGET } from '../constants';
import { Target, TrendingUp, AlertCircle, CheckCircle2, ChevronRight, Filter } from 'lucide-react';

const Budgeting: React.FC = () => {
  const [budgets] = useState(MOCK_BUDGET);

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Бюджетирование</h2>
            <p className="text-ios-textSec text-sm">Контроль выполнения финансового плана</p>
          </div>
          <div className="flex gap-3">
            <NeoButton variant="secondary"><Filter size={18} /> Май 2024</NeoButton>
            <NeoButton><Target size={18} /> Создать план</NeoButton>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <GlassCard className="bg-gradient-to-br from-blue-500/10 to-transparent">
             <p className="text-[10px] uppercase font-bold text-ios-textSec mb-1">Общий бюджет</p>
             <h3 className="text-2xl font-bold tracking-tight">1 250 000 ₽</h3>
             <p className="text-xs text-blue-400 mt-2 flex items-center gap-1">
                <TrendingUp size={12} /> +12% к прошлому месяцу
             </p>
          </GlassCard>
          <GlassCard>
             <p className="text-[10px] uppercase font-bold text-ios-textSec mb-1">Исполнение</p>
             <h3 className="text-2xl font-bold tracking-tight">84.2%</h3>
             <div className="w-full h-1.5 bg-white/5 rounded-full mt-3">
                <div className="h-full bg-blue-500 w-[84%] rounded-full" />
             </div>
          </GlassCard>
          <GlassCard>
             <p className="text-[10px] uppercase font-bold text-ios-textSec mb-1">Перерасход</p>
             <h3 className="text-2xl font-bold tracking-tight text-ios-danger">15 000 ₽</h3>
             <p className="text-xs text-ios-danger mt-2 flex items-center gap-1">
                <AlertCircle size={12} /> Требуется внимание
             </p>
          </GlassCard>
          <GlassCard>
             <p className="text-[10px] uppercase font-bold text-ios-textSec mb-1">Экономия</p>
             <h3 className="text-2xl font-bold tracking-tight text-ios-success">42 000 ₽</h3>
             <p className="text-xs text-ios-success mt-2 flex items-center gap-1">
                <CheckCircle2 size={12} /> В пределах нормы
             </p>
          </GlassCard>
       </div>

       <div className="space-y-4">
          <h3 className="text-xl font-bold">Детализация по статьям</h3>
          {budgets.map(item => {
             const percent = (item.actualAmount / item.plannedAmount) * 100;
             const isOver = percent > 100;
             return (
                <GlassCard key={item.id} className="p-4 flex flex-col md:flex-row md:items-center gap-4 group">
                   <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                         <span className="font-bold">{item.category}</span>
                         <span className={`text-xs font-bold ${isOver ? 'text-red-400' : 'text-ios-textSec'}`}>
                            {percent.toFixed(1)}%
                         </span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                         <div 
                            className={`h-full transition-all duration-700 ${isOver ? 'bg-red-500' : 'bg-blue-500'}`} 
                            style={{ width: `${Math.min(percent, 100)}%` }} 
                         />
                      </div>
                   </div>
                   
                   <div className="flex gap-8 md:px-8">
                      <div className="text-right">
                         <p className="text-[10px] uppercase font-bold text-ios-textSec">План</p>
                         <p className="font-bold"><AmountDisplay value={item.plannedAmount} colored={false} /></p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] uppercase font-bold text-ios-textSec">Факт</p>
                         <p className={`font-bold ${isOver ? 'text-red-400' : ''}`}><AmountDisplay value={item.actualAmount} colored={false} /></p>
                      </div>
                   </div>

                   <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                      <ChevronRight size={20} />
                   </button>
                </GlassCard>
             );
          })}
       </div>
    </div>
  );
};

export default Budgeting;