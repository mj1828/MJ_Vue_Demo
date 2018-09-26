import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        userName: localStorage.getItem('userName'),
        token:''
    },
    mutations: {
      setUserName(state, userName) {
        state.userName = userName
      },
      setToken(state, token) {
        state.token = token
      }
    },
    getters: {
      getUserName: state =>{
        return state.userName
      }
    }
});