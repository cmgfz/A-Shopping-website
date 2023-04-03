//home模块专享的小仓库
import { reqCategoryList,reqGetBannerList,reqFloorList} from "@/api";
let state = {
    //state中数据的默认初始值
    categoryList:[],
    bannerList:[],
    floorList:[],
    changeKeyword:false
};
//唯一可以修改仓库数据地方【工人】
let mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
    }

};
//可以处理业务逻辑【if、异步语句等等】
let actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取数据
    async getCategoryList({commit}){
        let result=await reqCategoryList();
        if(result.code===200){
            commit("CATEGORYLIST",result.data);
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        let result=await reqGetBannerList();
            if(result.code==200){
                commit('GETBANNERLIST',result.data)
            }
    },
    //获取floor数据
    async getFloorList({commit}){
        let result=await reqFloorList();
        if(result.code==200){
            //提交mutation
            commit('GETFLOORLIST',result.data)
        }
    },
    clear({state}){
        console.log("clear",state)
        state.changeKeyword=!state.changeKeyword
    }
};
//仓库计算属性
let getters = {};

//对外暴露小仓库
export default {
    state,
    mutations,
    actions,
    getters
}




