import { useTaskStore } from '../store/taskStore';
import type { TaskCategory } from '../types';

const filters: (TaskCategory | '全部')[] = ['全部', '工作', '学习', '生活', '项目'];

export default function FilterBar() {
  const currentFilter = useTaskStore((state) => state.currentFilter);
  const setFilter = useTaskStore((state) => state.setFilter);

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setFilter(filter)}
          className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
            currentFilter === filter
              ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
