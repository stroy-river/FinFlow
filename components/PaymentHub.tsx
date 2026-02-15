
import React, { useState, useMemo } from 'react';
import { GlassCard, NeoButton, AmountDisplay, NeuralBadge, DrillDownLayer } from './UI';
import { Invoice, Account, Transaction, TransactionType } from '../types';
import { MOCK_INVOICES, MOCK_CONTRACTORS } from '../constants';
import { 
  FileText, SendHorizontal, CheckCircle2, Clock, AlertCircle, 
  Landmark, ShieldCheck, ChevronRight, Zap, RefreshCw, Eye, ExternalLink, Cpu
} from 'lucide-react';

interface PaymentHubProps {
  accounts: Account[];
  addTransaction: (trans: Transaction) => void;
}

const PaymentHub: React.FC<PaymentHubProps> = ({ accounts, addTransaction }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeBank, setActiveBank] = useState(accounts[0]?.id);

  const pendingCount = invoices.filter(i => i.status === 'unpaid').length;

  const handleAuthorize = async (invoice: Invoice) => {
    setIsProcessing(true);
    // Simulate API logic: sending to bank gateway
    setTimeout(() => {
      const bankAcc = accounts.find(a => a.id === activeBank);
      
      // Update local invoice state
      setInvoices(prev => prev.map(inv => 
        inv.id === invoice.id ? { ...inv, status: 'paid' } : inv
      ));

      // Create a real transaction based on the invoice
      if (bankAcc) {
        addTransaction({
          id: `t-pay-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          amount: invoice.amount,
          currency: invoice.currency,
          type: TransactionType.EXPENSE,
          category: 'Оплата поставщику',
          description: `API PAY: ${invoice.description}`,
          account: bankAcc.name,
          orgId: bankAcc.orgId,
          status: 'completed',
          activityType: 'operating',
          invoiceId: invoice.id
        });
      }

      setIsProcessing(false);
      setSelectedInvoice(null);
    }, 2500);
  };

  return (
    <div className="space-y-12 animate-fade-in pb-40">
       
       {/* Auth Modal / DrillDown */}
       <DrillDownLayer 
         isOpen={!!selectedInvoice} 
         onClose={() => setSelectedInvoice(null)} 
         title="Авторизация платежа API"
       >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
             <div className="space-y-8">
                <GlassCard title="Параметры платежного поручения">
                   <div className="space-y-6">
                      <div className="flex justify-between items-end">
                         <p className="text-[10px] font-black uppercase text-ios-textSec">Сумма к списанию</p>
                         <AmountDisplay value={selectedInvoice?.amount || 0} size="lg" />
                      </div>
                      <div className="h-[1px] bg-white/5" />
                      <div className="space-y-4">
                         <div className="flex justify-between">
                            <span className="text-xs text-ios-textSec">Получатель:</span>
                            <span className="text-xs font-bold">{MOCK_CONTRACTORS.find(c => c.id === selectedInvoice?.contractorId)?.name}</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-xs text-ios-textSec">Основание:</span>
                            <span className="text-xs font-bold text-right max-w-[200px]">{selectedInvoice?.description}</span>
                         </div>
                      </div>
                   </div>
                </GlassCard>

                <GlassCard title="Выбор шлюза (API Node)">
                   <div className="space-y-4">
                      {accounts.filter(a => a.type === 'bank').map(acc => (
                         <div 
                           key={acc.id}
                           onClick={() => setActiveBank(acc.id)}
                           className={`p-6 rounded-[28px] border transition-all cursor-pointer flex justify-between items-center ${activeBank === acc.id ? 'bg-ios-primary/10 border-ios-primary shadow-lg shadow-ios-primary/20' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                         >
                            <div className="flex items-center gap-4">
                               <Landmark size={20} className={activeBank === acc.id ? 'text-ios-primary' : 'text-ios-textSec'} />
                               <div>
                                  <p className="text-sm font-bold">{acc.name}</p>
                                  <p className="text-[10px] font-black uppercase text-ios-textSec">Balance: {acc.balance.toLocaleString()} {acc.currency}</p>
                               </div>
                            </div>
                            {activeBank === acc.id && <CheckCircle2 size={20} className="text-ios-primary" />}
                         </div>
                      ))}
                   </div>
                </GlassCard>
             </div>

             <div className="flex flex-col h-full">
                <GlassCard className="flex-1 bg-black/40 border-ios-primary/20 flex flex-col justify-center items-center text-center p-12">
                   {isProcessing ? (
                     <div className="space-y-8 flex flex-col items-center">
                        <div className="relative">
                           <Cpu className="text-ios-primary animate-spin-slow" size={80} />
                           <Zap className="absolute inset-0 m-auto text-white animate-pulse" size={40} />
                        </div>
                        <div>
                           <h3 className="text-2xl font-black tracking-tighter mb-2">Отправка в банк...</h3>
                           <p className="text-xs text-ios-textSec uppercase tracking-widest font-black animate-pulse">RSA-4096 Encryption Active</p>
                        </div>
                        <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-ios-primary animate-shimmer" />
                        </div>
                     </div>
                   ) : (
                     <div className="space-y-10">
                        <div className="w-24 h-24 bg-ios-primary/10 rounded-[32px] flex items-center justify-center mx-auto border border-ios-primary/20">
                           <ShieldCheck className="text-ios-primary" size={48} />
                        </div>
                        <div>
                           <h3 className="text-3xl font-black tracking-tighter mb-4">Подтвердите транзакцию</h3>
                           <p className="text-sm text-ios-textSec leading-relaxed">
                              Платежное поручение будет сформировано автоматически и отправлено через прямой API-канал. 
                              Средства будут списаны моментально.
                           </p>
                        </div>
                        <div className="pt-10 flex flex-col gap-4">
                           <NeoButton 
                             variant="mesmerize" 
                             className="w-full py-7" 
                             onClick={() => selectedInvoice && handleAuthorize(selectedInvoice)}
                           >
                             Отправить API платеж
                           </NeoButton>
                           <button onClick={() => setSelectedInvoice(null)} className="text-xs font-black uppercase tracking-widest text-ios-textSec hover:text-white transition-all">Отмена</button>
                        </div>
                     </div>
                   )}
                </GlassCard>
             </div>
          </div>
       </DrillDownLayer>

       <div className="flex justify-between items-end">
          <div>
             <h2 className="text-7xl font-black tracking-tighter mb-4">Payment <span className="text-ios-primary">Hub</span></h2>
             <p className="text-xl text-ios-textSec italic opacity-70">Автоматизация исходящих платежей и API-шлюзов.</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white/5 p-4 rounded-[32px] border border-white/10 flex items-center gap-6">
                <div>
                   <p className="text-[10px] font-black uppercase text-ios-textSec mb-1">К оплате сегодня</p>
                   <p className="text-2xl font-black">{pendingCount} счетов</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-ios-danger/10 flex items-center justify-center text-ios-danger animate-pulse">
                   <Clock size={24} />
                </div>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          
          <div className="xl:col-span-2 space-y-8">
             <h3 className="text-sm font-black uppercase tracking-widest text-ios-textSec ml-4">Реестр входящих счетов</h3>
             <div className="space-y-4">
                {invoices.map(inv => (
                   <GlassCard 
                     key={inv.id} 
                     className={`border-white/5 hover:border-white/20 group transition-all duration-500 ${inv.status === 'paid' ? 'opacity-50' : ''}`}
                     onClick={() => inv.status !== 'paid' && setSelectedInvoice(inv)}
                   >
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-6">
                            <div className={`w-16 h-16 rounded-[28px] flex items-center justify-center border ${inv.status === 'paid' ? 'bg-ios-success/10 text-ios-success border-ios-success/20' : 'bg-white/5 text-ios-primary border-white/10'}`}>
                               {inv.status === 'paid' ? <CheckCircle2 size={28} /> : <FileText size={28} />}
                            </div>
                            <div>
                               <h4 className="text-xl font-black tracking-tight">{inv.description}</h4>
                               <div className="flex items-center gap-4 mt-2">
                                  <NeuralBadge color={inv.status === 'paid' ? 'green' : 'amber'}>
                                     {inv.status === 'paid' ? 'Исполнен' : 'Ожидает оплаты'}
                                  </NeuralBadge>
                                  <span className="text-[10px] font-black uppercase text-ios-textSec">Срок: {inv.dueDate}</span>
                               </div>
                            </div>
                         </div>
                         <div className="flex items-center gap-10">
                            <div className="text-right">
                               <AmountDisplay value={inv.amount} size="md" colored={false} />
                               <p className="text-[9px] font-black uppercase text-ios-textSec tracking-widest mt-1">VAT Included</p>
                            </div>
                            <ChevronRight size={24} className="text-ios-textSec opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                         </div>
                      </div>
                   </GlassCard>
                ))}
             </div>
          </div>

          <div className="space-y-8">
             <h3 className="text-sm font-black uppercase tracking-widest text-ios-textSec ml-4">Статус API Шлюзов</h3>
             <div className="space-y-4">
                {accounts.filter(a => a.type === 'bank').map(acc => (
                   <GlassCard key={acc.id} className="bg-black/20 border-white/5">
                      <div className="flex justify-between items-start mb-6">
                         <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                               <Landmark size={18} className="text-ios-primary" />
                            </div>
                            <span className="text-sm font-bold">{acc.name}</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-ios-success animate-pulse" />
                            <span className="text-[9px] font-black uppercase text-ios-success">Gateway Live</span>
                         </div>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-ios-primary animate-shimmer" style={{ width: '85%' }} />
                      </div>
                      <div className="mt-6 flex justify-between items-center">
                         <p className="text-[9px] font-black uppercase text-ios-textSec">Last Session: 14:02</p>
                         <button className="text-[9px] font-black uppercase text-ios-primary hover:underline">View Logs</button>
                      </div>
                   </GlassCard>
                ))}
                
                <GlassCard className="bg-ios-primary/10 border-ios-primary/30">
                   <div className="flex items-center gap-4 mb-4">
                      <Zap size={24} className="text-ios-primary animate-pulse" />
                      <h4 className="text-sm font-black uppercase tracking-widest">Neural Priority</h4>
                   </div>
                   <p className="text-xs text-ios-textSec leading-relaxed">
                      AI обнаружил 2 счета с истекающим сроком сегодня. Рекомендуется использовать шлюз "ИНОВАЦИИ ДВ Сбер" для минимизации комиссии.
                   </p>
                </GlassCard>
             </div>
          </div>

       </div>
    </div>
  );
};

export default PaymentHub;
