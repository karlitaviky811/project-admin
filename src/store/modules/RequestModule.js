import axios from "axios";
import router from "@/router";
import Vue from 'vue';
const RequestModule = {
  state: {
    requestsU: [],
    modalReq: {
    },
    requestList: [],
    requestListByType: [],
    loading: false
  },
  mutations: {
    setRequestsUser(state, data) {
      state.requestsU = data;
    },
    setRequestsUserModal(state, data) {
      let comm = ''
      if (data !== {}) {
        comm = data.feedBack?.comment
      }
      const req = {
        _id: data._id,
        type: data.type,
        project: data.project,
        title: data.title,
        description: data.description,
        priority: data.priority,
        urgency: data.urgency,
        status: data.status,
        image: data.image !== undefined ? data.image : 'https://www.hazteveg.com/img/empty-photo.jpg',
        feedBack: {
          comment: comm
        },
        image: data.image
      }
      console.log("req", req)
      state.modalReq = req;
      console.log("here", state.modalReq)
    },
    setRequestsList(state, data) {

      state.requestList = data;
    },
    setRequestsListByType(state, data) {
      state.requestListByType = data;
    },
    setLoading(state, data){
      state.loading = data;
    }
  },
  actions: {
    GET_REQUESTS_ALL: async function ({ commit }) {

      axios.get("http://localhost:3999/api/req/requests/:1", {
        "Authorization": localStorage.getItem('token'),
      }).then((response) => {
        commit('setRequestsList', response.data.requests)
        return true;
      }, (err) => {
        console.log(err)
        return false;
      })

    },
    GET_REQUESTS_ALL_BY_TYPE: async function ({ commit }) {

      axios.get("http://localhost:3999/api/req/request/group/:1", {
        "Authorization": localStorage.getItem('token'),
      }).then((response) => {
        console.log("response--->", response.data.requests)

        commit('setRequestsListByType', response.data.requests)
        return true;
      }, (err) => {
        console.log(err)
        return false;
      })

    },
    GET_REQUESTS_USER: async function ({ commit }, data) {
      //let  id= data.replace('""', '')
      axios.get("http://localhost:3999/api/req/user-requests/" + data).then((response) => {
        console.log("response", response.data.requests)
        commit('setRequestsUser', response.data.requests)
        return true;
      }, (err) => {
        console.log(err)
        return false;
      })

    },
    SAVE_REQUESTS_USER: async function ({ commit }, data) {

      const req = {
        type: data.type,
        project: data.project,
        title: data.title,
        description: data.description,
        priority: data.priority,
        urgency: data.urgency,
        feedBack: '',
        image: data.image !== '' ? data.image : 'https://metrika.com/images/empty-photo.jpg'

      }
      console.log("req------->", req)

      console.log("hereeeee", localStorage.getItem('token'))
      axios
        .post("http://localhost:3999/api/req/request/", req, {
          headers: {
            "Authorization": localStorage.getItem('token'),
          }
        })
        .then(function (res) {
     
          Vue.$toast.open({
            message: 'Solicitud guardada con éxito!',
            type: 'success',
            position: 'top-right'
            // all of other options may go here
        });
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
      let that = this
      console.log("data----*************", data, "token", headers, data.feedBack.comment)
      const user = JSON.parse(localStorage.getItem("user"))._id;
      const req = {
        type: data.type,
        project: data.project,
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        urgency: data.urgency,
        feedBack: data.feedBack.comment,
        image: data.image !== '' ? data.image : 'https://metrika.com/images/empty-photo.jpg'
      }
      console.log("req", req)


      axios
        .put("http://localhost:3999/api/req/request/" + data._id, req, {
          headers: {
            "Authorization": localStorage.getItem('token'),
          }
        })
        .then(function (res) {
          axios.get("http://localhost:3999/api/req/user-requests/" + user).then((response) => {
            commit('setRequestsUser', response.data.requests)
            Vue.$toast.open({
              message: 'Solicitud actualizada con éxito!',
              type: 'success',
              position: 'top-right'
              // all of other options may go here
          });
          }, (err) => {
            console.log(err)
            return false;
          })

        })
        .catch(function (res) {
          console.log("FAILURE!!", res);
        });

    },
    UPDATE_REQUESTS_USER_FEEDBACKS: async function ({ commit }, data) {
      const headers = {
        Authorization: localStorage.getItem('token')
      }
      console.log("data ---->>>>>>>>>>>>>>>", data)
      const req = {
        type: data.type,
        project: data.project,
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        urgency: data.urgency,
        feedBack: data.feedBack.comment,
        image: data.image !== '' ? data.image : 'https://metrika.com/images/empty-photo.jpg'
      }
      console.log("req--->>>>", req)


      axios
        .put("http://localhost:3999/api/req/request/" + data._id + "/feedback", req, {
          headers: {
            "Authorization": localStorage.getItem('token'),
          }
        })
        .then(function (res) {

          Vue.$toast.open('Solicitud actualizada con éxito');
          return true
        })
        .catch(function (res) {
          console.log("FAILURE!!", res);
        });

    },
    DELETE_REQUEST: async function ({ commit }, data) {
      const user = JSON.parse(localStorage.getItem("user"))._id;
      const headers = {
        Authorization: localStorage.getItem('token')
      }

      console.log("req--->>>>", data)


      axios
        .delete("http://localhost:3999/api/req/request/" + data, {
          headers: {
            "Authorization": localStorage.getItem('token'),
          }
        })
        .then(function (res) {
          axios.get("http://localhost:3999/api/req/user-requests/" + user).then((response) => {
            console.log("response", response.data.requests)
            commit('setRequestsUser', response.data.requests)
            Vue.$toast.open('Solicitud eliminada con éxito');
            return true;
          }, (err) => {
            console.log(err)
            return false;
          })
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
    },
    requestListByType(state) {
      return state.requestListByType;
    },
    loading(state) {
      return state.loading;
    }
  },
};
export default RequestModule;
