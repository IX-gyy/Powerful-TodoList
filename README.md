# Powerful-Todolist 一款轻量级的待办事项网站
使用 React + TypeScript + Vite ，设计采用Tailwind + Framer Motion  
适配网页端和移动端，数据均保存在本地  
本项目为VibeCoding项目  

但是在AI大人运作时，建议创建项目这一步由我们自己来做，这样可以避免AI反复解决那几个环境问题  
下面简单介绍如何初始化项目：

## 项目初始化
```
# 1. 创建项目
npm create vite@latest powerful-todolist -- --template react-ts

# 进入目录
cd powerful-todolist
# 安装基础依赖
npm install

# 2. 安装 v3 最新版(这里最容易出错，v4版本不能用init初始化，AI自己启动经常在这里卡住)
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

# 3. 安装项目其他的依赖
# 状态管理
npm install zustand

# 日期处理
npm install date-fns
```

项目运行依旧是`npm run dev`  

## 提交到Github远程仓库
先在Github中创建一个空仓库，注意**不要创建README.md**  
在本地仓库中：
```
git init
git add .
git commit -m "备注"
```
然后连接远程仓库，并上传：
```
git remote add origin https://github.com/IX-gyy/Powerful-TodoList.git
git branch -M main
git push -u origin main
```
后续更新：
```
git add .
git commit -m "备注"
```
