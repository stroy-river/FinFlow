import React from 'react';
import { GlassCard, AmountDisplay, NeoButton } from './UI';
import { MOCK_PROJECTS } from '../constants';
import { Briefcase, ArrowRight, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Projects: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Briefcase className="text-purple-400" />
              Проекты и Сделки
            </h2>
            <p className="text-ios-textSec text-sm">Рентабельность направлений и контроль бюджетов</p>
          </div>
          <NeoButton>Новый проект</NeoButton>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {MOCK_PROJECTS.map(project => {
             const margin = project.revenue - project.expenses;
             const marginPercent = project.revenue > 0 ? (margin / project.revenue) * 100 : 0;
             const data = [
                { name: 'Расходы', value: project.expenses, color: '#FF453A' },
                { name: 'Маржа', value: margin, color: '#30D158' },
             ];

             return (
               <GlassCard key={project.id} className="flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <span className="text-xs text-ios-textSec uppercase tracking-wider">{project.client}</span>
                        <h3 className="text-xl font-bold mt-1">{project.name}</h3>
                     </div>
                     <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${project.status === 'active' ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' : 'border-green-500/30 bg-green-500/10 text-green-400'}`}>
                        {project.status === 'active' ? 'В работе' : 'Завершен'}
                     </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                     <div className="p-3 bg-white/5 rounded-xl">
                        <p className="text-xs text-ios-textSec mb-1">Выручка</p>
                        <p className="text-lg font-bold"><AmountDisplay value={project.revenue} colored={false} /></p>
                     </div>
                     <div className="p-3 bg-white/5 rounded-xl">
                        <p className="text-xs text-ios-textSec mb-1">Расходы</p>
                        <p className="text-lg font-bold text-ios-text"><AmountDisplay value={project.expenses} colored={false} /></p>
                     </div>
                  </div>

                  {/* Chart */}
                  <div className="h-32 w-full flex items-center gap-4">
                     <div className="h-full w-32 relative">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                              <Pie data={data} innerRadius={25} outerRadius={35} paddingAngle={5} dataKey="value">
                                 {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                 ))}
                              </Pie>
                              <Tooltip contentStyle={{ backgroundColor: '#1c1c1e', borderRadius: '8px', border: 'none' }} itemStyle={{ color: '#fff' }} />
                           </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                           <span className="text-xs font-bold">{marginPercent.toFixed(0)}%</span>
                        </div>
                     </div>
                     <div className="flex-1 space-y-2">
                        <div className="flex justify-between text-sm">
                           <span className="text-ios-textSec">Маржинальность</span>
                           <span className="font-bold text-ios-success">{marginPercent.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                           <span className="text-ios-textSec">Прибыль</span>
                           <span className="font-bold text-ios-success">
                              <AmountDisplay value={margin} colored />
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center text-xs text-ios-textSec">
                     <div className="flex items-center gap-1">
                        <Clock size={12} />
                        Дедлайн: {project.deadline}
                     </div>
                     <button className="flex items-center gap-1 hover:text-white transition-colors">
                        Подробнее <ArrowRight size={12} />
                     </button>
                  </div>
               </GlassCard>
             );
          })}

          {/* Add New Project Card */}
          <button className="border-2 border-dashed border-white/10 rounded-[32px] p-6 flex flex-col items-center justify-center text-ios-textSec hover:border-purple-500/50 hover:text-purple-400 hover:bg-purple-500/5 transition-all duration-300 min-h-[300px]">
             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
               <Briefcase size={28} />
             </div>
             <span className="font-medium">Создать проект</span>
          </button>
       </div>
    </div>
  );
};

export default Projects;