import axios from 'axios';

// API URL
const apiURL = "http://localhost:3000/api";

export default {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({ url: `${apiURL}/login`, data: user, method: 'POST' })
        .then(resp => {
          const payload = {
            token: resp.data.token,
            user: resp.data.user
          }
          // Add the following line:
          axios.defaults.headers.common['authToken'] = payload.token
          commit('auth_success', payload)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      console.log("*************** ", user);
      axios({ url: `${apiURL}/register`, data: user, method: 'POST' })
        .then(resp => {
          const payload = {
            token: resp.data.token,
            user: resp.data.user
          }
          // Add the following line:
          axios.defaults.headers.common['authToken'] = payload.token
          commit('auth_success', payload)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {

      try {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['authToken']
        resolve()
      } 
      catch (err) {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
      }
    })
  }
}