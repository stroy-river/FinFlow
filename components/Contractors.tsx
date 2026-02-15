import React, { useState } from 'react';
import { GlassCard, NeoButton, AmountDisplay } from './UI';
import { MOCK_CONTRACTORS } from '../constants';
import { Contractor } from '../types';
import { Search, Plus, Filter, MoreHorizontal, UserCheck, UserMinus, Phone, Mail } from 'lucide-react';

const Contractors: React.FC = () => {
  const [contractors, setContractors] = useState<Contractor[]>(MOCK_CONTRACTORS);
  const [search, setSearch] = useState('');

  const filtered = contractors.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    (c.inn && c.inn.includes(search))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold">Контрагенты</h2>
           <p className="text-ios-textSec text-sm">Клиенты, поставщики и партнеры</p>
        </div>
        <div className="flex gap-3">
          <NeoButton variant="secondary"><Filter size={20} /> Фильтр</NeoButton>
          <NeoButton><Plus size={20} /> Контрагент</NeoButton>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ios-textSec" size={20} />
        <input 
          type="text" 
          placeholder="Поиск по названию или ИНН..." 
          className="w-full glass-input pl-12 pr-4 py-4 rounded-3xl text-ios-text bg-white/5 border-white/10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(c => (
          <GlassCard key={c.id} className="group hover:border-blue-500/30 transition-all duration-300">
             <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400">
                   <UserCheck size={24} />
                </div>
                <button className="p-2 text-ios-textSec hover:text-white transition-colors">
                   <MoreHorizontal size={20} />
                </button>
             </div>
             
             <h3 className="text-xl font-bold mb-1 truncate">{c.name}</h3>
             <p className="text-sm text-ios-textSec mb-4">ИНН: {c.inn || 'Не указан'}</p>
             
             <div className="bg-white/5 rounded-2xl p-4 mb-6">
                <p className="text-[10px] uppercase font-bold text-ios-textSec mb-1">Оборот по контрагенту</p>
                <div className="text-xl font-bold">
                   <AmountDisplay value={c.totalVolume} colored={false} />
                </div>
             </div>

             <div className="flex gap-2">
                <button className="flex-1 p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center">
                   <Phone size={16} />
                </button>
                <button className="flex-1 p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center">
                   <Mail size={16} />
                </button>
                <button className="flex-[3] text-sm font-medium bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-xl transition-all">
                   Все платежи
                </button>
             </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Contractors;