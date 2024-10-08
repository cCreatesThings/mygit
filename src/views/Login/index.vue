<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import left_codewave from '@/assets/images/logo-codewave.png'
import { postOAuthTokenAPI } from '@/api/login'
const formRef = ref()
const form = ref({
  username: '3530812934@qq.com',
  password: 'Ljt1527111',
  agreement: false
})
const rules = {
  username: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: '请输入正确的邮箱格式',
      trigger: 'blur'
    }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const handleLogin = async () => {
  const isOK = await formRef.value.validate()
  if (!isOK) return ElMessage.error('请输入正确的邮箱和密码')
  if (!form.value.agreement) return ElMessage.error('请勾选服务协议和隐私政策')
  const res = await postOAuthTokenAPI(form.value)
  console.log(res)
  ElMessage.success('登录成功')
}
</script>
<template>
  <div class="login-container">
    <div class="left-panel">
      <img :src="left_codewave" alt="Codewave Logo" class="logo" />
    </div>
    <div class="right-panel">
      <el-card>
        <h2 class="login-title">登录，即刻创造您的应用</h2>
        <el-form :rules="rules" :model="form" ref="formRef" class="login-form">
          <el-form-item prop="username">
            <el-input type="email" v-model="form.username" placeholder="账号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.agreement">
              我已阅读并同意 <a href="#" class="link">服务协议</a> 和
              <a href="#" class="link">隐私政策</a>
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="handleLogin"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
        <div class="register-link">
          还未注册？<a href="#" class="link">立即注册</a>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.left-panel {
  flex: 1;
  background-color: #000;
  color: #fff;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.logo {
  height: 100%;
  width: 100%;
}

.main-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.ai-text {
  color: #4caf50;
}

.sub-title {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.feature-list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
}

.feature-list li {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.feature-list li::before {
  content: '✓';
  color: #4caf50;
  margin-right: 0.5rem;
}

.register-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.decoration {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50%;
}

.decoration-img {
  width: 100%;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.login-title {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.login-form {
  width: 100%;
  max-width: 300px;
}

.login-btn {
  width: 100%;
}

.register-link {
  margin-top: 1rem;
}

.link {
  color: #409eff;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .left-panel,
  .right-panel {
    flex: none;
  }

  .left-panel {
    padding-bottom: 4rem;
  }

  .decoration {
    width: 100%;
  }
}
</style>
