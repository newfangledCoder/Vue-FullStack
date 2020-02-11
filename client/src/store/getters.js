export default {
  isLoggedIn: state => state.status === 'success',
  authStatus: state => state.status
}