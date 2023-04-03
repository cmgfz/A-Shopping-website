import {createStore} from 'vuex'
//引入小仓库
import home from './home';
import search from './search';
import detail from './detail';
import user from './user';
import  shopcart from './shopcart'
import trade from './trade';
export default createStore({
    modules: {
        home,
        search,
        detail,
        user,
        shopcart,
        trade
    }
})