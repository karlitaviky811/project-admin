import axios from "axios";
import router from "@/router";
const RequestModule = {
  state: {
    requestsU: [],
    modalReq: {},
    requestList: []
  },
  mutations: {
    setRequestsUser(state, data) {

      state.requestsU = data;
    },
    setRequestsUserModal(state, data) {

      state.modalReq = data;
    },
    setRequestsList(state, data) {

      state.requestList = data;
    },
  },
  actions: {
    GET_REQUESTS_ALL: async function ({ commit }) {
      //let  id= data.replace('""', '')
    
      axios.get("http://localhost:3999/api/REQ/requests/:1", {
        "Authorization": localStorage.getItem('token'),
      }).then((response) => {
        console.log("response admin", response)
        commit('setRequestsList', response.data.requests)
        return true;
      }, (err) => {
        console.log(err)
        return false;
      })

    },
    GET_REQUESTS_USER: async function ({ commit }, data) {
      //let  id= data.replace('""', '')
      console.log("data", data)
      axios.get("http://localhost:3999/api/req/user-requests/" + data).then((response) => {

        commit('setRequestsUser', response.data.requests)
        return true;
      }, (err) => {
        console.log(err)
        return false;
      })

    },
    SAVE_REQUESTS_USER: async function ({ commit }, data) {
      const headers = {
        Authorization: localStorage.getItem('token')
      }

      const req = {
        type: data.type,
        project: data.project,
        title: data.title,
        description: data.description,
        priority: data.priority
      }
      console.log("req", req)


      axios
        .post("http://localhost:3999/api/req/request", req, {
          headers: {
            "Authorization": localStorage.getItem('token'),
          }
        })
        .then(function (res) {
          //console.log("SUCCESS!!", res);
          //that.$refs.form.reset()

          return true
        })
        .catch(function (res) {
          console.log("FAILURE!!", res);
        });

    },
    UPDATE_REQUESTS_USER: async function ({ commit }, data) {
      const headers = {
        Authorization: localStorage.getItem('token')
      }
      console.log("data", data, "token", headers)
      const req = {
        type: data.type,
        project: data.project,
        title: data.title,
        description: data.description,
        priority: data.priority
      }
      console.log("req", req)


      axios
        .put("http://localhost:3999/api/req/request/" + data._id, req, {
          headers: {
            "Authorization": localStorage.getItem('token'),
          }
        })
        .then(function (res) {
          //console.log("SUCCESS!!", res);
          //that.$refs.form.reset()
          console.log("res put request---->", res)
          return true
        })
        .catch(function (res) {
          console.log("FAILURE!!", res);
        });

    },
    UPDATE_REQUESTS_USER_FEEDBACK: async function ({ commit }, data) {
      const headers = {
        Authorization: localStorage.getItem('token')
      }
      console.log("data ---->", data)
      const req = {
        type: data.type,
        project: data.project,
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        feedBack:{
          comment: data.feedBack.comment
        }
      }
      console.log("req--->>>>", req)


      axios
        .put("http://localhost:3999/api/req/request/624321cb89a0bb3650db2a58/feedback",  req, {
          headers: {
            "Authorization": localStorage.getItem('token'),
          }
        })
        .then(function (res) {
          //console.log("SUCCESS!!", res);
          //that.$refs.form.reset()
          console.log("res put request---->", res)
          return true
        })
        .catch(function (res) {
          console.log("FAILURE!!", res);
        });

    },
  },
  getters: {
    requestsU(state) {
      return state.requestsU;
    },
    modalReq(state) {
      return state.modalReq;
    },
    requestList(state) {
      return state.requestList;
    }
  },
};
export default RequestModule;
