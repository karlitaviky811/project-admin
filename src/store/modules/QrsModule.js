import axios from "axios";
import router from "@/router";
import Vue from 'vue';
const QrsModule = {
    state: {
        QrsList: [],
        QrsListUser: [],
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
        setRQrsListUser(state, data) {

            state.QrsListUser = data;
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
                axios.get("http://localhost:3999/api/qrs/list", {
                    headers: {
                        "Authorization": localStorage.getItem('token'),
                    }
                }
                ).then((response) => {
                    commit('setQrsList', response.data.qrs)
                    Vue.$toast.open({
                        message: 'Opinión guardada con éxito!',
                        type: 'success',
                        position: 'top-right'
                        // all of other options may go here
                    });
                    return true;
                }, (err) => {
                    console.log(err)
                    return false;
                })
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
                axios.get("http://localhost:3999/api/qrs/list", {
                    headers: {
                        "Authorization": localStorage.getItem('token'),
                    }
                }
                ).then((response) => {
                    Vue.$toast.open({
                        message: 'Opinión actualizada con éxito!',
                        type: 'success',
                        position: 'top-right'
                        // all of other options may go here
                    });
                    commit('setQrsList', response.data.qrs)
                    return true;
                }, (err) => {
                    console.log(err)
                    return false;
                })
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
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        DELETE_QRS: async function ({ commit }, data) {
            const user = JSON.parse(localStorage.getItem("user"))._id;
            console.log("data", data)
            axios.delete("http://localhost:3999/api/qrs/delete/" + data, {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }).then((response) => {
                console.log("response project update", response)
                axios.get("http://localhost:3999/api/qrs/list", {
                    headers: {
                        "Authorization": localStorage.getItem('token'),
                    }
                }
                ).then((response) => {

                    Vue.$toast.open({
                        message: 'Opinión eliminada con éxito!',
                        type: 'success',
                        position: 'top-right'
                        // all of other options may go here
                    });
                    commit('setQrsList', response.data.qrs)
                    return true;
                }, (err) => {
                    console.log(err)
                    return false;
                })
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        GET_QRS_USER:async function({commit}, data){
            axios.get("http://localhost:3999/api/qrs/listUser/"+data, {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                  }
            }
            ).then((response) => {
                console.log("res", res)
                commit('setQrsList', response.data.qrs)
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
        QrsListUser(state) {
            return state.QrsList;
        },
        modalQrs(state) {
            return state.modalQrs;
        }
    },
};
export default QrsModule;
