//配置路由的地方
import {createRouter,createWebHashHistory} from 'vue-router'
import routes from './routes'
import store from '@/store'
const Router= createRouter({
    history:createWebHashHistory(),
    routes,
    scrollBehavior(to,from,savedPosition){
        return {top:0}
    }
})
//全局守卫,前置守卫（在路由跳转之前进行判断)
Router.beforeEach(async (to,from,next)=>{
    //获取要跳到的路由
    //from 获取到从哪个路由而来的信息
    //next:放行的函数 next() next(path)放行到指定的路由 next(false)
    console.log(to.path)
    //用户登录了才会有token,未登录一定不会有token
    let token=store.state.user.token
    //用户信息
    let name=store.state.user.userInfo.name
    // console.log(userInfo)
    //用户已经
    if(token){
        //用户已经登录了还想去login不行
        if(to.path=="/login"||to.path=='/register'){
            next('/')
        }else{
            //登录了，去的不是login
            //如果用户名已有
            if(name){
                next()
            }else{
                //没有用户信息,派发action让仓库存储用户信息再跳转
                try{
                    //获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next()
                }catch(error){
                    //token失效了获取不到用户信息，重新登录
                    //清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else{
        //未登录，不能去支付相关,不能去个人中心
        let toPath=to.path
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            //把未登录的时候想去而未能去成的信息，存储于路由中
            next('/login?redirect='+toPath)
        }else{
            next()
        }
    }
})
export default Router;
