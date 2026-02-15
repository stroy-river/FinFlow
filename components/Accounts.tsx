
import React, { useState, useEffect } from 'react';
import { GlassCard, NeoButton, AmountDisplay, DrillDownLayer, NeuralBadge } from './UI';
import { Account, Transaction } from '../types';
import { Plus, RefreshCw, Building2, Banknote, CreditCard, Zap, Calendar, Globe, Shield, ExternalLink, Cpu } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../constants';

interface AccountsProps {
  accounts: Account[];
  syncAccount: (accId: string) => void;
  transactions?: Transaction[];
}

const Accounts: React.FC<AccountsProps> = ({ accounts, syncAccount, transactions = MOCK_TRANSACTIONS }) => {
  const [localAccounts, setLocalAccounts] = useState<Account[]>(accounts);
  const [drillDownAccount, setDrillDownAccount] = useState<Account | null>(null);
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  useEffect(() => {
    setLocalAccounts(accounts);
  }, [accounts]);

  const getBankIcon = (acc: Account) => {
     if (acc.type === 'crypto') return <Cpu className="text-ios-warning" size={24} />;
     if (acc.type === 'cash') return <Banknote className="text-ios-success" size={24} />;
     if (acc.type === 'card') return <CreditCard className="text-ios-primary" size={24} />;
     return <Building2 className="text-ios-textSec" size={24} />;
  };

  const handleSyncAll = () => {
    setIsSyncingAll(true);
    setTimeout(() => setIsSyncingAll(false), 3000);
  };

  return (
    <div className="space-y-12 animate-fade-in pb-32">
      
      <DrillDownLayer
         isOpen={!!drillDownAccount}
         onClose={() => setDrillDownAccount(null)}
         title={`API Узел: ${drillDownAccount?.name}`}
      >
         <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               <GlassCard title="Safe Balance">
                  <AmountDisplay value={drillDownAccount?.balance || 0} size="lg" />
               </GlassCard>
               <GlassCard title="Type">
                  <div className="text-2xl font-black uppercase tracking-tighter text-white">
                    {drillDownAccount?.type === 'crypto' ? 'L2 Crypto Node' : 'Bank Gateway'}
                  </div>
               </GlassCard>
               <GlassCard title="Ledger">
                  <NeuralBadge color={drillDownAccount?.ledger === 'white' ? 'blue' : 'amber'}>
                    {drillDownAccount?.ledger === 'white' ? 'Official' : 'Management Only'}
                  </NeuralBadge>
               </GlassCard>
               <GlassCard title="Security">
                  <div className="flex items-center gap-3 text-ios-success font-black">
                    <Shield size={20} /> RSA-4096 Active
                  </div>
               </GlassCard>
            </div>
            
            <GlassCard title="Raw Ledger Feed" className="p-0 overflow-hidden">
                <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                   <table className="w-full text-left">
                      <thead className="bg-white/5 sticky top-0 z-10">
                         <tr className="text-[10px] font-black uppercase tracking-widest text-ios-textSec">
                            <th className="p-8">Hash / Date</th>
                            <th className="p-8">Description</th>
                            <th className="p-8 text-right">Amount</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                         {transactions.filter(t => t.account.includes(drillDownAccount?.name || '')).map(t => (
                            <tr key={t.id} className="hover:bg-white/5 transition-colors">
                               <td className="p-8 font-mono text-xs opacity-50">{t.id.substring(0,8)} • {t.date}</td>
                               <td className="p-8 text-sm font-medium">{t.description}</td>
                               <td className="p-8 text-right font-black"><AmountDisplay value={t.amount} size="sm" /></td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
            </GlassCard>
         </div>
      </DrillDownLayer>

      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-6xl font-black tracking-tighter">API Узлы</h2>
          <p className="text-ios-textSec text-xl italic opacity-70 mt-4">Прямые шлюзы к банковским и крипто-системам холдинга.</p>
        </div>
        <div className="flex gap-4">
           <NeoButton variant="secondary" onClick={handleSyncAll} className="rounded-[28px] px-10">
              <RefreshCw size={20} className={isSyncingAll ? 'animate-spin' : ''} /> Sync All Nodes
           </NeoButton>
           <NeoButton className="rounded-[28px] px-10 shadow-blue-500/30">
              <Plus size={20} /> Add Node
           </NeoButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        
        {/* Специальная карточка для USDT (Sovereign 2026 Style) */}
        <GlassCard 
          className="relative bg-gradient-to-br from-ios-warning/15 to-transparent border-ios-warning/20 group hover:scale-[1.02]"
          title="USDT Stablecoin Node"
          onClick={() => setDrillDownAccount({ id: 'crypto_1', name: 'USDT Treasury', balance: 45000, currency: 'USDT', type: 'crypto', ledger: 'black', orgId: 'org_pers' })}
        >
           <div className="flex justify-between items-start mb-12">
              <div className="p-6 bg-ios-warning/10 rounded-3xl text-ios-warning border border-ios-warning/20">
                 <Cpu size={40} className="animate-pulse" />
              </div>
              <div className="text-right">
                 <NeuralBadge color="amber">Management Ledger</NeuralBadge>
                 <p className="text-[10px] text-ios-warning font-black uppercase mt-4 tracking-widest">TRC-20 • Lvl 5 Secure</p>
              </div>
           </div>
           
           <div className="mt-auto">
              <AmountDisplay value={45000} currency="USDT" size="lg" colored={false} />
              <div className="flex items-center gap-3 mt-4 text-ios-textSec text-xs">
                 <Globe size={14} />
                 <span>≈ 4,252,500 ₽ (94.50 RUB/USDT)</span>
              </div>
           </div>
           
           <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
              <ExternalLink size={24} className="text-ios-warning" />
           </div>
        </GlassCard>

        {localAccounts.filter(a => a.type !== 'crypto').map(acc => (
          <GlassCard 
            key={acc.id} 
            onClick={() => setDrillDownAccount(acc)}
            className="flex flex-col min-h-[300px] border-white/5 hover:border-white/20 transition-all duration-700"
            title={acc.name}
          >
             <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 rounded-[28px] bg-white/5 flex items-center justify-center border border-white/10 shadow-2xl">
                   {getBankIcon(acc)}
                </div>
                <div className="flex flex-col items-end gap-2">
                   <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${acc.integrationStatus === 'connected' ? 'bg-ios-success animate-pulse' : 'bg-ios-danger'}`} />
                      <span className="text-[9px] font-black uppercase tracking-widest text-ios-textSec">API Active</span>
                   </div>
                   <p className="text-[8px] text-ios-textSec font-black opacity-30 uppercase tracking-widest">Last Sync: {acc.lastSync || 'Never'}</p>
                </div>
             </div>
             
             <div className="mt-auto">
                <AmountDisplay value={acc.balance} currency={acc.currency} size="lg" colored={false} />
                <div className="h-1.5 w-full bg-white/5 rounded-full mt-8 overflow-hidden">
                   <div className="h-full bg-ios-primary w-[40%] animate-shimmer" />
                </div>
             </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Accounts;
