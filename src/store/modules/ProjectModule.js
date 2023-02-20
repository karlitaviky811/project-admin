import axios from "axios";
import router from "@/router";
const ProjectsModule = {
  state: {
    projectsList: [],
    modalProject: {

    },
    requestList: []
  },
  mutations: {
    setProjectsList(state, data) {
      state.projectsList = data;
    },
    setRequestsProjectModal(state, data) {

      console.log("data", data)
      const project = {
        _id: data._id,
        date: data.date,
        title: data.title,
        description: data.description,
        department: data.department,
        tecnology: data.tecnology,
      }
      state.modalProject = project;
    },
    setRequestsList(state, data) {

      state.requestList = data;
    },
  },
  actions: {
    GET_PROJECTS_ALL: async function ({ commit }) {
      axios.get("http://localhost:3999/api/project/projects/").then((response) => {
        console.log("response projects", response)
        commit('setProjectsList', response.data.project)
        return true;
      }, (err) => {
        console.log(err)
        return false;
      })

    },
    SAVE_PROJECT_REQ: async function ({ commit }, data) {
      const proj = {
        title : data.title,
        description : data.description,
        department : data.department,
        tecnology : data.tecnology
      }
      axios.post("http://localhost:3999/api/project/save", proj, {
        headers: {
          "Authorization": localStorage.getItem('token'),
        }
      }).then((response) => {
        console.log("response project create", response)
        return true;
      }, (err) => {
        console.log(err)
        return false;
      })

    },
    UPDATE_PROJECT_REQ: async function ({ commit }, data) {
      const proj = {
        title : data.title,
        description : data.description,
        department : data.department,
        tecnology : data.tecnology
      }
      axios.put("http://localhost:3999/api/project/update/"+data._id, proj, {
        headers: {
          "Authorization": localStorage.getItem('token'),
        }
      }).then((response) => {
        console.log("response project update", response)
        return true;
      }, (err) => {
        console.log(err)
        return false;
      })

    },
    DELETE_PROJECT_REQ: async function ({ commit }, data) {
      console.log("data", data)
    
      axios.delete("http://localhost:3999/api/project/delete/"+data, {
        headers: {
          "Authorization": localStorage.getItem('token'),
        }
      }).then((response) => {
        console.log("response project delete", response)
        return true;
      }, (err) => {
        console.log(err)
        return false;
      })

    },
  },
  getters: {
    projectsList(state) {
      return state.projectsList;
    },
    modalProject(state) {
      return state.modalProject;
    }
  },
};
export default ProjectsModule;
