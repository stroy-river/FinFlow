
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import AIAdvisor from './components/AIAdvisor';
import Accounts from './components/Accounts';
import Reports from './components/Reports';
import Calendar from './components/Calendar';
import Projects from './components/Projects';
import Settings from './components/Settings';
import Contractors from './components/Contractors';
import AdminPanel from './components/AdminPanel';
import Loans from './components/Loans';
import Budgeting from './components/Budgeting';
import PaymentHub from './components/PaymentHub';
import { GlassCard, NeoButton, OrgSwitcher } from './components/UI';
import { MOCK_TRANSACTIONS, MOCK_ACCOUNTS, MOCK_ORGS } from './constants';
import { Transaction, Account, UserRole, Organization } from './types';
import { LogOut, Shield, Zap, CreditCard, Apple, Lock, Globe, Bell, Search, Command, Users, Briefcase } from 'lucide-react';

const LoginScreen: React.FC<{ onLogin: (role: UserRole) => void }> = ({ onLogin }) => (
  <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
    <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[160px] animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[180px] animate-pulse delay-1000" />

    <GlassCard className="w-full max-w-lg p-12 z-10 flex flex-col items-center border-white/10 shadow-[0_0_120px_rgba(0,0,0,1)] backdrop-blur-4xl rounded-[48px]">
      <div className="w-24 h-24 rounded-[32px] bg-gradient-to-tr from-blue-600 to-indigo-800 mb-10 shadow-[0_0_60px_rgba(37,99,235,0.4)] flex items-center justify-center relative group">
         <div className="absolute inset-0 bg-white/20 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
         <Shield className="text-white relative z-10" size={48} />
      </div>
      
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black mb-2 tracking-tighter drop-shadow-2xl">FinFlow 2026</h1>
        <p className="text-ios-textSec text-[11px] uppercase tracking-[0.5em] font-black opacity-60">Digital Financial Sovereign</p>
      </div>
      
      <div className="w-full space-y-5">
        <NeoButton variant="mesmerize" className="w-full py-6 text-sm" onClick={() => onLogin('owner')}>
          Войти как Владелец
        </NeoButton>
        <button onClick={() => onLogin('accountant')} className="w-full flex items-center justify-center gap-4 bg-zinc-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest border border-white/10 hover:bg-zinc-800 transition-all active:scale-95 shadow-xl">
           <Briefcase size={22} className="text-blue-400" /> Войти как Бухгалтер
        </button>
        <div className="flex items-center gap-6 py-6">
           <div className="h-[1px] flex-1 bg-white/10" />
           <span className="text-[10px] text-ios-textSec uppercase font-black tracking-[0.3em]">авторизация</span>
           <div className="h-[1px] flex-1 bg-white/10" />
        </div>
        <button onClick={() => onLogin('admin')} className="w-full flex items-center justify-center gap-4 bg-white/5 text-ios-textSec py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
           <Globe size={18} /> SaaS Admin Gateway
        </button>
      </div>
      
      <div className="mt-12 flex items-center gap-3 text-[10px] text-ios-textSec uppercase font-black tracking-widest opacity-40">
        <Lock size={12} />
        Quantum-Secure Protocol v4.0.2
      </div>
    </GlassCard>
  </div>
);

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<UserRole>('owner');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeOrg, setActiveOrg] = useState<Organization>(MOCK_ORGS[0]);

  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS);

  useEffect(() => {
    const handleApiKeySelection = async () => {
      if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
         await window.aistudio.openSelectKey();
      }
    };
    handleApiKeySelection();
  }, []);

  const addTransaction = (newTrans: Transaction) => {
    setTransactions(prev => [newTrans, ...prev]);
    setAccounts(prev => prev.map(acc => {
      if (acc.name === newTrans.account) {
        return { ...acc, balance: acc.balance + (newTrans.type === 'INCOME' ? newTrans.amount : -newTrans.amount) };
      }
      return acc;
    }));
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const syncAccount = (accId: string) => {
    setAccounts(prev => prev.map(acc => acc.id === accId ? { ...acc, lastSync: 'Только что', balance: acc.balance + (Math.random() * 50000) } : acc));
  };

  const renderContent = () => {
    if (role === 'admin') return <AdminPanel tab={activeTab} />;
    
    const commonProps = { transactions, accounts, updateTransaction, addTransaction, syncAccount };
    
    switch (activeTab) {
      case 'dashboard': return <Dashboard {...commonProps} />;
      case 'transactions': return <Transactions {...commonProps} />;
      case 'payment_hub': return <PaymentHub accounts={accounts} addTransaction={addTransaction} />;
      case 'contractors': return <Contractors />;
      case 'loans': return <Loans />;
      case 'budget': return <Budgeting />;
      case 'advisor': return <AIAdvisor {...commonProps} />;
      case 'accounts': return <Accounts {...commonProps} />;
      case 'dds': return <Reports type="dds" {...commonProps} />;
      case 'pnl': return <Reports type="pnl" {...commonProps} />;
      case 'balance': return <Reports type="balance" {...commonProps} />;
      case 'calendar': return <Calendar {...commonProps} />;
      case 'projects': return <Projects />;
      case 'settings': return <Settings />;
      default: return <Dashboard {...commonProps} />;
    }
  };

  if (!isLoggedIn) {
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center">
                 <div className="relative mb-8">
                    <div className="w-20 h-20 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Zap className="text-blue-500 animate-pulse" size={32} />
                    </div>
                 </div>
                 <div className="text-blue-500 font-black text-[12px] animate-pulse uppercase tracking-[0.8em] ml-3">Initializing Session Node...</div>
            </div>
        )
    }
    return <LoginScreen onLogin={(selectedRole) => { 
      setLoading(true); 
      setRole(selectedRole);
      if (selectedRole === 'accountant') setActiveTab('payment_hub');
      setTimeout(() => { setIsLoggedIn(true); setLoading(false); }, 1500); 
    }} />;
  }

  return (
    <HashRouter>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-600/40 overflow-x-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={() => setIsLoggedIn(false)} role={role} />

        <main className="lg:pl-72 min-h-screen relative z-10 flex flex-col transition-all duration-700">
          <header className="h-24 flex items-center justify-between px-10 border-b border-white/5 backdrop-blur-4xl sticky top-0 z-[60] bg-black/20">
            <div className="flex items-center gap-8">
               <OrgSwitcher orgs={MOCK_ORGS} activeOrg={activeOrg} onSelect={setActiveOrg} />
               <div className="h-4 w-[1px] bg-white/10" />
               <div className="flex items-center gap-4 bg-white/5 px-6 py-2.5 rounded-full border border-white/5 cursor-pointer hover:bg-white/10 transition-all">
                  <Command size={14} className="text-ios-textSec" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-ios-textSec">Quick Search</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-white/10 text-[8px] font-bold">⌘ K</span>
               </div>
            </div>
            
            <div className="flex items-center gap-6">
              <button className="p-3 bg-white/5 rounded-full border border-white/5 text-ios-textSec hover:text-white transition-all relative">
                 <Bell size={20} />
                 <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-ios-danger rounded-full border-2 border-black" />
              </button>
              
              <div 
                className={`flex items-center gap-4 pl-4 pr-2 py-2 rounded-full border cursor-pointer transition-all hover:bg-white/5 active:scale-95 shadow-xl ${role === 'admin' ? 'border-amber-500/30 bg-amber-500/5' : role === 'accountant' ? 'border-blue-500/30 bg-blue-500/5' : 'border-white/10 bg-white/5'}`}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                 <div className="text-right hidden sm:block">
                   <p className="text-[11px] font-black tracking-tight">
                     {role === 'owner' ? 'Яхно С.В.' : role === 'accountant' ? 'Мария И. (Бух)' : 'Overseer'}
                   </p>
                   <p className="text-[8px] text-ios-textSec font-black uppercase tracking-widest opacity-50">
                     {role.toUpperCase()} • Lvl {role === 'owner' ? '5' : '4'} Access
                   </p>
                 </div>
                 <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                    <img src={role === 'accountant' ? "https://picsum.photos/80/80?seed=acc" : "https://picsum.photos/80/80?seed=owner"} alt="" className="w-full h-full object-cover" />
                 </div>
              </div>

              {showProfileMenu && (
                <div className="absolute top-20 right-10 w-72 glass-card rounded-[32px] p-4 z-[70] shadow-2xl animate-fade-in border-white/10">
                   <button onClick={() => { setRole(role === 'owner' ? 'accountant' : 'owner'); setShowProfileMenu(false); }} className="w-full text-left px-4 py-4 hover:bg-white/5 rounded-2xl flex items-center gap-4 transition-all group">
                      <Users size={20} className="text-ios-primary" />
                      <span className="text-[11px] font-black uppercase tracking-widest">Переключить роль</span>
                   </button>
                   <div className="h-[1px] bg-white/5 my-2 mx-2" />
                   <button onClick={() => setIsLoggedIn(false)} className="w-full text-left px-4 py-4 hover:bg-ios-danger/10 text-ios-danger rounded-2xl flex items-center gap-4 transition-all text-[11px] font-black uppercase tracking-widest">
                      <LogOut size={20} /> Terminate session
                   </button>
                </div>
              )}
            </div>
          </header>

          <div className="p-10 lg:p-12 w-full flex-1">
             <div className="mb-14 flex flex-col">
                <h2 className="text-6xl font-black tracking-tighter capitalize ios-gradient-text leading-tight">
                   {activeTab === 'dashboard' ? 'Decision Center' : activeTab.replace('_', ' ')}
                </h2>
                <div className="h-1.5 w-32 bg-ios-primary rounded-full mt-6 shadow-[0_0_20px_#0A84FF]" />
             </div>
            {renderContent()}
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
