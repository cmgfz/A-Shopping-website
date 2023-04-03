import { createApp } from 'vue'
import App from './App.vue'
import Router from '@/router/index.js'
//三级联动组件-全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
import store from './store'
import '@/mock/mockServe'
//引入swiper样式
import "swiper/swiper.css"
import Carsousel from '@/components/Carousel/Carousel.vue';
import Pagination from '@/components/Pagination/Pagination.vue'
import * as API from '@/api'
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/loading.gif'
import myPlugins from './plugins/myPlugins'
//console.log(reqGetSearchInfo())
const app=createApp(App)
app.config.globalProperties.$API=API
app.use(Router).use(store).use(VueLazyload,{loading}).use(myPlugins,{ok:"hhhh"}).component(TypeNav.name,TypeNav).component(Carsousel.name,Carsousel).component(Pagination.name,Pagination)
app.mount('#app')