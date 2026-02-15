
import React from 'react';
import { X, ChevronLeft, Info, Zap, ShieldCheck, BrainCircuit, TrendingUp, ChevronDown, Check } from 'lucide-react';

export const NeuralBadge: React.FC<{ children: React.ReactNode; color?: 'blue' | 'green' | 'red' | 'amber' | 'purple' }> = ({ children, color = 'blue' }) => {
  const colors = {
    blue: 'bg-ios-primary/10 text-ios-primary border-ios-primary/20 shadow-[0_0_15px_rgba(10,132,255,0.2)]',
    green: 'bg-ios-success/10 text-ios-success border-ios-success/20 shadow-[0_0_15px_rgba(48,209,88,0.2)]',
    red: 'bg-ios-danger/10 text-ios-danger border-ios-danger/20 shadow-[0_0_15px_rgba(255,69,58,0.2)]',
    amber: 'bg-ios-warning/10 text-ios-warning border-ios-warning/20 shadow-[0_0_15px_rgba(255,214,10,0.2)]',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]',
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${colors[color]} animate-pulse inline-flex items-center gap-2`}>
      <div className="w-1 h-1 rounded-full bg-current" />
      {children}
    </span>
  );
};

export const StatusOrb: React.FC<{ status: 'online' | 'offline' | 'busy' }> = ({ status }) => {
  const colors = {
    online: 'bg-ios-success shadow-[0_0_15px_#30D158]',
    offline: 'bg-ios-textSec opacity-40',
    busy: 'bg-ios-warning shadow-[0_0_15px_#FFD60A]',
  };
  return <div className={`w-2.5 h-2.5 rounded-full ${colors[status]} transition-all duration-500`} />;
};

// Added missing GlowCard component required by Dashboard.tsx
export const GlowCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  color?: 'blue' | 'green' | 'red' | 'amber' | 'purple' 
}> = ({ children, className = '', color = 'blue' }) => {
  const colors = {
    blue: 'border-ios-primary/20 bg-ios-primary/5 shadow-[0_0_40px_rgba(10,132,255,0.1)]',
    green: 'border-ios-success/20 bg-ios-success/5 shadow-[0_0_40px_rgba(48,209,88,0.1)]',
    red: 'border-ios-danger/20 bg-ios-danger/5 shadow-[0_0_40px_rgba(255,69,58,0.1)]',
    amber: 'border-ios-warning/20 bg-ios-warning/5 shadow-[0_0_40px_rgba(255,214,10,0.1)]',
    purple: 'border-purple-500/20 bg-purple-500/5 shadow-[0_0_40px_rgba(168,85,247,0.1)]',
  };
  
  return (
    <div className={`rounded-[48px] border p-10 transition-all duration-700 hover:shadow-2xl ${colors[color]} ${className}`}>
      {children}
    </div>
  );
};

export const GlassCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  title?: string;
  onClick?: () => void;
  noPadding?: boolean;
  variant?: 'default' | 'compact' | 'premium';
}> = ({ children, className = '', title, onClick, noPadding = false, variant = 'default' }) => (
  <div 
    onClick={onClick}
    className={`glass-card ${variant === 'compact' ? 'rounded-[32px]' : 'rounded-[56px]'} ${noPadding ? '' : 'p-10'} text-ios-text relative overflow-hidden group transition-all duration-[800ms] hover:border-white/20 hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)] ${className} ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}`}
  >
    {title && (
      <div className="relative z-10 mb-8 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className={`w-1.5 h-6 ${variant === 'premium' ? 'bg-amber-500 shadow-[0_0_20px_#FFD60A]' : 'bg-ios-primary shadow-[0_0_20px_rgba(10,132,255,0.8)]'} rounded-full`} />
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-ios-textSec opacity-60">{title}</h3>
         </div>
         <Info size={14} className="text-ios-textSec opacity-20 group-hover:opacity-100 transition-opacity" />
      </div>
    )}
    <div className="relative z-10 h-full">
      {children}
    </div>
    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
  </div>
);

export const OrgSwitcher: React.FC<{ orgs: any[]; activeOrg: any; onSelect: (org: any) => void }> = ({ orgs, activeOrg, onSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all active:scale-95"
      >
        <div className="w-6 h-6 rounded-lg overflow-hidden border border-white/20">
          <div className="w-full h-full" style={{ backgroundColor: activeOrg?.color || '#0A84FF' }} />
        </div>
        <span className="text-xs font-black uppercase tracking-widest">{activeOrg?.name || 'Выбор организации'}</span>
        <ChevronDown size={14} className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-4 w-80 glass-card rounded-[32px] p-4 z-[100] border-white/10 shadow-4xl animate-fade-in">
          {orgs.map(org => (
            <button 
              key={org.id}
              onClick={() => { onSelect(org); setIsOpen(false); }}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-xl" style={{ backgroundColor: org.color }} />
                <div className="text-left">
                  <p className="text-sm font-black">{org.name}</p>
                  <p className="text-[8px] text-ios-textSec uppercase tracking-widest">{org.type}</p>
                </div>
              </div>
              {activeOrg?.id === org.id && <Check size={16} className="text-ios-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const NeoButton: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'danger' | 'mesmerize'; 
  className?: string 
}> = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseStyles = "px-10 py-5 rounded-[28px] font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-700 active:scale-95 flex items-center justify-center gap-4 relative overflow-hidden group shadow-xl";
  
  const variants = {
    primary: "bg-white text-black hover:bg-ios-primary hover:text-white border-transparent",
    secondary: "bg-white/5 text-white border border-white/10 backdrop-blur-4xl hover:bg-white/10",
    danger: "bg-ios-danger/10 text-ios-danger border border-ios-danger/20 hover:bg-ios-danger hover:text-white",
    mesmerize: "mesmerize-btn text-white border-none shadow-[0_0_50px_rgba(10,132,255,0.4)]"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      <span className="relative z-10 flex items-center gap-4">{children}</span>
    </button>
  );
};

export const AmountDisplay: React.FC<{ value: number; currency?: string; colored?: boolean; size?: 'sm' | 'md' | 'lg' | 'xl'; color?: string }> = ({ 
  value, 
  currency = '₽', 
  colored = true,
  size = 'md',
  color
}) => {
  const isPositive = value >= 0;
  const colorClass = color 
    ? (color === 'red' ? 'text-ios-danger' : color === 'green' ? 'text-ios-success' : color)
    : (colored 
        ? (isPositive ? 'text-ios-success' : 'text-ios-danger') 
        : 'text-ios-text');
    
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-xl',
    lg: 'text-4xl',
    xl: 'text-6xl lg:text-8xl'
  };

  return (
    <span className={`font-black tracking-tighter font-mono tabular-nums leading-none ${colorClass} ${sizeClasses[size]}`}>
      {value < 0 && '−'}{Math.abs(value).toLocaleString('ru-RU')}
      <span className="text-[0.45em] opacity-30 font-sans ml-2 uppercase tracking-widest">{currency}</span>
    </span>
  );
};

export const DrillDownLayer: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode 
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12 animate-fade-in">
       <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" onClick={onClose} />
       <div className="relative w-full max-w-7xl h-full bg-[#0c0c0e] rounded-[64px] border border-white/10 shadow-[0_0_150px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
          <div className="p-10 flex justify-between items-center border-b border-white/5">
             <div>
                <h2 className="text-3xl font-black tracking-tighter uppercase">{title}</h2>
             </div>
             <button onClick={onClose} className="p-4 hover:bg-white/10 rounded-2xl transition-all">
                <X size={24} />
             </button>
          </div>
          <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
             {children}
          </div>
       </div>
    </div>
  );
};
