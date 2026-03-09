import { useState, useEffect } from 'react';
import { useTaskStore } from '../store/taskStore';
import type { TaskCategory, TaskPriority } from '../types';

export default function TaskEditModal() {
  const editingTaskId = useTaskStore((state) => state.editingTaskId);
  const setEditingTaskId = useTaskStore((state) => state.setEditingTaskId);
  const updateTask = useTaskStore((state) => state.updateTask);
  const tasks = useTaskStore((state) => state.tasks);

  // 找到当前编辑的任务
  const task = tasks.find((t) => t.id === editingTaskId);

  // 表单状态
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('工作');
  const [priority, setPriority] = useState<TaskPriority>('高');
  const [dueDate, setDueDate] = useState('');

  // 当任务变化时更新表单
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCategory(task.category);
      setPriority(task.priority);
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!task || !title.trim()) return;

    updateTask(task.id, {
      title: title.trim(),
      category,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
    });

    setEditingTaskId(null);
  };

  const handleClose = () => {
    setEditingTaskId(null);
  };

  // 如果不在编辑状态，不渲染
  if (!editingTaskId || !task) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* 头部 */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-[#0a0a0a]">编辑任务</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="关闭"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* 任务标题 */}
          <div>
            <label htmlFor="edit-title" className="block text-sm text-gray-600 mb-1">任务标题</label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-[#0a0a0a]"
              required
            />
          </div>

          {/* 分类、优先级、截止日期 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 分类 */}
            <div>
              <label htmlFor="edit-category" className="block text-sm text-gray-600 mb-1">分类</label>
              <select
                id="edit-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-[#0a0a0a]"
              >
                <option value="工作">工作</option>
                <option value="学习">学习</option>
                <option value="生活">生活</option>
                <option value="项目">项目</option>
              </select>
            </div>

            {/* 优先级 */}
            <div>
              <label htmlFor="edit-priority" className="block text-sm text-gray-600 mb-1">优先级</label>
              <select
                id="edit-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-[#0a0a0a]"
              >
                <option value="高">高</option>
                <option value="中">中</option>
                <option value="低">低</option>
              </select>
            </div>

            {/* 截止日期 */}
            <div>
              <label htmlFor="edit-dueDate" className="block text-sm text-gray-600 mb-1">截止日期</label>
              <input
                id="edit-dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-[#0a0a0a]"
              />
            </div>
          </div>

          {/* 按钮 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
