import axios from "axios";
import router from "@/router";
const LoginModule = {
  state: {
    token: "",
    user: {},
    logued: false
  },
  mutations: {
    setToken(state, data) {
      state.token = data.split('\"')[2];
    },
    setUser(state, data) {
      state.user = data;
    },
    setLogued(state, data) {
      console.log("data", data)
      state.logued = data;
    },
    SET_IS_AUTHENTICATED(state, data) {
      state.isAuthenticated = data;
    },
  },
  actions: {
    LOGIN_USER: async function ({ commit, state }) {
      const data = {
        email: 'test@gmail.com',
        password: '12345678',
      }

      const data2 = {
        email: 'test@gmail.com',
        password: '12345678',
        gettoken: true
      }

      axios.post('http://localhost:3999/api/login', data).then((response) => {
        console.log("response", response)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        commit('setUser', JSON.stringify(response.data.user))
        axios.post('http://localhost:3999/api/login', data2).then((response) => {
  
          commit('setToken',  JSON.stringify(response.data.token))
          localStorage.setItem('token',response.data.token)
          commit('setLogued', true)
        })

        
        router.push("/home")
       
        return true;
      }, (err) => {
        console.log(err)
        return false;
      })

    },
    async performLogout({ commit, state }) {


    },
  },
  getters: {
    logued(state) {
      return state.logued;
    },
    token(state){
      return state.token
    },
    user(state){
      return state.user
    }
  },
};
export default LoginModule;
