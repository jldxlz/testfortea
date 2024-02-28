import Vuex from 'vuex';


export default new Vuex.Store({

  state: {
    // 存储token
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : ''
  },
/* actions: {
   changeLogin(ctx,token){
     ctx.commit('changeLogin',token);
   }
 },*/
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state,user) {
     state.token = user.token;
     state.userId = user.userId
     localStorage.setItem('token', user.token);
     localStorage.setItem('userId', user.userId);
    }
  }
});
