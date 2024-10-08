<script setup>
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'

const sidebarItems = [
  { icon: 'mdi:view-dashboard-outline', label: '工作台', path: '/dashboard' },
  { icon: 'mdi:folder-outline', label: '项目', path: '/project' },
  { icon: 'mdi:robot-outline', label: 'AI', path: '/ai' },
  { icon: 'mdi:file-document-outline', label: '事项', path: '/task' },
  { icon: 'mdi:code-braces', label: '代码', path: '/' },
  { icon: 'mdi:cube-outline', label: '制品', path: '/artifact' },
  { icon: 'mdi:chart-line', label: '洞察', path: '/insight' },
  { icon: 'mdi:book-open-outline', label: '知识', path: '/knowledge' },
  { icon: 'mdi:cog-outline', label: '自动化', path: '/automation' },
  { icon: 'mdi:account-outline', label: '用户', path: '/user' },
  { icon: 'mdi:apps', label: '更多', path: '/more' },
  { icon: 'mdi:bell-outline', label: '通知', path: '/notification' },
  { icon: 'mdi:help-circle-outline', label: '帮助', path: '/help' },
  { icon: 'mdi:account-circle-outline', label: '个人信息', path: '/profile' }
]
</script>

<template>
  <el-container class="dashboard">
    <el-aside width="64px">
      <div class="sidebar">
        <RouterLink
          v-for="(item, index) in sidebarItems"
          :key="index"
          class="sidebar-item"
          :to="item?.path"
        >
          <el-tooltip :content="item.label" placement="right">
            <div class="icon-wrapper">
              <Icon :icon="item.icon" width="24" height="24" />
            </div>
          </el-tooltip>
        </RouterLink>
      </div>
    </el-aside>
    <el-container>
      <el-header height="60px">
        <h1>代码仓库</h1>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.sidebar-item {
  color: #333;
  margin-bottom: 20px;
  cursor: pointer;
}
.router-link-active {
  color: #1890ff;
}

.dashboard {
  height: 100vh;
}

.sidebar {
  height: 100%;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.sidebar-item {
  margin-bottom: 20px;
  cursor: pointer;
}

.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.icon-wrapper:hover {
  background-color: #e6e8eb;
}

.el-header {
  background-color: #fff;
  border-bottom: 1px solid #e6e8eb;
  display: flex;
  align-items: center;
}
</style>
