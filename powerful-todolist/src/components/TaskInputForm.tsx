export default function TaskInputForm() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">添加新任务</h3>
      
      <div className="space-y-4">
        {/* 任务标题 */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">任务标题</label>
          <input
            type="text"
            placeholder="输入任务内容..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
          />
        </div>

        {/* 分类和优先级 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm text-gray-600 mb-1">分类</label>
            <select id="category" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50">
              <option value="工作">工作</option>
              <option value="学习">学习</option>
              <option value="生活">生活</option>
              <option value="项目">项目</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm text-gray-600 mb-1">优先级</label>
            <select id="priority" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50">
              <option value="高">高</option>
              <option value="中">中</option>
              <option value="低">低</option>
            </select>
          </div>
        </div>

        {/* 添加按钮 */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
          添加
        </button>
      </div>
    </div>
  );
}
