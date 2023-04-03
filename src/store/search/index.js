//search模块的小仓库
import { reqGetSearchInfo } from "@/api";
let state = {
     //仓库初始状态
     searchList:{}
};
let mutations = {
     GETSEARCHLIST(state,searchList){
          state.searchList=searchList
     }
};
let actions = {
     //获取search模块数据
     async getSearchList({commit},params={}){
          let result=await reqGetSearchInfo(params)
          if(result.code===200){
               commit('GETSEARCHLIST',result.data)
          }
     },
};
//getters:仓库的计算属性
//项目中:vuex的getters,为了简化数据而生。
let getters = {
     //当前形参state,当前仓库state,并非大仓库中的那个state
     goodsList(state){
          //state.searchList.goodsList如果服务器数据回来了，是一个数据
          //计算新的属性值至少给人家返回一个数组
          return state.searchList.goodsList
     },
     trademarkList(state){
          return state.searchList.trademarkList
     },
     attrsList(state){
          return state.searchList.attrsList
     }
};

//对外暴露
export default {
     state,
     mutations,
     actions,
     getters
}