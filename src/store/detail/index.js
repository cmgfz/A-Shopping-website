//detail模块的小仓库
import {reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api"
import {getUUID} from '@/utils/USER_ID'
let state = {
     goodInfo:{},
     cCIFlag:0,
     uuid_token:getUUID()
};
let mutations = {
     GETGOODINFO(state,goodInfo){
          state.goodInfo=goodInfo
     }
};
let actions = {
     //获取产品信息的action
     async getGoodInfo({commit},skuId){
          let result=await reqGoodsInfo(skuId)
          if(result.code==200){
               commit('GETGOODINFO',result.data)
          }
     },
     cCI({state},cI){
          state.cCIFlag=cI
     },
     //将产品添加到购物车中
     async addOrUpdateShopCart({commit},{skuId,skuNum}){
          //加入购物车返回的结果
          //加入购物车以后（发请求），前台将参数带给服务器
          //服务器写入数据成功，并没有返回其它的数据，只是返回code=200,代表这次操作成功。
          //服务器没有返回参数，所以不需要使用vuex
          let result=await reqAddOrUpdateShopCart(skuId,skuNum)
          //代表服务器加入购物车成功
          if(result.code==200){
               return "ok"
          }else{
               //代表加入购物车失败
               return Promise.reject(new Error('fail'))
          }
     }
};
//项目中仓库的getters为了简化数据而生【组件获取数据更加方便】
let getters = {
     //路径导航简化的数据
     categoryView(state){
          //state.goodInfo初始状态空对象，空对象的categoryView是undefined,读取undefined的属性会报错。
          return state.goodInfo.categoryView||{}
     },
     skuInfo(state){
          return state.goodInfo.skuInfo||{}
     },
     spuSaleAttrList(state){
          return state.goodInfo.spuSaleAttrList||[]
     }
};

//对外暴露
export default {
     state,
     mutations,
     actions,
     getters
}