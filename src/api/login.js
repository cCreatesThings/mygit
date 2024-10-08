import request from '@/utils/request'

/**
 * @description: 通过用户名和密码获取OAuth Token
 * @param {*} data
 * @returns
 */
export const postOAuthTokenAPI = (data) => {
  return request.post('/oauth/token', {
    ...data,
    grant_type: 'password',
    client_id:
      '14f5d937e42ec6077cd8ed41c5110682d2b23627641fe538351e688ca1ffc28d',
    client_secret:
      '95e42d519324bf999c9063dad756ad69ece202ab8d97b1867a47dffb3c08da5a',
    scope:
      'projects pull_requests issues notes hook groups gists enterproses emails'
  })
}
