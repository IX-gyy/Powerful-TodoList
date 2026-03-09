import { useTaskStore } from '../store/taskStore';

export default function SearchBar() {
  const searchQuery = useTaskStore((state) => state.searchQuery);
  const setSearchQuery = useTaskStore((state) => state.setSearchQuery);

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="搜索任务..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-sm text-[#0a0a0a]"
      />
    </div>
  );
}
