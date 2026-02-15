
import React, { useState } from 'react';
import { GlassCard, NeoButton, NeuralBadge } from './UI';
import { runScenarioSimulation } from '../services/geminiService';
import { Transaction, Account } from '../types';
import { Play, Zap, ShieldAlert, TrendingUp, Cpu, Network, Sparkles, AlertTriangle } from 'lucide-react';

const ScenarioPlanner: React.FC<{ transactions: Transaction[]; accounts: Account[] }> = ({ transactions, accounts }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const scenarios = [
    { id: 'vvo_delay', label: 'Задержка ФКУ ОСК ВВО (60д)', icon: <ShieldAlert size={18} />, color: 'red' },
    { id: 'usdt_pump', label: 'Курс USDT > 110 ₽', icon: <Zap size={18} />, color: 'amber' },
    { id: 'tax_audit', label: 'Налоговая проверка Q3', icon: <AlertTriangle size={18} />, color: 'red' },
    { id: 'div_payout', label: 'Вывод 15М ₽ дивидендов', icon: <TrendingUp size={18} />, color: 'blue' },
  ];

  const handleRun = async (scenario: string) => {
    setLoading(true);
    setActiveScenario(scenario);
    try {
      const res = await runScenarioSimulation(scenario, transactions, accounts);
      setResult(res);
    } catch (e) {
      setResult("Simulation error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {scenarios.map((s) => (
          <GlassCard 
            key={s.id} 
            onClick={() => handleRun(s.label)}
            className={`p-8 hover:scale-[1.05] transition-all cursor-pointer border-white/5 ${activeScenario === s.label ? 'border-ios-primary/50 bg-ios-primary/5' : ''}`}
          >
            <div className={`p-4 rounded-2xl mb-6 inline-block bg-white/5 ${s.color === 'red' ? 'text-ios-danger' : s.color === 'amber' ? 'text-ios-warning' : 'text-ios-primary'}`}>
              {s.icon}
            </div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white leading-relaxed">{s.label}</h4>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-[8px] font-black text-ios-textSec uppercase">Neural Complexity: High</span>
              <Play size={12} className="text-ios-primary" />
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="min-h-[400px] bg-black/40 border-ios-primary/10 overflow-hidden relative" title="Quantum Simulation Output">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8">
            <div className="relative">
              <Cpu className="text-ios-primary animate-spin-slow" size={64} />
              <Network className="absolute inset-0 text-white animate-pulse" size={64} />
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl font-black tracking-tighter animate-pulse">Running Monte Carlo Simulations...</p>
              <p className="text-[10px] text-ios-textSec uppercase tracking-[0.4em]">Gemini 3 Pro Thinking Engine (32,768 Logic Tokens)</p>
            </div>
          </div>
        ) : result ? (
          <div className="prose prose-invert max-w-none animate-fade-in">
             <div className="flex items-center gap-4 mb-8">
                <Sparkles className="text-ios-primary" size={24} />
                <NeuralBadge color="blue">Silicon Valley Simulation Result</NeuralBadge>
             </div>
             <div className="text-lg leading-relaxed whitespace-pre-wrap font-medium text-blue-50/90">
                {result}
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-20 py-20">
            <Sparkles size={80} className="mb-6" />
            <p className="text-2xl font-black uppercase tracking-[0.5em]">Select a scenario to start</p>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default ScenarioPlanner;
