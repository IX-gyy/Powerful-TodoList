import StatsCard from './StatsCard';
import ProgressChart from './ProgressChart';

interface StatsPanelProps {
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
  todayTasks: number;
  completionRate: number;
}

export default function StatsPanel({
  totalTasks,
  pendingTasks,
  completedTasks,
  todayTasks,
  completionRate,
}: StatsPanelProps) {
  return (
    <div className="space-y-4">
      {/* 统计卡片 */}
      <div className="grid grid-cols-2 gap-3">
        <StatsCard
          label="总任务"
          value={totalTasks}
          gradient="from-blue-400 to-purple-400"
        />
        <StatsCard
          label="待完成"
          value={pendingTasks}
          gradient="from-orange-400 to-yellow-400"
        />
        <StatsCard
          label="已完成"
          value={completedTasks}
          gradient="from-green-400 to-emerald-400"
        />
        <StatsCard
          label="今日任务"
          value={todayTasks}
          gradient="from-pink-400 to-rose-400"
        />
      </div>

      {/* 完成率环形图 */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4">
        <ProgressChart percentage={completionRate} totalTasks={totalTasks} />
      </div>
    </div>
  );
}
