//当前这个模块，对所有API接口进行统一管理
import requests from "./ajax";
import mockRequests from './mockAjax'
//三级联动的接口
///api/product/getBaseCategoryList get 无参数

export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'})
    //发情求,axios发请求返回的是Promise对象
//获取banner(Home首页轮播图接口)
export const reqGetBannerList=()=>mockRequests.get('/banner')

//获取floor数据
export const reqFloorList=()=>mockRequests.get('/floor')

//获取搜索模块,地址:/api/list 请求方式post 参数：需要带参数
//当前这个函数不需要接收外部传递参数
//当前这个接口，给服务器产参数，至少
export const reqGetSearchInfo=(params)=>requests({url:"/list",method:"post",data:params})

//获取产品详情信息的接口 URL:/api/item/{id} 请求方式:get
export const reqGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'get'})

//将产品添加到购物车中（获取更新某一个产品的个数）
///api/cart/addToCart/{skuId}/{skuNum} POST
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//获取购物车列表数据接口
//URL:/api/cart/cartList method:get
export const reqCartList=()=>requests({url:'/cart/cartList',method:'get'})

//删除购物车产品的接口
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改商品的选中状态
export const reqUpdateCheckedById=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码
//URL:/api/user/passport/sendCode/{phone} method:get
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册
//url:/api/user/passport/register 
export const reqUserRegister=(data)=>requests({url:'/user/passport/register',data,method:'post'})

//登录
//URL
export const reqUserLogin=(data)=>requests({url:'/user/passport/login',data,method:'post'})

//获取用户信息,需要带着用户的token向服务器要用户信息
export const reqUserInfo=()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录
export const reqLogout=()=>requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息
//URL
export const reqAddressInfo=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取商品清单
//
export const reqOrderInfo=()=>requests({url:'/order/auth/trade',method:'get'})

//提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo} method:post
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})

//获取支付信息
//URL:
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取支付订单状态
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取个人中心的数据
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})