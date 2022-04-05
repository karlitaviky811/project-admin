import axios from "axios";
import router from "@/router";
const QrsModule = {
    state: {
        QrsList: [],
        modalQrs: {

        },
        requestList: []
    },
    mutations: {
        setQrsList(state, data) {
            state.QrsList = data;
            console.log(state.QrsList)
        },
        setQrsModal(state, data) {

            const qrs = {
                _id: data._id,
                date: data.date,
                type: data.type,
                title: data.title,
                project: data.project,
                description: data.description,
                status: data.status
            }
            state.modalQrs = qrs;
        },
        setRequestsList(state, data) {

            state.requestList = data;
        },
    },
    actions: {
        GET_QRS_ALL: async function ({ commit }) {
            axios.get("http://localhost:3999/api/qrs/list", {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }
            ).then((response) => {
                console.log("response projects", response)
                commit('setQrsList', response.data.qrs)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        SAVE_QRS: async function ({ commit }, data) {
            const qrs = {
                date: data.date,
                type: data.type,
                title: data.title,
                project: data.project,
                description: data.description
            }
            axios.post("http://localhost:3999/api/project/save", qrs, {
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
                title: data.title,
                description: data.description,
                department: data.department,
                tecnology: data.tecnology
            }
            axios.put("http://localhost:3999/api/project/update/" + data._id, proj, {
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
        DELETE_PROJECT_REQ: async function ({ commit }) {
            const proj = {
                title: data.title,
                description: data.description,
                department: data.department,
                tecnology: data.tecnology
            }
            axios.put("http://localhost:3999/api/project/delete/" + data._id, {
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
    },
    getters: {
        QrsList(state) {
            return state.QrsList;
        },
        modalQrs(state) {
            return state.modalQrs;
        }
    },
};
export default QrsModule;
