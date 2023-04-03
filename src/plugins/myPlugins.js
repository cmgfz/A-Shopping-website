//vue的插件暴露一个对象，
let myPlugins={}
myPlugins.install=function(vue,options){
    console.log('调用我的插件',vue,options)
}
export default myPlugins