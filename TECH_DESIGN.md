# 技术设计文档
1. 技术选型
- 前端框架：React + TypeScript + Vite
- 状态管理：Zustand
- UI样式：Tailwind CSS 3
- 日期处理：date-fns 2
- 数据存储：localStorage
- 动画：Framer Motion 实现任务添加/删除/完成动画。
- 构建工具：Vite（快速启动与热更新）

2. 项目结构
```
text
src/
├── assets/          # 静态资源
├── components/      # 可复用UI组件
│   ├── TaskItem.tsx
│   ├── TaskForm.tsx
│   ├── StatsCard.tsx
│   ├── ProgressChart.tsx
│   └── FilterBar.tsx
├── store/           # Zustand store
│   ├── taskStore.ts
│   └── types.ts
├── utils/           # 工具函数
│   ├── dateUtils.ts
│   └── storage.ts
├── hooks/           # 自定义Hooks
├── types/           # 全局类型定义
├── App.tsx
├── main.tsx
└── index.css        # Tailwind导入
```
3. 状态管理设计 (Zustand)
定义 Task 接口：
```typescript
interface Task {
  id: string;
  title: string;
  category: '工作' | '学习' | '生活' | '项目';
  priority: '高' | '中' | '低';
  dueDate?: Date | null;
  completed: boolean;
  createdAt: Date;
}
```

4. 数据持久化
使用 localStorage 结合 Zustand 中间件 persist（或自定义逻辑）。
初始化时从 localStorage 读取数据，每次状态变更后保存。
日期序列化：存储为 ISO 字符串，读取时用 date-fns 解析。

5. 关键实现思路
5.1 任务表单
受控组件，包含标题输入、分类下拉、优先级单选、日期选择器（原生input type="date"）。
提交时生成唯一ID（crypto.randomUUID() 或 uuid）和创建时间。

5.2 统计环形图
使用 SVG 或 HTML Canvas 绘制，根据完成百分比计算扇形路径。

或使用简单的 CSS conic-gradient 实现。

5.3 搜索与筛选
搜索：task.title.includes(query) 忽略大小写。
分类筛选：若为全部则显示所有，否则 task.category === filter。
两者组合。

6. 性能优化
使用 React.memo 优化任务列表项。
Zustand 选择性订阅，避免不必要的重绘。
使用 useCallback、useMemo 缓存计算函数。

7. 开发与构建
Vite 配置别名 @ 指向 src。
支持环境变量（如有需要）。
打包输出到 dist，部署为静态站点。