
import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES, MOCK_ACCOUNTS } from '../constants';
import { GlassCard, NeoButton, AmountDisplay, NeuralBadge } from './UI';
import { 
  Plus, Search, Filter, X, Save, Sparkles, Check, Briefcase, Landmark, Calendar, 
  ArrowRightLeft, History, ChevronRight, Link2, AlertCircle, CheckCheck, Trash2, Split, Shield, Info, BrainCircuit, Loader2, MousePointer2, MoreHorizontal
} from 'lucide-react';
import { Transaction, TransactionType } from '../types';
import { suggestMatching } from '../services/geminiService';

interface TransactionsProps {
  transactions: Transaction[];
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  addTransaction: (newTrans: Transaction) => void;
}

const Transactions: React.FC<TransactionsProps> = ({ transactions, updateTransaction, addTransaction }) => {
  const [filter, setFilter] = useState('');
  const [selectedTrans, setSelectedTrans] = useState<Transaction | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'all' | 'unclassified' | 'verified' | 'excluded'>('all');
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  
  // Simulation of cursor-based pagination
  const [limit, setLimit] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filtered = useMemo(() => {
    let list = transactions.filter(t => 
      t.description.toLowerCase().includes(filter.toLowerCase()) || 
      t.category.toLowerCase().includes(filter.toLowerCase())
    );
    if (activeTab === 'unclassified') list = list.filter(t => t.status === 'pending');
    if (activeTab === 'excluded') list = list.filter(t => t.ledger === 'black');
    return list.slice(0, limit);
  }, [transactions, filter, activeTab, limit]);

  // Grouping by date (Commercial standard)
  const groupedByDate = useMemo(() => {
    const groups: Record<string, Transaction[]> = {};
    filtered.forEach(t => {
      const date = t.date;
      if (!groups[date]) groups[date] = [];
      groups[date].push(t);
    });
    return Object.entries(groups).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
  }, [filtered]);

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const loadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setLimit(prev => prev + 20);
      setIsLoadingMore(false);
    }, 800);
  };

  useEffect(() => {
    if (selectedTrans) {
      const fetchAi = async () => {
        setIsSuggesting(true);
        setAiSuggestion(null);
        try {
          const res = await suggestMatching(selectedTrans, transactions);
          setAiSuggestion(res);
        } catch (e) {
          setAiSuggestion("Neural core failure.");
        } finally {
          setIsSuggesting(false);
        }
      };
      fetchAi();
    }
  }, [selectedTrans?.id]);

  return (
    <div className="flex h-[calc(100vh-180px)] gap-10 animate-fade-in relative">
      
      {/* Main Grid View */}
      <div className={`flex-1 flex flex-col transition-all duration-700 ${selectedTrans ? 'mr-[550px]' : ''}`}>
        
        {/* Advanced Toolbar */}
        <div className="flex items-center justify-between mb-10 bg-white/[0.03] p-4 rounded-[40px] border border-white/5 backdrop-blur-3xl">
           <div className="flex items-center gap-2">
              {[
                { id: 'all', label: 'Реестр' },
                { id: 'unclassified', label: 'Неразнесено', count: transactions.filter(t => t.status === 'pending').length },
                { id: 'verified', label: 'Проверено' },
                { id: 'excluded', label: 'Исключено' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-8 py-3.5 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab.id ? 'bg-white text-black shadow-2xl scale-105' : 'text-ios-textSec hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label} {tab.count ? <span className="bg-ios-danger text-white px-2 py-0.5 rounded-lg text-[8px]">{tab.count}</span> : null}
                </button>
              ))}
           </div>

           <div className="flex items-center gap-6 pr-4">
              <div className="relative w-64 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-ios-textSec" size={16} />
                <input 
                  type="text" 
                  placeholder="Поиск по архиву..." 
                  className="w-full bg-white/5 border border-white/10 pl-14 pr-6 py-3.5 rounded-full text-xs font-bold outline-none focus:border-ios-primary/50 transition-all"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
              <NeoButton className="p-3.5 rounded-2xl bg-ios-primary text-white"><Plus size={20}/></NeoButton>
           </div>
        </div>

        {/* Mass Actions Bar (Visible when items selected) */}
        {selectedIds.size > 0 && (
          <div className="mb-8 flex items-center justify-between bg-ios-primary/10 border border-ios-primary/20 p-6 rounded-[32px] animate-fade-in">
             <div className="flex items-center gap-6">
                <p className="text-xs font-black uppercase tracking-widest">Выбрано: <span className="text-ios-primary">{selectedIds.size}</span></p>
                <div className="h-6 w-[1px] bg-ios-primary/20" />
                <div className="flex gap-4">
                   <button className="text-[10px] font-black uppercase tracking-widest hover:text-ios-primary transition-colors flex items-center gap-2">
                      <Briefcase size={14}/> Назначить проект
                   </button>
                   <button className="text-[10px] font-black uppercase tracking-widest hover:text-ios-primary transition-colors flex items-center gap-2">
                      <Split size={14}/> Разделить
                   </button>
                   <button className="text-[10px] font-black uppercase tracking-widest text-ios-danger hover:opacity-70 transition-colors flex items-center gap-2">
                      <Trash2 size={14}/> Исключить
                   </button>
                </div>
             </div>
             <button onClick={() => setSelectedIds(new Set())} className="text-[10px] font-black uppercase opacity-40 hover:opacity-100">Отмена</button>
          </div>
        )}

        {/* Virtualized List Container */}
        <GlassCard className="flex-1 p-0 overflow-hidden flex flex-col shadow-4xl rounded-[48px] border-white/5 bg-black/20">
           <div className="overflow-y-auto flex-1 custom-scrollbar">
              <table className="w-full text-left border-separate border-spacing-0">
                 <thead className="sticky top-0 z-20 bg-black/80 backdrop-blur-5xl">
                    <tr className="text-[9px] font-black uppercase tracking-[0.4em] text-ios-textSec">
                       <th className="p-8 w-20 border-b border-white/5">
                          <div 
                            onClick={() => setSelectedIds(selectedIds.size === filtered.length ? new Set() : new Set(filtered.map(t => t.id)))}
                            className="w-8 h-8 rounded-xl border-2 border-white/10 flex items-center justify-center cursor-pointer hover:border-ios-primary"
                          >
                             {selectedIds.size === filtered.length && <CheckCheck size={16} className="text-ios-primary" />}
                          </div>
                       </th>
                       <th className="p-8 border-b border-white/5">Транзакция</th>
                       <th className="p-8 border-b border-white/5">Сумма</th>
                       <th className="p-8 border-b border-white/5">Аналитика</th>
                       <th className="p-8 border-b border-white/5">Узел</th>
                       <th className="p-8 text-center border-b border-white/5">Match</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/[0.03]">
                    {groupedByDate.map(([date, items]) => (
                       <React.Fragment key={date}>
                          <tr className="bg-white/5 backdrop-blur-xl">
                             <td colSpan={6} className="p-4 pl-12">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-ios-textSec opacity-60">
                                   {new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                             </td>
                          </tr>
                          {items.map(t => (
                             <tr 
                               key={t.id} 
                               onClick={() => setSelectedTrans({ ...t })}
                               className={`group transition-all duration-300 cursor-pointer hover:bg-white/[0.06] ${selectedTrans?.id === t.id ? 'bg-ios-primary/[0.06] shadow-inner' : ''} ${selectedIds.has(t.id) ? 'bg-ios-primary/10' : ''}`}
                             >
                                <td className="p-8 text-center" onClick={e => e.stopPropagation()}>
                                   <div 
                                     onClick={(e) => toggleSelect(t.id, e)}
                                     className={`w-8 h-8 rounded-xl border-2 transition-all flex items-center justify-center ${selectedIds.has(t.id) ? 'bg-ios-primary border-ios-primary text-white' : 'border-white/10 hover:border-ios-primary'}`}
                                   >
                                      {selectedIds.has(t.id) && <Check size={14}/>}
                                   </div>
                                </td>
                                <td className="p-8 max-w-sm">
                                   <p className="text-sm font-bold text-white mb-1 truncate">{t.description}</p>
                                   <div className="flex items-center gap-3">
                                      <NeuralBadge color={t.ledger === 'white' ? 'blue' : 'amber'}>{t.ledger || 'White'}</NeuralBadge>
                                      <span className="text-[8px] font-black uppercase text-ios-textSec opacity-40">UUID: {t.id.split('-')[0]}</span>
                                   </div>
                                </td>
                                <td className="p-8">
                                   <AmountDisplay value={t.amount} size="md" />
                                </td>
                                <td className="p-8">
                                   <div className="space-y-1">
                                      <p className="text-xs font-black text-white">{t.category}</p>
                                      <p className="text-[9px] text-ios-textSec uppercase font-black opacity-40 tracking-widest">Проект: Не указан</p>
                                   </div>
                                </td>
                                <td className="p-8">
                                   <div className="flex items-center gap-3">
                                      <div className="p-2 bg-white/5 rounded-lg"><Landmark size={14} className="text-ios-textSec" /></div>
                                      <span className="text-[10px] font-black uppercase tracking-widest text-ios-textSec">{t.account}</span>
                                   </div>
                                </td>
                                <td className="p-8">
                                   <div className="flex justify-center">
                                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${t.isAutoCategorized ? 'bg-ios-success/10 border-ios-success/20 text-ios-success' : 'bg-white/5 border-white/10 text-ios-textSec opacity-20'}`}>
                                         <Sparkles size={16} />
                                      </div>
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </React.Fragment>
                    ))}
                    {/* Cursor Pagination Button */}
                    <tr>
                       <td colSpan={6} className="p-12 text-center">
                          <button 
                            onClick={loadMore}
                            disabled={isLoadingMore}
                            className="inline-flex items-center gap-4 px-12 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                          >
                             {isLoadingMore ? <Loader2 size={16} className="animate-spin text-ios-primary" /> : <MoreHorizontal size={16} />}
                             {isLoadingMore ? 'Синхронизация архива...' : 'Загрузить еще'}
                          </button>
                       </td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </GlassCard>
      </div>

      {/* Right Inspector: Details & AI Reasoning */}
      <aside className={`fixed top-32 right-12 bottom-12 w-[500px] z-[90] transition-all duration-[800ms] cubic-bezier(0.2, 0.8, 0.2, 1) transform ${selectedTrans ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0 pointer-events-none'}`}>
         <GlassCard className="h-full flex flex-col p-0 bg-black/90 border-white/10 backdrop-blur-5xl shadow-[0_0_120px_rgba(0,0,0,1)] rounded-[56px] overflow-hidden border-t-ios-primary/40">
            <div className="p-10 border-b border-white/5 flex justify-between items-center">
               <div>
                  <h3 className="text-3xl font-black tracking-tighter uppercase">Neural Inspector</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-ios-textSec opacity-40 mt-1">Audit Trail Active</p>
               </div>
               <button onClick={() => setSelectedTrans(null)} className="p-4 hover:bg-white/10 rounded-2xl transition-all">
                  <X size={24} />
               </button>
            </div>

            {selectedTrans && (
              <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                 {/* AI Rational Panel */}
                 <div className="p-8 bg-ios-primary/5 border border-ios-primary/20 rounded-[40px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                       <BrainCircuit size={24} className="text-ios-primary animate-pulse" />
                    </div>
                    <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-ios-primary mb-6">AI Cognitive Rationale</h4>
                    {isSuggesting ? (
                      <div className="space-y-4 animate-pulse">
                         <div className="h-4 w-full bg-white/5 rounded-full" />
                         <div className="h-4 w-3/4 bg-white/5 rounded-full" />
                         <p className="text-[8px] font-black uppercase text-ios-primary/60 italic">Deep Thinking (32k Tokens)...</p>
                      </div>
                    ) : (
                      <p className="text-sm font-medium leading-relaxed italic text-blue-100/90">
                         {aiSuggestion || "Select an operation for neural analysis."}
                      </p>
                    )}
                 </div>

                 <div className="space-y-8">
                    <div className="grid grid-cols-1 gap-6">
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-ios-textSec ml-4">Статус Workflow</label>
                          <div className="flex gap-2 p-1.5 bg-black/40 rounded-[24px] border border-white/5">
                             {['pending', 'ok', 'excluded'].map(st => (
                               <button 
                                 key={st}
                                 onClick={() => setSelectedTrans({...selectedTrans, status: st as any})}
                                 className={`flex-1 py-3 rounded-[18px] text-[9px] font-black uppercase tracking-widest transition-all ${selectedTrans.status === st ? 'bg-white text-black' : 'text-ios-textSec hover:text-white'}`}
                               >
                                 {st === 'pending' ? 'Разнести' : st === 'ok' ? 'Верно' : 'Скрыть'}
                               </button>
                             ))}
                          </div>
                       </div>

                       <div className="p-8 bg-white/[0.03] rounded-[40px] border border-white/5">
                          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-ios-textSec mb-6">Сумма Ledger</p>
                          <div className="flex items-end gap-3">
                             <input 
                               type="number" 
                               className="text-6xl font-black tracking-tighter bg-transparent outline-none w-full text-white" 
                               value={selectedTrans.amount}
                               onChange={(e) => setSelectedTrans({ ...selectedTrans, amount: parseFloat(e.target.value) || 0 })}
                             />
                             <span className="text-3xl font-black text-ios-textSec mb-2">{selectedTrans.currency}</span>
                          </div>
                       </div>

                       <div className="space-y-6">
                          <div className="space-y-3">
                             <label className="text-[9px] font-black uppercase tracking-widest text-ios-textSec ml-4">Статья учета</label>
                             <select className="w-full bg-white/5 border border-white/10 p-5 rounded-[28px] text-lg font-black outline-none appearance-none cursor-pointer">
                                {CATEGORIES.map(c => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
                             </select>
                          </div>
                          <div className="space-y-3">
                             <label className="text-[9px] font-black uppercase tracking-widest text-ios-textSec ml-4">Описание (Банковское)</label>
                             <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[28px] text-xs text-ios-textSec italic leading-relaxed">
                                {selectedTrans.description}
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            <div className="p-10 border-t border-white/5 mt-auto flex gap-4">
               <NeoButton variant="danger" className="w-20 rounded-[28px]" onClick={() => setSelectedTrans(null)}>
                  <Trash2 size={24} />
               </NeoButton>
               <NeoButton className="flex-1 rounded-[28px]" onClick={() => { if(selectedTrans) { updateTransaction(selectedTrans.id, selectedTrans); setSelectedTrans(null); } }}>
                  <Save size={20} /> Сохранить изменения
               </NeoButton>
            </div>
         </GlassCard>
      </aside>
    </div>
  );
};

export default Transactions;
