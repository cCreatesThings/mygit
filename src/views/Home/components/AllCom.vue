<template>
  <div class="welcome-page">
    <h1 class="welcome-title">欢迎使用代码仓库</h1>
    <p class="welcome-description">
      代码仓库用于托管基于 GIT 或 SVN 管理的代码库。通过 Review
      合并请求来审查代码变更。 版本发布可以用来标记、发布代码版本。
    </p>

    <div class="feature-container">
      <div class="feature-item">
        <el-image
          :src="createRepoImage"
          fit="contain"
          class="feature-image"
        ></el-image>
        <h3>创建代码仓库</h3>
        <p>浏览、编辑代码以及查看代码提交记录</p>
      </div>
      <div class="feature-item">
        <el-image
          :src="mergeRequestImage"
          fit="contain"
          class="feature-image"
        ></el-image>
        <h3>合并请求</h3>
        <p>发起合并请求并邀请协作者 Review 变更内容</p>
      </div>
      <div class="feature-item">
        <el-image
          :src="codeVersionImage"
          fit="contain"
          class="feature-image"
        ></el-image>
        <h3>代码版本</h3>
        <p>发布、标记代码版本</p>
      </div>
    </div>

    <el-button type="primary" class="create-repo-btn" @click="createRepository">
      创建代码仓库
    </el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import png from '@/assets/images/4.png'
import { useRouter } from 'vue-router'

const router = useRouter()

const createRepoImage = ref(png)
const mergeRequestImage = ref(png)
const codeVersionImage = ref(png)

const createRepository = () => {
  router.push('/create')
}
</script>

<style scoped>
.welcome-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}

.welcome-title {
  font-size: 28px;
  color: #303133;
  margin-bottom: 20px;
}

.welcome-description {
  font-size: 16px;
  color: #606266;
  line-height: 1.6;
  margin-bottom: 40px;
}

.feature-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.feature-item {
  flex: 1;
  margin: 0 15px;
}

.feature-image {
  width: 100%;
  height: 150px;
  margin-bottom: 20px;
}

.feature-item h3 {
  font-size: 18px;
  color: #303133;
  margin-bottom: 10px;
}

.feature-item p {
  font-size: 14px;
  color: #606266;
  line-height: 1.4;
}

.create-repo-btn {
  font-size: 16px;
  padding: 12px 24px;
}

@media (max-width: 768px) {
  .feature-container {
    flex-direction: column;
  }

  .feature-item {
    margin: 0 0 30px 0;
  }
}
</style>
