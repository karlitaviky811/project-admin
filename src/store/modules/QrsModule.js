import axios from "axios";
import router from "@/router";
const QrsModule = {
    state: {
        QrsList: [],
        modalQrs: {
            feedBack: {
                comment: ''
            }
        },
        requestList: []
    },
    mutations: {
        setQrsList(state, data) {
            state.QrsList = data;
            console.log(state.QrsList)
        },
        setQrsModal(state, data) {
            console.log("data", data)
            const qrs = {
                _id: data._id,
                date: data.date,
                type: data.type,
                title: data.title,
                project: data.project,
                description: data.description,
                status: data.status,
                feedBack: {
                    comment: data.feedBack.comment
                }
            }
            console.log("pqrs--->", qrs)
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
                commit('setQrsList', response.data.qrs)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        SAVE_QRS: async function ({ commit }, data) {
            const qrs = {
                type: data.type,
                title: data.title,
                project: data.project,
                description: data.description,
                feedBack: ''
            }
            axios.post("http://localhost:3999/api/qrs/add", qrs, {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }).then((response) => {
                console.log("response pqrs create", response)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        UPDATE_QRS: async function ({ commit }, data) {
            const qrs = {
                date: data.date,
                type: data.type,
                title: data.title,
                project: data.project,
                description: data.description,
                status: data.status,
                feedBack: data.feedBack.comment
            }
            axios.put("http://localhost:3999/api/qrs/update/" + data._id, qrs, {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }).then((response) => {
                console.log("response qrs update", response)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        UPDATE_QRS_FEEDBACK: async function ({ commit }, data) {
            console.log("data--->", data)
            const qrs = {
                date: data.date,
                type: data.type,
                title: data.title,
                project: data.project,
                description: data.description,
                status: 'Feedback del Administrador',
                feedBack: data.feedBack.comment
            }
            axios.put("http://localhost:3999/api/qrs/update/status/" + data._id, qrs, {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }).then((response) => {
                console.log("response qrs update", response)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        DELETE_QRS: async function ({ commit }, data) {
         
            console.log("data", data)
            axios.delete("http://localhost:3999/api/qrs/delete/" + data, {
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
