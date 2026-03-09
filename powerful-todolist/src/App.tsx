import { useTaskStore } from './store/taskStore';
import StatsPanel from './components/StatsPanel';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { isToday } from 'date-fns';

function App() {
  const tasks = useTaskStore((state) => state.tasks);

  // 计算统计数据
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const todayTasks = tasks.filter(
    (t) => t.dueDate && isToday(new Date(t.dueDate))
  ).length;
  const completionRate = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-[#f5f5f5] scroll-smooth">
      {/* 主容器 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* 顶部标题区域 */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Powerful-TodoList
          </h1>
          <p className="text-[#0a0a0a] opacity-70 mt-2 text-sm sm:text-base">高效管理每日任务</p>
        </header>

        {/* 左右结构主布局 */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧边栏：统计信息 */}
          <div className="lg:col-span-1">
            {/* 统计信息和完成率 */}
            <StatsPanel
              totalTasks={totalTasks}
              pendingTasks={pendingTasks}
              completedTasks={completedTasks}
              todayTasks={todayTasks}
              completionRate={completionRate}
            />
          </div>

          {/* 右侧主区域：添加新任务 + 任务列表 */}
          <div className="lg:col-span-3 space-y-6">
            {/* 添加新任务 */}
            <TaskForm />

            {/* 任务列表 */}
            <TaskList />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
