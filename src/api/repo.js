import { useUserStore } from '@/stores/user'
import request from '@/utils/request'

/**
 * @description: 创建一个仓库
 * @param {*} data
 * @returns
 */
export const postCreateRepositoryAPI = async (data) => {
  return request.post('/api/v5/user/repos', {
    access_token: useUserStore().token,
    ...data
  })
}

// 列出授权用户的所有仓库
// GET https://gitee.com/api/v5/user/repos

/**
 * @description: 获取或搜索用户仓库
 * @param {*} params
 * @returns
 */
export const getUserAllReposAPI = (params) => {
  return request({
    method: 'GET',
    url: '/api/v5/user/repos',
    params: {
      access_token: useUserStore().token,
      ...params
    }
  })
}
