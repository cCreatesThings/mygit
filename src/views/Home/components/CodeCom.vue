<script setup>
import { ref } from 'vue'
import empty_png from '@/assets/images/4.png'
import RecentCom from './RecentCom.vue'
import AllCom from './AllCom.vue'
import OpensourceCom from './OpensourceCom.vue'

const comObj = {
  rencent: RecentCom,
  all: AllCom,
  opensource: OpensourceCom
}
const activeTab = ref('all')
</script>

<template>
  <div class="main-content">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="最近访问" name="rencent"></el-tab-pane>
      <el-tab-pane label="全部仓库" name="all"></el-tab-pane>
      <el-tab-pane label="开源仓库" name="opensource"></el-tab-pane>
    </el-tabs>
    <el-button
      type="primary"
      class="create-repo-btn"
      @click="$router.push('/create')"
      >创建代码仓库</el-button
    >
  </div>
  <div class="repo-content">
    <component :is="comObj[activeTab]" v-if="true" />
    <el-card class="repo-card" v-else>
      <div class="repo-card-content">
        <el-image :src="empty_png"></el-image>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.main-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.create-repo-btn {
  font-size: 14px;
}

.repo-content {
  display: flex;
  justify-content: center;
  height: 400px;
}

.repo-card {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.repo-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #909399;
}

.repo-card-content p {
  margin-top: 10px;
}
</style>
