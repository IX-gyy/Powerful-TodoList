interface StatsCardProps {
  label: string;
  value: number;
  gradient?: string;
}

export default function StatsCard({ label, value, gradient = 'from-blue-400 to-purple-400' }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-3 sm:p-4 relative overflow-hidden hover:shadow-lg transition-shadow">
      {/* 顶部渐变条 */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}></div>
      
      {/* 内容 */}
      <div className="mt-2">
        <p className="text-gray-500 text-xs sm:text-sm">{label}</p>
        <p className="text-2xl sm:text-3xl font-bold text-[#0a0a0a] mt-1">{value}</p>
      </div>
    </div>
  );
}
