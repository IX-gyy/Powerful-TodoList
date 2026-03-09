import { memo, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTaskStore } from '../store/taskStore';
import TaskItem from './TaskItem';
import FilterBar from './FilterBar';
import SearchBar from './SearchBar';
import TaskEditModal from './TaskEditModal';

const TaskList = memo(function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.currentFilter);
  const searchQuery = useTaskStore((state) => state.searchQuery);
  const setEditingTaskId = useTaskStore((state) => state.setEditingTaskId);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const deleteCompletedTasks = useTaskStore((state) => state.deleteCompletedTasks);

  // 计算已完成任务数量
  const completedCount = tasks.filter((t) => t.completed).length;

  // 确认弹窗状态
  const [showConfirm, setShowConfirm] = useState(false);

  // 过滤和搜索任务
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 按分类筛选
      if (filter !== '全部' && task.category !== filter) {
        return false;
      }

      // 按标题搜索（忽略大小写）
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const title = task.title.toLowerCase();
        if (!title.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [tasks, filter, searchQuery]);

  if (filteredTasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 border border-gray-100">
        <FilterBar />
        <div className="mt-4">
          <SearchBar />
        </div>
        <div className="mt-8 text-center">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-lg font-medium text-gray-700 mb-2">
            {tasks.length === 0
              ? '暂无任务，添加一个任务开始吧！'
              : '没有找到匹配的任务'}
          </p>
          {tasks.length === 0 && (
            <p className="text-sm text-gray-500 mt-1">
              点击上方"添加新任务"表单创建你的第一个任务
            </p>
          )}
        </div>
      </div>
    );
  }

  // 处理删除确认
  const handleDeleteConfirm = () => {
    setShowConfirm(true);
  };

  const handleDeleteCancel = () => {
    setShowConfirm(false);
  };

  const handleDeleteExecute = () => {
    deleteCompletedTasks();
    setShowConfirm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-100">
      {/* 筛选和搜索区域 */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <FilterBar />
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-full sm:w-48">
            <SearchBar />
          </div>
          {/* 一键删除已完成任务按钮 */}
          {completedCount > 0 && (
            <button
              onClick={handleDeleteConfirm}
              className="flex-shrink-0 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-400 to-orange-400 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap shadow-md hover:shadow-lg"
              title="删除所有已完成的任务"
            >
              删除已完成 ({completedCount})
            </button>
          )}
        </div>
      </div>

      {/* 任务列表 */}
      <div className="space-y-1">
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={setEditingTaskId}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* 编辑弹窗 */}
      <TaskEditModal />

      {/* 删除确认弹窗 */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            {/* 头部 */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-[#0a0a0a]">确认删除</h3>
            </div>

            {/* 内容 */}
            <div className="p-4">
              <p className="text-gray-700">
                确定要删除所有已完成的 {completedCount} 个任务吗？
              </p>
              <p className="text-sm text-gray-500 mt-2">
                此操作不可恢复，未完成的任务将保留。
              </p>
            </div>

            {/* 按钮 */}
            <div className="flex gap-3 p-4 border-t border-gray-200">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleDeleteExecute}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-400 to-orange-400 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default TaskList;
