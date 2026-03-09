interface ProgressChartProps {
  percentage: number;
  totalTasks?: number;
}

export default function ProgressChart({ percentage, totalTasks = 0 }: ProgressChartProps) {
  // SVG 圆形参数
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // 处理总任务为 0 的情况
  const displayPercentage = totalTasks === 0 ? 0 : percentage;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* 定义渐变色 */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>

          {/* 背景圆环（浅灰色） */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />

          {/* 进度圆环（渐变色） */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* 中心文字 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-[#0a0a0a]">
            {Math.round(displayPercentage)}%
          </span>
          <span className="text-xs text-gray-500 mt-0.5">完成率</span>
        </div>
      </div>

      {/* 总任务数（可选） */}
      {totalTasks > 0 && (
        <p className="text-xs text-gray-400 mt-2">共 {totalTasks} 个任务</p>
      )}
    </div>
  );
}
