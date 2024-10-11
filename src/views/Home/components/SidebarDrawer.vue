<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import {
  User,
  ShoppingCart,
  UserFilled,
  Tickets,
  Document,
  SwitchButton
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
defineProps(['drawer'])
defineEmits(['update:drawer'])

const activeIndex = ref('7')

const handleSelect = (key) => {
  console.log(key)
  // Implement navigation logic here
  if (key === '7') {
    useUserStore().clearProfile()
    router.push('/login')
  }
}

const profileToken = computed(() =>
  useUserStore().profile.access_token.slice(0, 6)
)
</script>

<template>
  <div>
    <el-drawer
      :model-value="drawer"
      @update:model-value="$emit('update:drawer', $event)"
      title="Navigation"
      :with-header="false"
      direction="ltr"
      size="240px"
    >
      <el-menu
        class="sidebar-menu"
        :default-active="activeIndex"
        @select="handleSelect"
      >
        <div class="sidebar-header">
          <h3>{{ profileToken }}</h3>
          <span class="team-leader">团队负责人</span>
        </div>
        <el-menu-item index="1">
          <el-icon><User /></el-icon>
          <span>个人账户设置</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><ShoppingCart /></el-icon>
          <span>服务订购</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><UserFilled /></el-icon>
          <span>邀请成员</span>
        </el-menu-item>
        <el-menu-item index="4">
          <!-- <el-icon><Globe /></el-icon> -->
          <span>切换语言</span>
          <span class="language-indicator">简体中文</span>
        </el-menu-item>
        <el-menu-item index="5">
          <el-icon><Tickets /></el-icon>
          <span>工单中心</span>
        </el-menu-item>
        <el-menu-item index="6">
          <el-icon><Document /></el-icon>
          <span>更新日志</span>
        </el-menu-item>
        <el-menu-item index="7">
          <el-icon><SwitchButton /></el-icon>
          <span>退出</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </div>
</template>

<style scoped>
.sidebar-menu {
  border-right: none;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #e6e6e6;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.team-leader {
  font-size: 12px;
  color: #909399;
}

.el-menu-item {
  display: flex;
  align-items: center;
}

.el-menu-item .el-icon {
  margin-right: 10px;
}

.language-indicator {
  margin-left: auto;
  font-size: 12px;
  color: #909399;
}

:deep(.el-drawer__body) {
  padding: 0;
}
</style>
