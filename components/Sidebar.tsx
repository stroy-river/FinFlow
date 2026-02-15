
import React from 'react';
import { NavItem, UserRole } from '../types';
import { 
  LayoutDashboard, ArrowRightLeft, PieChart, Wallet, Sparkles, 
  LogOut, BarChart3, Scale, CalendarDays, Briefcase,
  ShieldCheck, Users, Settings, Banknote, Contact2,
  HandCoins, Target, Wand2, Command, FileText, SendHorizontal
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  onLogout: () => void;
  role: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onLogout, role }) => {
  
  const NAV_ITEMS: NavItem[] = [
    { id: 'dashboard', label: 'Сводка', icon: <LayoutDashboard size={18} />, category: 'main' },
    { id: 'transactions', label: 'Операции', icon: <ArrowRightLeft size={18} />, category: 'main' },
    { id: 'payment_hub', label: 'Payment Hub', icon: <SendHorizontal size={18} />, category: 'accounting' },
    { id: 'advisor', label: 'Neural CFO', icon: <Sparkles size={18} />, category: 'main' },
    { id: 'dds', label: 'ДДС', icon: <BarChart3 size={18} />, category: 'reports' },
    { id: 'pnl', label: 'P&L', icon: <PieChart size={18} />, category: 'reports' },
    { id: 'balance', label: 'Баланс', icon: <Scale size={18} />, category: 'reports' },
    { id: 'calendar', label: 'Календарь', icon: <CalendarDays size={18} />, category: 'reports' },
    { id: 'contractors', label: 'Контрагенты', icon: <Contact2 size={18} />, category: 'directory' },
    { id: 'projects', label: 'Проекты', icon: <Briefcase size={18} />, category: 'main' },
    { id: 'accounts', label: 'API Узлы', icon: <Wallet size={18} />, category: 'main' },
    { id: 'settings', label: 'Конфиг', icon: <Settings size={18} />, category: 'main' }
  ];

  const filteredNavItems = NAV_ITEMS.filter(item => {
    if (role === 'accountant') {
      // Accountants focus on operations, payments and reports
      return ['dashboard', 'transactions', 'payment_hub', 'dds', 'pnl', 'contractors', 'accounts'].includes(item.id);
    }
    return true; // Owners and Admins see everything
  });

  const renderNavGroup = (items: NavItem[], label?: string) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-6">
        {label && <div className="px-8 mb-3 text-[8px] font-black text-ios-textSec uppercase tracking-[0.5em] opacity-40">{label}</div>}
        <div className="space-y-1 px-4">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-[18px] transition-all duration-500 relative group ${
                activeTab === item.id 
                ? 'bg-white/5 text-white shadow-lg border border-white/5' 
                : 'text-ios-textSec hover:text-white'
              }`}
            >
              <span className={`relative z-10 transition-all duration-500 ${activeTab === item.id ? 'text-ios-primary' : 'group-hover:scale-110'}`}>{item.icon}</span>
              <span className="relative z-10 font-black text-[10px] uppercase tracking-widest hidden lg:block">{item.label}</span>
              
              {activeTab === item.id && (
                <>
                   <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-ios-primary rounded-full shadow-[0_0_15px_rgba(10,132,255,0.8)]" />
                   <div className="absolute inset-0 bg-gradient-to-r from-ios-primary/5 to-transparent rounded-[18px]" />
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-24 lg:w-72 h-screen fixed left-0 top-0 flex flex-col border-r border-white/5 bg-black/60 backdrop-blur-4xl z-50 transition-all duration-700">
      <div className="p-8 mb-4">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-[14px] mesmerize-btn flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-black text-lg">F</span>
           </div>
           <div className="hidden lg:block">
              <span className="text-xl font-black tracking-tighter block leading-none">FinFlow</span>
              <span className="text-[7px] font-black uppercase tracking-[0.4em] text-ios-primary opacity-60">Sovereign 26</span>
           </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar pt-2">
        {renderNavGroup(filteredNavItems.filter(i => i.category === 'main'))}
        {renderNavGroup(filteredNavItems.filter(i => i.category === 'accounting'), 'Workflow')}
        {renderNavGroup(filteredNavItems.filter(i => i.category === 'reports'), 'Analytics')}
        {renderNavGroup(filteredNavItems.filter(i => i.category === 'directory'), 'Ledgers')}
      </nav>

      <div className="p-4 mt-auto">
         <button className="w-full flex items-center gap-4 px-5 py-4 rounded-[18px] text-ios-textSec hover:text-ios-danger hover:bg-ios-danger/10 transition-all font-black text-[10px] uppercase tracking-widest" onClick={onLogout}>
           <LogOut size={18} />
           <span className="hidden lg:block">Terminate</span>
         </button>
      </div>
    </div>
  );
};

export default Sidebar;
