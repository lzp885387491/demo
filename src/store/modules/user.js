// 用户模块
export default {
    namespaced: true,
    state: {
        userInfoData: {},
        avatarImg:''
    },
    getters: {},
    mutations: {
        userInfoData: (state, payload) => {
            state.userInfoData = payload;
        },
        avatarImg: (state, payload) => {
            state.avatarImg = payload;
        }
    },
    actions: {},
}
