
import React, { useState } from 'react';
import { GlassCard, NeoButton } from './UI';
import { MOCK_RULES, CATEGORIES, MOCK_PROJECTS } from '../constants';
import { Wand2, Plus, Play, Trash2, ShieldCheck, ChevronRight, Zap, Settings, History } from 'lucide-react';
import { AutomationRule } from '../types';

const Automation: React.FC = () => {
  const [rules, setRules] = useState<AutomationRule[]>(MOCK_RULES);
  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);

  return (
    <div className="flex h-[calc(100vh-160px)] gap-8 animate-fade-in relative">
      {/* Список правил */}
      <div className="flex-1 flex flex-col space-y-6 overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3">
              <Wand2 className="text-blue-500" size={32} />
              Neural Rules
            </h2>
            <p className="text-ios-textSec text-sm">Автоматизация разнесения операций холдинга</p>
          </div>
          <NeoButton onClick={() => {}} className="px-8 py-4">
            <Plus size={20} /> Создать правило
          </NeoButton>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {rules.map(rule => (
            <GlassCard 
              key={rule.id} 
              onClick={() => setSelectedRule(rule)}
              className={`cursor-pointer transition-all border hover:border-blue-500/30 ${selectedRule?.id === rule.id ? 'bg-blue-600/5 border-blue-500/40' : 'border-white/5'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${rule.isActive ? 'bg-blue-500/10 text-blue-400' : 'bg-white/5 text-ios-textSec'}`}>
                    <Zap size={24} fill={rule.isActive ? "currentColor" : "none"} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black tracking-tight">{rule.name}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[10px] uppercase font-black tracking-widest text-ios-textSec">
                        Использовано: <span className="text-blue-400">{rule.usageCount} раз</span>
                      </span>
                      <div className="h-1 w-1 rounded-full bg-white/20" />
                      <span className="text-[10px] uppercase font-black tracking-widest text-ios-textSec">
                        Приоритет: {rule.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                   <div className="text-right">
                      <p className="text-[10px] uppercase font-black text-ios-textSec mb-1">Действие</p>
                      <p className="text-sm font-bold text-ios-text/80">{rule.action.category}</p>
                   </div>
                   <ChevronRight size={20} className="text-ios-textSec" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Редактор правила (Inspector Style) */}
      <aside className={`w-[450px] transition-all duration-700 ${selectedRule ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
        <GlassCard className="h-full flex flex-col p-10 bg-black/40 border-white/10 backdrop-blur-4xl rounded-[48px] shadow-3xl">
          {selectedRule && (
            <>
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black tracking-tighter">Настройка правила</h3>
                <button onClick={() => setSelectedRule(null)} className="p-3 hover:bg-white/10 rounded-2xl">
                  <Settings size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-10 pr-2 custom-scrollbar">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-ios-textSec ml-2">Название</label>
                  <input 
                    type="text" 
                    className="w-full glass-input p-5 rounded-[24px] text-lg font-black" 
                    defaultValue={selectedRule.name} 
                  />
                </div>

                <div className="p-8 bg-white/5 rounded-[32px] border border-white/5 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck size={18} className="text-blue-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Условия срабатывания</span>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-xs text-ios-textSec font-medium">Если назначение платежа содержит:</p>
                    <input 
                      type="text" 
                      className="w-full glass-input p-4 rounded-2xl text-sm" 
                      defaultValue={selectedRule.condition.textContains} 
                    />
                  </div>
                </div>

                <div className="p-8 bg-blue-600/5 rounded-[32px] border border-blue-500/10 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Play size={18} className="text-emerald-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Авто-действие</span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <p className="text-xs text-ios-textSec font-medium">Назначить статью:</p>
                      <select className="w-full glass-input p-4 rounded-2xl text-sm bg-black appearance-none">
                        {CATEGORIES.map(c => <option key={c} value={c} selected={c === selectedRule.action.category}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-ios-textSec font-medium">Назначить проект:</p>
                      <select className="w-full glass-input p-4 rounded-2xl text-sm bg-black appearance-none">
                        <option value="">Не выбрано</option>
                        {MOCK_PROJECTS.map(p => <option key={p.id} value={p.id} selected={p.id === selectedRule.action.projectId}>{p.name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-white/5 rounded-[28px]">
                   <div className="flex items-center gap-4">
                      <History size={18} className="text-ios-textSec" />
                      <span className="text-sm font-bold">История авто-разноса</span>
                   </div>
                   <NeoButton variant="secondary" className="px-6 py-2 rounded-xl text-[10px]">Логи</NeoButton>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex gap-4 mt-8">
                <button className="flex-1 p-5 rounded-[24px] bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3">
                  <Trash2 size={18} /> Удалить
                </button>
                <NeoButton className="flex-[2] rounded-[24px] shadow-blue-500/30">Сохранить изменения</NeoButton>
              </div>
            </>
          )}
        </GlassCard>
      </aside>
    </div>
  );
};

export default Automation;
