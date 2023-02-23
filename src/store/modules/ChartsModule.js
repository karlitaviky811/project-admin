import axios from "axios";
import router from "@/router";
const ChartsModule = {
    state: {
        chartsListPSC: [],
        chartsListRPM: {},
        chartsListRPMA: [],
        chartsListRPMR: [],
        chartsListPSCUSER: [],
        chartsListRPMUSER: {},
        chartsListRPMAUSER: [],
        chartsListRPMRUSER: [],
        chartsListQRSUsers: [],
        chartsListQRSByUser: [],
        chartsQrsProjectR: [],
        chartsQrsProjectS: [],
        chartsQRSAll: [],
        requestList: []
    },
    mutations: {
        setChartsListPSC(state, data) {
            state.chartsListPSC = data;
        },
        setChartsListRPM(state, data) {
            state.chartsListRPM = data.data;
        },
        setChartsListRSA(state, data){
            state.chartsListRPMA = data.data
        },
        setChartsListRSR(state, data){
            state.chartsListRPMR = data.data
        },
        setChartsListPSCUSER(state, data) {
            state.chartsListPSCUSER = data;
        },
        setChartsListRPMUSER(state, data) {
            state.chartsListRPMUSER = data.data;
        },
        setChartsListRSAUSER(state, data){
            state.chartsListRPMAUSER = data
        },
        setChartsListRSRUSER(state, data){
            state.chartsListRPMRUSER = data
        },
        setChartsListQRSUsers(state, data){
            state.chartsListQRSUsers = data
        },
        setChartsListQRSByUser(state, data){
            state.chartsListQRSByUser = data
        },
        setChartsQrsProjectR(state, data){
            state.chartsQrsProjectR = data
        },
        setChartsQRSAll(state,data){
            state.chartsQRSAll = data;
        }
    },
    actions: {
        GET_LIST_PROJECTS_STATE_CREATE: async function ({ commit }) {
            axios.get("http://localhost:3999/api/req/request/graph/project/", {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }
            ).then((response) => {
                commit('setChartsListPSC', response.data.reqStatus)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        GET_LIST_REQUEST_MONTS: async function ({ commit }) {
            axios.get("http://localhost:3999/api/req/request/graph/monts", {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }
            ).then((response) => {
                commit('setChartsListRPM', response.data)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        GET_LIST_REQUEST_MONTS_A: async function ({ commit }) {
            axios.get("http://localhost:3999/api/req/request/graph/montsA", {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }
            ).then((response) => {
                console.log("res-------------------------------", response)
                commit('setChartsListRSA', response.data.reqStatus)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        GET_LIST_REQUEST_MONTS_R: async function ({ commit }) {
            axios.get("http://localhost:3999/api/req/request/graph/montsR", {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }
            ).then((response) => {
                console.log("response0000000000000000000", response)
                commit('setChartsListRSR', response.data)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        GET_LIST_PROJECTS_STATE_CREATE_USER: async function ({ commit }) {
            axios.get("http://localhost:3999/api/req/request/graph/project/", {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }
            ).then((response) => {
                commit('setChartsListPSCUSER', response.data.reqStatus)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        GET_LIST_REQUEST_MONTS_USER: async function ({ commit }, data) {
            console.log("data", data)
            axios.get("http://localhost:3999/api/req/request/graph/monts/"+data, {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }
            ).then((response) => {
                console.log("response", response, data)
                commit('setChartsListRPMUSER', response.data)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        GET_LIST_REQUEST_MONTS_R_USER: async function ({ commit }) {
            const user = JSON.parse(localStorage.getItem("user"))._id;
            axios.get("http://localhost:3999/api/req/request/graph/montsRUser/"+user, {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }
            ).then((response) => {
                commit('setChartsListRSRUSER', response.data)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        GET_LIST_REQUEST_MONTS_A_USER: async function ({ commit }) {
            const user = JSON.parse(localStorage.getItem("user"))._id;
            axios.get("http://localhost:3999/api/req/request/graph/montsAUser/"+user, {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }
            ).then((response) => {
                commit('setChartsListRSAUSER', response.data)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        GET_LIST_QRS: async function ({ commit }) {
           
            axios.get("http://localhost:3999/api/req/request/graph/project/qrsT", {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }
            ).then((response) => {
                console.log("hereeeeeeeeeeeeeeeeeeee***********", response)
                commit('setChartsListQRSUsers', response.data.reqStatus)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        GET_LIST_QRS_USER: async function ({ commit }, data) {
           
            axios.get("http://localhost:3999/api/req/request/graph/project/qrsT/"+data, {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }
            ).then((response) => {
                console.log("hereeeeeeeeeeeeeeeeeeee***********", response)
                commit('setChartsListQRSByUser', response.data.reqStatus)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        GET_LIST_QRS_PROJECTR: async function ({ commit }, data) {
           
            axios.get("http://localhost:3999/api/req/request/graph/project/qrsQR", {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }
            ).then((response) => {
                console.log("hereeeeeeeeeeeeeeeeeeee***********", response)
                commit('setChartsQrsProjectR', response.data.reqStatus)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        GET_LIST_QRS_PROJECTR_USER: async function ({ commit }, data) {
           
            axios.get("http://localhost:3999/api/req/request/graph/project/qrsQR/"+data, {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }
            ).then((response) => {
                console.log("hereeeeeeeeeeeeeeeeeeee***********", response)
                commit('setChartsQrsProjectR', response.data.reqStatus)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        
        GET_LIST_QRS_ALL: async function ({ commit }) {
           
            axios.get("http://localhost:3999/api/req/request/graph/project/qrs-all/", {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }
            ).then((response) => {
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaa", response.data.data)
                commit('setChartsQRSAll', response.data)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },
        GET_LIST_QRS_ALL_USER: async function ({ commit },data) {
           
            axios.get("http://localhost:3999/api/req/request/graph/project/qrs-all/"+data, {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }
            ).then((response) => {
                console.log("bbbbbbbbbbbbbbbbbbbbbbb", response.data.data)
                commit('setChartsQRSAll', response.data)
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })

        },

    },
    getters: {
        chartsListPSC(state) {
            return state.chartsListPSC;
        },
        chartsListRPM(state) {
            return state.chartsListRPM;
        },
        chartsListRPMA(state){
            return state.chartsListRPMA
        },
        chartsListRPMR(state){
            return state.chartsListRPMR
        },
        chartsListPSCUSER(state) {
            return state.chartsListPSCUSER;
        },
        chartsListRPMUSER(state) {
            return state.chartsListRPMUSER;
        },
        chartsListRPMAUSER(state){
            return state.chartsListRPMAUSER;
        },
        chartsListRPMRUSER(state){
            return state.chartsListRPMRUSER;
        },
        chartsQRSAll(state){
            console.log("heree state", state.chartsQRSAll)
            return state.chartsQRSAll
        },
        chartsListQRSUsers(state){
            console.log("heree state", state.chartsListQRSUsers)
            return state.chartsListQRSUsers;
        },
        chartsListQRSByUser(state){
           return  state.chartsListQRSByUser
        },
        chartsQrsProjectR(state){
            return state.chartsQrsProjectR
        },
        chartsQrsProjectRUser(state){
            return state.chartsQrsProjectRUser
        },
       


    },
};
export default ChartsModule;
