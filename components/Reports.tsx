
import React, { useState, useMemo } from 'react';
import { GlassCard, AmountDisplay, NeoButton, DrillDownLayer, NeuralBadge } from './UI';
import { MOCK_METRICS, MOCK_ORGS, MOCK_TRANSACTIONS, MOCK_ACCOUNTS } from '../constants';
import { ChevronRight, ArrowUpRight, ArrowDownRight, BrainCircuit, Activity, Sparkles, Wand2, RefreshCw, BarChart3, TrendingUp, Info, Eye, EyeOff } from 'lucide-react';
import { Transaction, Account } from '../types';
import { getDeepReportAudit } from '../services/geminiService';
import CashFlowForecast from './CashFlowForecast';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface ReportsProps {
  type: 'dds' | 'pnl' | 'balance';
  transactions: Transaction[];
  accounts: Account[];
}

const Reports: React.FC<ReportsProps> = ({ type, transactions, accounts }) => {
  const [drillDownRow, setDrillDownRow] = useState<any>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);
  const [isEliminationActive, setIsEliminationActive] = useState(false);
  
  const REPORT_DATA = useMemo(() => {
    // В реальном приложении здесь будет логика фильтрации внутригрупповых оборотов
    const baseData = [
      { id: 'rev', category: 'Выручка Холдинга', value: 36000000, eliminatedValue: 28500000, trend: '+14%', items: [
        { name: 'ООО ИНОВАЦИИ ДВ', val: 18000000, status: 'ok' },
        { name: 'ООО РИВЕР СТРОЙ', val: 12000000, status: 'pending' },
        { name: 'ООО ХАБТОРГСТРОЙ', val: 6000000, status: 'ok' }
      ], spark: [12, 18, 15, 22, 28, 36]},
      { id: 'cogs', category: 'Себестоимость (COGS)', value: -22000000, eliminatedValue: -14500000, trend: '+8%', items: [
        { name: 'Закупки продуктов', val: -12000000, status: 'ok' },
        { name: 'Строительные материалы', val: -8000000, status: 'review' },
        { name: 'Логистика', val: -2000000, status: 'ok' }
      ], spark: [10, 12, 14, 18, 20, 22]},
      { id: 'labor', category: 'ФОТ и Налоги', value: -4500000, eliminatedValue: -4500000, trend: '-2%', items: [
        { name: 'Зарплаты штата', val: -3200000, status: 'ok' },
        { name: 'Налоговые отчисления', val: -1300000, status: 'ok' }
      ], spark: [4, 4.2, 4.1, 4.3, 4.4, 4.5]}
    ];

    return baseData.map(row => ({
      ...row,
      displayValue: isEliminationActive ? row.eliminatedValue : row.value
    }));
  }, [isEliminationActive]);

  const handleDeepAudit = async () => {
    setIsAuditing(true);
    setAuditResult(null);
    try {
      const result = await getDeepReportAudit(type.toUpperCase() as any, REPORT_DATA, transactions);
      setAuditResult(result);
    } catch (e) {
      setAuditResult("Ошибка глубокого аудита.");
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in pb-32">
      
      {/* Deep Drill-Down Layer */}
      <DrillDownLayer
        isOpen={!!drillDownRow}
        onClose={() => setDrillDownRow(null)}
        title={`Аудит статьи: ${drillDownRow?.category}`}
      >
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <GlassCard title="Распределение по узлам">
               <div className="space-y-6">
                  {drillDownRow?.items.map((item: any, i: number) => (
                     <div key={i} className="flex justify-between items-center p-8 bg-white/[0.03] rounded-[32px] border border-white/5 hover:border-ios-primary/40 transition-all">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 rounded-2xl bg-ios-primary/10 flex items-center justify-center text-ios-primary font-black">{i+1}</div>
                           <div>
                              <p className="text-xl font-bold">{item.name}</p>
                              <NeuralBadge color={item.status === 'ok' ? 'green' : 'amber'}>{item.status.toUpperCase()}</NeuralBadge>
                           </div>
                        </div>
                        <AmountDisplay value={item.val} size="md" />
                     </div>
                  ))}
               </div>
            </GlassCard>

            <div className="space-y-10">
               <GlassCard title="Neural Insights (32k Thinking)" className="bg-ios-primary/5 border-ios-primary/30">
                  <div className="p-10">
                     <BrainCircuit className="text-ios-primary mb-8" size={48} />
                     <p className="text-2xl font-medium italic leading-relaxed text-blue-100">
                        {auditResult || `«В ООО РИВЕР СТРОЙ обнаружены внутрихолдинговые обороты на сумму 7.5М ₽. При консолидации эти средства исключаются для показа реальной рыночной выручки холдинга.»`}
                     </p>
                  </div>
               </GlassCard>
            </div>
         </div>
      </DrillDownLayer>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
         <div>
            <h2 className="text-7xl font-black tracking-tighter mb-4">Neural Ledger <span className="text-ios-primary">2026</span></h2>
            <p className="text-xl text-ios-textSec italic opacity-70">Консолидированная отчетность с нейронным слоем валидации.</p>
         </div>
         
         <div className="flex flex-wrap gap-4 p-4 bg-white/[0.03] rounded-[40px] border border-white/10 backdrop-blur-3xl shadow-2xl items-center">
            {/* Elimination Toggle */}
            <div className="flex items-center gap-3 bg-black/40 px-6 py-3 rounded-full border border-white/5 mr-4">
               <span className="text-[10px] font-black uppercase tracking-widest text-ios-textSec">Elimination Mode</span>
               <button 
                  onClick={() => setIsEliminationActive(!isEliminationActive)}
                  className={`w-14 h-8 rounded-full transition-all relative p-1 ${isEliminationActive ? 'bg-ios-primary shadow-[0_0_15px_rgba(10,132,255,0.5)]' : 'bg-white/10'}`}
               >
                  <div className={`w-6 h-6 rounded-full bg-white transition-all transform ${isEliminationActive ? 'translate-x-6' : 'translate-x-0'}`} />
               </button>
               {isEliminationActive ? <Eye size={16} className="text-ios-primary" /> : <EyeOff size={16} className="text-ios-textSec" />}
            </div>

            <NeoButton variant="secondary" className="px-10 rounded-[28px] text-[10px]">Export {type.toUpperCase()}</NeoButton>
            <NeoButton 
              variant="mesmerize" 
              className={`px-10 rounded-[28px] shadow-ios-primary/20 ${isAuditing ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={handleDeepAudit}
            >
               {isAuditing ? <RefreshCw className="animate-spin" /> : <Wand2 size={20} />} 
               Deep AI Audit
            </NeoButton>
         </div>
      </div>

      {/* Интегрируем прогноз ТОЛЬКО для DDS */}
      {type === 'dds' && (
        <div className="animate-fade-in-up">
           <CashFlowForecast transactions={transactions} accounts={accounts} />
        </div>
      )}

      {/* Main Table with Visual Neural Feedback */}
      <GlassCard className="p-0 overflow-hidden shadow-4xl border-white/10 bg-black/40" title={`${type.toUpperCase()} Cognitive Matrix ${isEliminationActive ? '(Eliminated)' : '(Raw)'}`}>
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-white/5 text-[10px] font-black uppercase tracking-[0.6em] text-ios-textSec">
                  <th className="p-12 pl-24">Линия учета</th>
                  <th className="p-12 text-center">Динамика</th>
                  <th className="p-12 text-right">Консолидировано</th>
                  <th className="p-12 text-right">YoY Trend</th>
                  <th className="p-12 text-center">Neural Action</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
               {REPORT_DATA.map(row => (
                  <tr 
                    key={row.id} 
                    onClick={() => setDrillDownRow(row)}
                    className="group hover:bg-white/[0.06] transition-all cursor-pointer relative"
                  >
                     <td className="p-12 pl-24">
                        <div className="flex items-center gap-12">
                           <div className={`w-2.5 h-16 rounded-full shadow-lg ${row.id === 'rev' ? 'bg-ios-primary shadow-ios-primary/40' : 'bg-white/20'}`} />
                           <div>
                              <p className="text-3xl font-black tracking-tighter group-hover:text-ios-primary transition-colors">{row.category}</p>
                              <p className="text-[10px] font-black uppercase tracking-widest text-ios-textSec opacity-40 mt-1">{row.items.length} дочерних узлов</p>
                           </div>
                        </div>
                     </td>
                     <td className="p-12 w-48">
                        <div className="h-16 w-full opacity-40 group-hover:opacity-100 transition-opacity">
                           <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={row.spark.map((v, i) => ({ v, i }))}>
                                 <Area 
                                   type="monotone" 
                                   dataKey="v" 
                                   stroke={row.trend.startsWith('+') ? '#30D158' : '#FF453A'} 
                                   strokeWidth={4} 
                                   fill={row.trend.startsWith('+') ? 'rgba(48, 209, 88, 0.1)' : 'rgba(255, 69, 58, 0.1)'} 
                                 />
                              </AreaChart>
                           </ResponsiveContainer>
                        </div>
                     </td>
                     <td className="p-12 text-right">
                        <AmountDisplay value={row.displayValue} size="md" colored={false} />
                        {isEliminationActive && row.value !== row.eliminatedValue && (
                           <p className="text-[9px] text-ios-warning font-black uppercase mt-1">−{(row.value - row.eliminatedValue).toLocaleString()} Offset</p>
                        )}
                     </td>
                     <td className="p-12 text-right">
                        <div className={`inline-flex items-center gap-3 px-8 py-3 rounded-full font-black text-xs ${row.trend.startsWith('+') ? 'text-ios-success bg-ios-success/10 border border-ios-success/20' : 'text-ios-danger bg-ios-danger/10 border border-ios-danger/20'}`}>
                           {row.trend} {row.trend.startsWith('+') ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                        </div>
                     </td>
                     <td className="p-12">
                        <div className="flex justify-center">
                           <button className="p-6 bg-white/5 rounded-[32px] group-hover:bg-ios-primary group-hover:text-white group-hover:shadow-[0_0_20px_rgba(10,132,255,0.4)] transition-all">
                              <ChevronRight size={32} />
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </GlassCard>
    </div>
  );
};

export default Reports;
