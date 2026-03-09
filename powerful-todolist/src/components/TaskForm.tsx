import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import type { TaskCategory, TaskPriority } from '../types';

export default function TaskForm() {
  const addTask = useTaskStore((state) => state.addTask);
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('工作');
  const [priority, setPriority] = useState<TaskPriority>('高');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      category,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      completed: false,
    });

    // 清空表单
    setTitle('');
    setDueDate('');
    // 保持分类和优先级的默认值
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-100">
      <h3 className="text-base sm:text-lg font-semibold text-[#0a0a0a] mb-4">添加新任务</h3>
      
      <div className="space-y-4">
        {/* 任务标题 */}
        <div>
          <label htmlFor="title" className="block text-sm text-gray-600 mb-1">任务标题</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入任务内容..."
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 text-[#0a0a0a]"
          />
        </div>

        {/* 分类、优先级、截止日期 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* 分类 */}
          <div>
            <label htmlFor="category" className="block text-sm text-gray-600 mb-1">分类</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 text-[#0a0a0a]"
            >
              <option value="工作">工作</option>
              <option value="学习">学习</option>
              <option value="生活">生活</option>
              <option value="项目">项目</option>
            </select>
          </div>

          {/* 优先级 */}
          <div>
            <label htmlFor="priority" className="block text-sm text-gray-600 mb-1">优先级</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 text-[#0a0a0a]"
            >
              <option value="高">高</option>
              <option value="中">中</option>
              <option value="低">低</option>
            </select>
          </div>

          {/* 截止日期 */}
          <div>
            <label htmlFor="dueDate" className="block text-sm text-gray-600 mb-1">截止日期</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 text-[#0a0a0a]"
            />
          </div>
        </div>

        {/* 添加按钮 */}
        <button
          type="submit"
          disabled={!title.trim()}
          className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          添加任务
        </button>
      </div>
    </form>
  );
}
