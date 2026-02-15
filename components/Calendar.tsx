
import React, { useState, useMemo } from 'react';
import { GlassCard, AmountDisplay, NeoButton } from './UI';
import { Transaction, TransactionType, Account } from '../types';
import { ChevronLeft, ChevronRight, Plus, AlertTriangle, Calendar as CalendarIcon } from 'lucide-react';

// Added interface for props spread from App.tsx
interface CalendarProps {
  transactions: Transaction[];
  accounts: Account[];
  updateTransaction?: (id: string, updates: Partial<Transaction>) => void;
  addTransaction?: (newTrans: Transaction) => void;
  syncAccount?: (accId: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ transactions, accounts }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Helper to generate days for the view
  const days = useMemo(() => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - 5); // Show 5 days back
    const result = [];
    
    let runningBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);

    for (let i = 0; i < 20; i++) { // Show 20 days total
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayTrans = transactions.filter(t => t.date === dateStr);
      const income = dayTrans.filter(t => t.type === TransactionType.INCOME).reduce((acc, t) => acc + t.amount, 0);
      const expense = dayTrans.filter(t => t.type === TransactionType.EXPENSE).reduce((acc, t) => acc + t.amount, 0);
      
      const balanceStart = runningBalance;
      runningBalance = runningBalance + income - expense;
      
      result.push({
        date: dateStr,
        dayName: date.toLocaleDateString('ru-RU', { weekday: 'short' }),
        dayNum: date.getDate(),
        income,
        expense,
        balanceEnd: runningBalance,
        transactions: dayTrans,
        isToday: dateStr === new Date().toISOString().split('T')[0]
      });
    }
    return result;
  }, [currentDate, transactions, accounts]);

  return (
    <div className="space-y-6 h-full flex flex-col">
       <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CalendarIcon className="text-blue-400" />
              Платежный календарь
            </h2>
            <p className="text-ios-textSec text-sm">Прогноз кассовых разрывов и планирование платежей</p>
          </div>
          <div className="flex gap-2">
             <NeoButton variant="secondary" onClick={() => {
                const d = new Date(currentDate);
                d.setDate(d.getDate() - 7);
                setCurrentDate(d);
             }}><ChevronLeft size={20}/></NeoButton>
             <NeoButton variant="secondary" onClick={() => setCurrentDate(new Date())}>Сегодня</NeoButton>
             <NeoButton variant="secondary" onClick={() => {
                const d = new Date(currentDate);
                d.setDate(d.getDate() + 7);
                setCurrentDate(d);
             }}><ChevronRight size={20}/></NeoButton>
          </div>
       </div>

       {/* Timeline */}
       <div className="overflow-x-auto pb-4 custom-scrollbar flex-1">
          <div className="flex gap-4 min-w-max">
             {days.map(day => (
               <GlassCard 
                  key={day.date} 
                  className={`w-64 min-h-[400px] flex flex-col transition-all duration-300 ${day.isToday ? 'border-blue-500/50 shadow-[0_0_30px_rgba(10,132,255,0.1)]' : ''}`}
                >
                  <div className={`flex justify-between items-center pb-3 border-b ${day.isToday ? 'border-blue-500/30' : 'border-white/10'}`}>
                     <div className="flex flex-col">
                        <span className={`text-xs uppercase font-bold ${day.isToday ? 'text-blue-400' : 'text-ios-textSec'}`}>{day.dayName}</span>
                        <span className="text-2xl font-light">{day.dayNum}</span>
                     </div>
                     <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-ios-textSec hover:text-white transition-colors">
                        <Plus size={16} />
                     </button>
                  </div>

                  {/* Financial Summary for Day */}
                  <div className="py-3 space-y-1 text-sm">
                     <div className="flex justify-between">
                        <span className="text-ios-textSec">На начало:</span>
                        <span className="text-ios-textSec">{(day.balanceEnd - day.income + day.expense).toLocaleString('ru-RU')}</span>
                     </div>
                     {day.income > 0 && (
                       <div className="flex justify-between text-ios-success">
                          <span>+ Приход:</span>
                          <span>{day.income.toLocaleString('ru-RU')}</span>
                       </div>
                     )}
                     {day.expense > 0 && (
                       <div className="flex justify-between text-ios-danger">
                          <span>- Расход:</span>
                          <span>{day.expense.toLocaleString('ru-RU')}</span>
                       </div>
                     )}
                     <div className={`flex justify-between pt-2 border-t border-white/10 font-bold ${day.balanceEnd < 0 ? 'text-red-500' : 'text-white'}`}>
                        <span>Остаток:</span>
                        <span>{day.balanceEnd.toLocaleString('ru-RU')}</span>
                     </div>
                  </div>

                  {/* Cash Gap Alert */}
                  {day.balanceEnd < 0 && (
                     <div className="mt-2 bg-red-500/20 border border-red-500/30 p-2 rounded-xl flex items-center gap-2 text-xs text-red-400 animate-pulse">
                        <AlertTriangle size={14} />
                        <span>Кассовый разрыв!</span>
                     </div>
                  )}

                  {/* Transaction List */}
                  <div className="flex-1 overflow-y-auto mt-4 space-y-2 pr-1 custom-scrollbar max-h-[250px]">
                     {day.transactions.map(t => (
                        <div key={t.id} className={`p-2 rounded-xl text-xs flex flex-col border ${t.status === 'planned' ? 'border-dashed border-white/20 bg-transparent' : 'border-transparent bg-white/5'}`}>
                           <div className="flex justify-between items-start mb-1">
                              <span className="font-bold truncate max-w-[100px]">{t.category}</span>
                              <span className={t.type === TransactionType.INCOME ? 'text-ios-success' : 'text-ios-danger'}>
                                 {t.type === TransactionType.INCOME ? '+' : '-'}{t.amount.toLocaleString()}
                              </span>
                           </div>
                           <span className="text-ios-textSec truncate">{t.description}</span>
                           {t.status === 'planned' && <span className="text-[10px] text-yellow-500 mt-1 uppercase font-bold">План</span>}
                        </div>
                     ))}
                  </div>

               </GlassCard>
             ))}
          </div>
       </div>
    </div>
  );
};

export default Calendar;
