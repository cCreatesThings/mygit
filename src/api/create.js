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
