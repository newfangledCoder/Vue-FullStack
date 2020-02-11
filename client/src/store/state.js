export default {
    status: '',
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') === "undefined" ? null : JSON.parse(localStorage.getItem('user')) 
}