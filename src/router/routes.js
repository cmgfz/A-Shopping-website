//路由配置信息
// import Home from '@/pages/Home/Home.vue'
import Search from '@/pages/Search/Search.vue'
import Login from '@/pages/Login/index.vue'
import Register from '@/pages/Register/index.vue'
import Detail from '@/pages/Detail/index.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
import ShopCart from '@/pages/ShopCart/index.vue'
import Trade from '@/pages/Trade/index.vue'
import Pay from '@/pages/Pay/index.vue'
import PaySuccess from '@/pages/PaySuccess/index.vue'
import Center from '@/pages/Center/index.vue'
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder/index.vue'
import GroupOrder from '@/pages/Center/groupOrder/index.vue'
export default [
    {
        path:"/center",
        component:Center,
        meta:{show:true},
        //二级路由
        children:[
            {
                path:'myorder',
                component:MyOrder,
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    }, 
    {
        path:"/paysuccess",
        component:PaySuccess,
        meta:{show:true}
    }, 
    {
        path:"/pay",
        component:Pay,
        meta:{show:true},
        beforeEnter:(to,from,next)=>{
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    }, 
    {
        path:"/trade",
        component:Trade,
        meta:{show:true},
        beforeEnter:(to,from,next)=>{
            //去交易页面，必须是从购物车而来
            if(from.path=='/shopcart'){
                next()
            }else{
                //其它的路由组件而来
                next(false)
            }
        }
    },   
    {
        path:"/shopcart",
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:"/addcartsuccess",
        name:"addcartsuccess",
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        path:"/detail/:skuid",
        component:Detail,
        meta:{show:true}
    },
    {
        path:"/home",
        component:()=>import("@/pages/Home/Home.vue"),
        meta:{show:true}
    },
    {
        path:'/search/:keyword?',
        component:Search,
        meta:{show:true},
        name:"search",
        //路由组件传prop
        // props:true,
        //对象写法,额外给路由传递一些
        //props:{a:1,b:2},
        //函数写法:可以把params参数，query参数通过props传递给路由组件
        props:($route)=>{
            return {keyword:$route.params.key,a:1}
        }
    },
    {
        path:'/login',
        component:Login,
        meta:{show:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/home"
    }
]