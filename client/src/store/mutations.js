export default {
  auth_request(state) {
    state.status = 'loading'
  },
  auth_success(state, payload) {
    state.status = 'success'
    state.token = payload.token
    state.user = payload.user
    localStorage.setItem('token', state.token)
    localStorage.setItem('user', JSON.stringify(state.user))
  },
  auth_error(state) {
    state.status = 'error'
    state.token = ''
  },
  logout(state) {
    state.status = ''
    state.token = ''
    state.user = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}