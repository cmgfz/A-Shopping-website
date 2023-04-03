import { reqCartList,reqDeleteCartById,reqUpdateCheckedById} from "@/api";
let state = {
     cartList:[],
};
let mutations = {
     GETCARTLIST(state,cartList){
          state.cartList=cartList
     }
};
let actions = {
     //获取购物车列表的数据
     async getCartList({commit}){
          let result=await reqCartList();
          if(result.code==200){
               commit("GETCARTLIST",result.data)
          }
     },
     //删除购物车某一个产品
     async deleteCartListBySkuId({commit},skuId){
          let result=await reqDeleteCartById(skuId)
          if(result.code==200){
               return 'ok'
          }else{
               return Promise.reject(new Error('fail2'))
          }
     },
     //修改购物车某一个产品选中的状态
     async updateCheckedById({commit},{skuId,isChecked}){
          let result=await reqUpdateCheckedById(skuId,isChecked)
          if(result.code==200){
               return 'ok'
          }else{
               return Promise.reject(new Error('fail3'))
          }
     },
     //删除全部勾选的产品
     deleteAllCheckedCart({dispatch,getters}){
          //context小仓库，commit,getters,dispatch(派发action)
          //获取购物车中全部产品
          let PromiseAll=[]
          getters.cartList.cartInfoList.forEach(item=>{
               let promise=item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''
               //每次添加
               PromiseAll.push(promise)
          })
          //只要全部的p1|p2都成功，返回结果即为成功
          //如果有一个失败，返回即为失败结果
          return Promise.all(PromiseAll)
     },
     //修改所有产品的状态
     updateAllCartIsChecked({dispatch,state},isChecked){
          console.log(state)
          console.log(isChecked)
          let promiseAll=[]
          state.cartList[0].cartInfoList.forEach(item=>{
               let promise=dispatch('updateCheckedById',{
                    skuId:item.skuId,
                    isChecked,
               });
               promiseAll.push(promise)
          })
          return Promise.all(promiseAll)
     }
};
let getters = {
     cartList(state){
          return state.cartList[0]||{}
     },
     //计算出来购物车数据
     // cartInfoList(state){
     //      return state.
     // }
};

//对外暴露
export default {
     state,
     mutations,
     actions,
     getters
}