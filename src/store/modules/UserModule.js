import axios from "axios";
import router from "@/router";
const UserModule = {
  state: {
    requestsU: [],
    modalUser: {
      
    },
    usersList: []
  },
  mutations: {
    setUsersList(state, data) {

      state.usersList = data;
    },
    setUserModal(state, data) {

      console.log("data", data)
      const user = {
        _id: data._id ,
        name: data.name,
        surname: data.surname,
        role: data.role,
        email: data.email,
        image: data.image !== undefined ? data.image : 'https://www.hazteveg.com/img/empty-photo.jpg',
      }
      state.modalUser = user;
    }
  },
  actions: {
    GET_USERS_ALL: async function ({ commit }) {
      //let  id= data.replace('""', '')
    
      axios.get("http://localhost:3999/api/users", {
        "Authorization": localStorage.getItem('token'),
      }).then((response) => {
        console.log("response admin", response)
        commit('setUsersList', response.data.users)
        return true;
      }, (err) => {
        console.log(err)
        return false;
      })

    },
    SAVE_NEW_USER: async function ({ commit }, data) {
     
      console.log("data", data)
      const user = {
        name: data.name,
        surname: data.surname,
        password: data.password,
        role: data.role,
        email: data.email,
        image: data.image
  
      }
      console.log("user", user)


      axios
        .post("http://localhost:3999/api/register", user, {
          headers: {
            "Authorization": localStorage.getItem('token'),
          }
        })
        .then(function (res) {
         console.log("res register", res)

          return true
        })
        .catch(function (res) {
          console.log("FAILURE!!", res);
        });

    },
    UPDATE_USER: async function ({ commit }, data) {
      const headers = {
        Authorization: localStorage.getItem('token')
      }
      console.log("data", data, "token", headers)
      const user = {
        _id: data._id,
        name: data.name,
        surname: data.surname,
        password: data.password,
        email: data.email,
        image: data.image
      }
      console.log("req", user)

      
      axios
        .put("http://localhost:3999/api/update", user, {
          headers: {
            "Authorization": localStorage.getItem('token'),
          }
        })
        .then(function (res) {
   
          console.log("res put user---->", res)
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
        urgency: data.urgency,
        feedBack: data.feedBack.comment,
        
      }
      console.log("req--->>>>", req)


      axios
        .put("http://localhost:3999/api/req/request/" +data._id +"/feedback",  req, {
          headers: {
            "Authorization": localStorage.getItem('token'),
          }
        })
        .then(function (res) {

          console.log("res put request---->", res)
          return true
        })
        .catch(function (res) {
          console.log("FAILURE!!", res);
        });

    },
  },
  getters: {
    usersList(state) {
      return state.usersList;
    },
    modalUser(state) {
      return state.modalUser;
    },
   
  },
};
export default UserModule;
