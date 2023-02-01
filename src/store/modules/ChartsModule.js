import axios from "axios";
import router from "@/router";
const ChartsModule = {
    state: {
        chartsListPSC: [],
        chartsListRPM: {},
        chartsListRPMA: [],
        chartsListRPMR: [],
        requestList: []
    },
    mutations: {
        setChartsListPSC(state, data) {
            state.chartsListPSC = data;
        },
        setChartsListRPM(state, data) {
            state.chartsListRPM = data.data;

            console.log("state", state.chartsListRPM)
        },
        setChartsListRSA(state, data){
            state.chartsListRPMA = data.data
        },
        setChartsListRSR(state, data){
            state.chartsListRPMR = data.data
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
                commit('setChartsListRSA', response.data)
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
                commit('setChartsListRSR', response.data)
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
        }
    },
};
export default ChartsModule;
