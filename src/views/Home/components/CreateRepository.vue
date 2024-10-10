<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Document } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { postCreateRepositoryAPI } from '@/api/repo'

const router = useRouter()

const formRef = ref(null)
const isGitignore = ref(false)

const form = reactive({
  project: '',
  repoType: 'GIT',
  name: '',
  description: '',
  initOptions: [],
  gitignore_template: isGitignore.value ? '' : 'Node',
  auto_init: false,
  private: true
})

const rules = {
  name: [
    { required: true, message: '请输入仓库名称', trigger: 'blur' },
    {
      pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_.-]+$/,
      message: '仓库名称格式不正确',
      trigger: 'blur'
    }
  ]
}

const goBack = () => {
  router.go(-1)
}

const submitForm = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      ElMessage.success('仓库创建成功')
      const res = await postCreateRepositoryAPI(form)
      console.log(res)
      router.push('/') // 重置表单
      formRef.value.resetFields()
    } else {
      ElMessage.error('请填写所有必填字段')
    }
  })
}

const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>

<template>
  <div class="create-repository">
    <el-page-header @back="goBack" title="创建代码仓库" />

    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-position="top"
      class="repo-form"
    >
      <el-form-item label="所属项目" prop="project">
        <el-select v-model="form.project" placeholder="所属项目">
          <el-option label="项目1" value="project1" />
          <el-option label="项目2" value="project2" />
        </el-select>
      </el-form-item>

      <el-form-item label="仓库类型和名称" required prop="name">
        <div class="repo-type-name">
          <div class="repo-type">
            <el-radio-group v-model="form.repoType">
              <el-radio-button value="GIT">
                <el-icon><Document /></el-icon> GIT 仓库
              </el-radio-button>
            </el-radio-group>
          </div>
          <el-input
            style="width: 700px"
            v-model="form.name"
            placeholder="仓库名称只支持中、英文、数字、下划线(_)、中划线(-)和点(.)的组合"
            :maxlength="100"
            show-word-limit
            class="repo-name"
          />
        </div>
      </el-form-item>

      <el-form-item label="仓库描述">
        <el-input
          v-model="form.description"
          type="textarea"
          placeholder="请输入仓库描述"
          :rows="4"
        />
      </el-form-item>

      <el-form-item label="初始化仓库">
        <el-checkbox v-model="form.auto_init">生成 README 文件</el-checkbox>
        <el-checkbox v-model="isGitignore">添加 .gitignore 文件</el-checkbox>
        <el-checkbox value="branchModel">
          添加分支模型（仓库创建后将根据所选模型创建分支）
        </el-checkbox>
      </el-form-item>

      <el-form-item label="是否开源">
        <el-radio-group v-model="form.private">
          <el-radio :value="true">
            私有仓库（仅对仓库成员可见，仓库成员可访问仓库。）
          </el-radio>
          <el-radio :value="false" disabled>公开仓库</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">完成创建</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.create-repository {
  max-width: 800px;
  padding: 20px;
}

.repo-form {
  margin-top: 20px;
}

.repo-type-name {
  display: flex;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

.repo-type {
  flex: 0 0 auto;
}

.repo-name {
  flex: 1;
}

:deep(.el-radio-button__inner) {
  border: none;
  border-radius: 0;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #f5f7fa;
}

:deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background-color: #ecf5ff;
  color: #409eff;
  box-shadow: none;
}

:deep(.repo-name .el-input__wrapper) {
  box-shadow: none;
  padding-left: 15px;
}

:deep(.el-form-item__label) {
  font-weight: bold;
}
</style>
