import type { FC } from 'react';
import { memo } from 'react';
import { motion } from 'framer-motion';
import type { Task } from '../types';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TaskItem: FC<TaskItemProps> = memo(function TaskItem({ task, onToggle, onDelete, onEdit }) {
  // 分类标签样式 - 使用渐变色和图标
  const categoryStyles: Record<string, { bg: string; text: string; icon: string }> = {
    '工作': { bg: 'bg-gradient-to-r from-blue-400 to-blue-500', text: 'text-white', icon: '💼' },
    '学习': { bg: 'bg-gradient-to-r from-purple-400 to-purple-500', text: 'text-white', icon: '📚' },
    '生活': { bg: 'bg-gradient-to-r from-green-400 to-emerald-500', text: 'text-white', icon: '🏠' },
    '项目': { bg: 'bg-gradient-to-r from-orange-400 to-amber-500', text: 'text-white', icon: '📋' },
  };

  // 优先级样式 - 使用更醒目的颜色
  const priorityStyles: Record<string, { color: string; bg: string; label: string }> = {
    '高': { color: 'text-red-600', bg: 'bg-red-50', label: '🔥 高' },
    '中': { color: 'text-orange-600', bg: 'bg-orange-50', label: '⚡ 中' },
    '低': { color: 'text-green-600', bg: 'bg-green-50', label: '✅ 低' },
  };

  const style = categoryStyles[task.category] || { bg: 'bg-gray-400', text: 'text-white', icon: '📌' };
  const priorityStyle = priorityStyles[task.priority] || { color: 'text-gray-600', bg: 'bg-gray-50', label: task.priority };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 mb-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onEdit(task.id)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      layout
    >
      <div className="flex items-start gap-3">
        {/* 复选框 */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation();
            onToggle(task.id);
          }}
          className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-400 cursor-pointer flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
          title={task.completed ? "标记为未完成" : "标记为已完成"}
        />

        {/* 任务内容 */}
        <div className="flex-1 min-w-0">
          {/* 任务标题 */}
          <h4
            className={`text-sm sm:text-base font-medium ${
              task.completed
                ? 'text-gray-400 line-through'
                : 'text-[#0a0a0a]'
            }`}
          >
            {task.title}
          </h4>

          {/* 任务元信息 */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {/* 分类标签 - 渐变色胶囊样式 */}
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${style.bg} ${style.text} shadow-sm`}
            >
              <span className="text-xs">{style.icon}</span>
              {task.category}
            </span>

            {/* 优先级 - 带背景的醒目样式 */}
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${priorityStyle.bg}`}>
              <span className={`text-xs font-semibold ${priorityStyle.color}`}>
                {priorityStyle.label}
              </span>
            </div>

            {/* 截止日期 */}
            {task.dueDate && (
              <span className="text-xs text-gray-500 whitespace-nowrap bg-gray-100 px-2 py-1 rounded-md">
                📅 {format(new Date(task.dueDate), 'yyyy-MM-dd')}
              </span>
            )}
          </div>
        </div>

        {/* 删除按钮 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
          title="删除任务"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
});

export default TaskItem;
