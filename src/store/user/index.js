//登录、注册模块的小仓库
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import { setToken,getToken,removeToken} from '@/utils/token';
let state = {
     code:'',
     token:getToken('TOKEN'),
     userInfo:{}
};
let mutations = {
     GETCODE(state,code){
          state.code=code
     },
     USERLOGIN(state,token){
          state.token=token
     },
     GETUSERINFO(state,userInfo){
          state.userInfo=userInfo
     },
     //清除本地数据
     CLEAR(state){
          state.token=''
          state.userInfo={}
          //本地存储信息清空
          removeToken()
     }
};
let actions = {
     async getCode({commit},phone){
          let result=await reqGetCode(phone);
          if(result.code==200){
               commit("GETCODE",result.data)
               return 'ok'
          }else{
               return Promise.reject(new Error('fail'))
          }
     },
     //用户注册
     async userRegister({commit},user){
          let result=await reqUserRegister(user)
          if(result.code==200){
               return 'ok'
          }else{
               return Promise.reject(new Error('fail'))
          }
     },
     //登录业务(token)
     async userLogin({commit},data){
          let result=await reqUserLogin(data)
          //服务器下发的token是用户的唯一标识符，将来经常通过token跟服务器要用户信息进行展示
          if(result.code==200){
               //用户已经登录成功且获取到token
               commit("USERLOGIN",result.data.token)
               //持久化存储token
               setToken(result.data.token)
               return 'ok'
          }else{
               return Promise.reject(new Error('fail'))
          }
     },
     //获取用户信息
     async getUserInfo({commit}){
          let result=await reqUserInfo();
          if(result.code==200){
               commit("GETUSERINFO",result.data)
               return 'ok'
          }else{
               return Promise.reject(new Error('fail'))
          }
     },
     //退出登录
     async userLogout({commit}){
          //只是向服务器发起一次请求，通知服务器清除token
          let result=await reqLogout();
          //action里面不能操作state,提交mutation
          if(result.code==200){
               commit("CLEAR")
               return 'ok'
          }else{
               return Promise.reject(new Error('fail'))
          }
     }
};
let getters = {};

//对外暴露
export default {
     state,
     mutations,
     actions,
     getters
}