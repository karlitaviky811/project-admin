import axios from "axios";
import router from "@/router";
const ChartsModule = {
    state: {
        chartsListPSC: [],
        chartsListRPM: {},
        requestList: []
    },
    mutations: {
        setChartsListPSC(state, data) {
            state.chartsListPSC = data;
            console.log("stateList",state.chartsListPSC)
        },
        setChartsListRPM(state, data) {
            state.chartsListRPM = data.data;

            console.log("state", state.chartsListRPM)
        },
    },
    actions: {
        GET_LIST_PROJECTS_STATE_CREATE: async function ({ commit }) {
            axios.get("http://localhost:3999/api/req/request/graph/project/", {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            }
            ).then((response) => {
                console.log("response list", response)
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
                console.log("response list chart", response)
                commit('setChartsListRPM', response.data)
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
    },
};
export default ChartsModule;
