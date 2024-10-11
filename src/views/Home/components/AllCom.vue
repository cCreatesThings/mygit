<script setup>
import png from '@/assets/images/4.png'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { ElMessage } from 'element-plus'
import { getUserAllReposAPI } from '@/api/repo'

const filters = ref({
  project: '',
  visibility: 'all',
  archived: '',
  sort: 'full_name',
  direction: 'asc', //升序asc, 降序 desc
  q: '' //搜索关键字
  // per_page: 10,
  // page: 1
})
// 首次进入页面, 获取全部仓库
const getUserAllRepos = async () => {
  const res = await getUserAllReposAPI(filters.value)
  repositories.value = res
  handlePageChange(1)
}
getUserAllRepos()
// 点击搜索
// const search = () => {
//   console.log(filters.value)
// }

const repositories = ref([
  // Add more repository data as needed
])
const paginatedRepositories = ref([])

// const currentPage = ref(1)
// const pageSize = ref(10)

// const handleSizeChange = (val) => {
//   pageSize.value = val
//   currentPage.value = 1
// }

const handlePageChange = (val) => {
  paginatedRepositories.value = repositories.value.slice(
    (val - 1) * 5,
    (val - 1) * 5 + 5
  )
}

const handleSort = (command) => {
  ElMessage.success(`Sorting by ${command}`)
  // Implement sorting logic here
  filters.value.sort = command
  getUserAllRepos()
}
watch(
  [
    () => filters.value.direction,
    () => filters.value.q,
    () => filters.value.visibility
  ],
  () => {
    getUserAllRepos()
  }
)

const starRepo = (repo) => {
  ElMessage.success(`Starred repository: ${repo.name}`)
  // Implement star logic here
}

const showSettings = (repo) => {
  ElMessage.info(`Showing settings for repository: ${repo.name}`)
  // Implement settings display logic here
}

const router = useRouter()

const createRepoImage = ref(png)
const mergeRequestImage = ref(png)
const codeVersionImage = ref(png)

const createRepository = () => {
  router.push('/create')
}
</script>

<template>
  <div class="repository-list" v-if="true">
    <div class="top">
      <div class="filters">
        <el-select v-model="filters.project" placeholder="所属项目" clearable>
          <el-option label="全部项目" value=""></el-option>
          <el-option label="项目1" value="1"></el-option>
          <el-option label="项目2" value="2"></el-option>
        </el-select>
        <el-select v-model="filters.visibility" placeholder="公开性" clearable>
          <el-option label="全部" value="all"></el-option>
          <el-option label="公开" value="public"></el-option>
          <el-option label="私有" value="private"></el-option>
        </el-select>
        <el-select v-model="filters.archived" placeholder="归档状态" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option label="已归档" value="true"></el-option>
          <el-option label="未归档" value="false"></el-option>
        </el-select>
        <el-input v-model="filters.q" placeholder="搜索关键字" />
        <!-- <el-button @click="search">
          <template #icon>
            <Icon icon="mdi:magnify" />
          </template>
          搜索
        </el-button> -->
      </div>

      <div class="table-header">
        <div class="sort-options">
          <span>排序字段</span>
          <el-dropdown @command="handleSort">
            <span class="el-dropdown-link">
              仓库名称
              <Icon icon="mdi:chevron-down" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="full_name">
                  仓库名称
                </el-dropdown-item>
                <el-dropdown-item command="created">创建时间</el-dropdown-item>
                <el-dropdown-item command="updated">更新时间</el-dropdown-item>
                <el-dropdown-item command="pushed">
                  最后推送时间
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <Icon
            icon="ri:sort-asc"
            @click="filters.direction = 'asc'"
            v-if="filters.direction === 'desc'"
          />
          <Icon
            icon="ci:sort-ascending"
            @click="filters.direction = 'desc'"
            v-else
          />
        </div>
      </div>
    </div>

    <el-table :data="paginatedRepositories" style="width: 100%">
      <el-table-column label="仓库名称" prop="name">
        <template #default="scope">
          <div class="repo-info">
            <el-avatar :size="32" :src="scope.row.avatar">{{
              scope.row.name.charAt(0).toUpperCase()
            }}</el-avatar>
            <div class="repo-details">
              <div class="repo-name">{{ scope.row.name }}</div>
              <div class="repo-description">{{ scope.row.description }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="所属项目" prop="project">
        <template #default="{ row }">
          {{ row.human_name }}
        </template>
      </el-table-column>
      <el-table-column label="合并请求" prop="mergeRequests">
        <template #default="scope">
          <Icon icon="mdi:source-merge" /> {{ scope.row.mergeRequests }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updatedAt">
        <template #default="{ row }">
          {{ new Date(row.updated_at).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button type="text" @click="starRepo(scope.row)">
            <Icon icon="mdi:star-outline" />
          </el-button>
          <el-button type="text" @click="showSettings(scope.row)">
            <Icon icon="mdi:cog" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="repositories.length"
        :pager-count="5"
        :page-size="5"
        @current-change="handlePageChange"
      />
      <span>共{{ repositories.length }}个仓库</span>
    </div>
  </div>
  <div class="welcome-page" v-else>
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

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.repository-list {
  padding: 20px;
  width: 80%;
}

.filters {
  width: 50%;
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 10px;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.repo-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.repo-details {
  display: flex;
  flex-direction: column;
}

.repo-name {
  font-weight: bold;
}

.repo-description {
  font-size: 12px;
  color: #666;
}

.pagination {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.welcome-page {
  max-width: 800px;
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
