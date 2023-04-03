<template>
<div class="type-nav">
<div class="container">
    <div @mouseleave="leaveShow" @mouseenter="enterShow">
    <h2 class="all">全部商品分类</h2>
    <transition name="sort">
    <div class="sort" v-show="show">
        <div class="all-sort-list2" @click="goSearch">
            <div class="item" v-for="(c1,index) in categoryList" :key="c1.catetoryId" :class="{cur:currentIndex===index}">
                <h3 @mouseenter="changeIndex(index)" >
                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!-- 二三级分类 -->
                <div class="item-list clearfix" :style="{display:currentIndex===index?'block':'none'}">
                    <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                        <dl class="fore">
                            <dt>
                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                            </dt>
                            <dd>
                                <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                </em>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    
    </div>
    </transition>
    </div>
    <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
    </nav>
</div>
</div>
</template>

<script>
//引入方式是全部引入
import throttle from 'lodash/throttle'
import {mapState} from 'vuex';
export default {
    name:"TypeNav",
    data(){
        return {
            //存储用户鼠标分类
            currentIndex:-1,
            show:true
        }
    },
    mounted(){
        //通知vuex发请求，获取数据，存储于仓库当中
        
        //当组件挂载完毕，让show属性变为false
        if(this.$route.path!='/home'){
            this.show=false
        }
    },
    computed:{
        ...mapState({
            categoryList:state=>state.home.categoryList    
        })
    },
    methods:{
        //鼠标进入修改响应式数据currentIndex属性
        // changeIndex(index){
        //     //index:鼠标移上某一个以及分类的元素的索引值
        //     //正常情况（用户慢慢地操作，鼠标进入，每一个一级分类h3,都会触发鼠标进事件
        //     //非正常情况，快速操作，只有部分触发。可能出现卡顿
        //     this.currentIndex=index
            
        // },
        changeIndex:throttle(function(index){
            this.currentIndex=index
        },50),
        //一级分类鼠标的移除
        leaveShow(){
            //鼠标移出currentIndex
            this.currentIndex=-1
            if(this.$route.path!="/home"){
            this.show=false
            }
        },
        //进行路由跳转的方法
        goSearch(event){
            //最好的解决方案，编程式导航+事件委派
            let element=event.target
            //节点有一个属性dataset属性，可以获取节点的自定义属性和属性值
            console.log(element)
            let {categoryname,category1id,category2id,category3id}=element.dataset;
            if(categoryname){
                //整理路由跳转的参数
                console.log("hi")
                let location={name:"search"};
                let query={categoryName:categoryname}
                //一级分类、二级分类，三级分类的a标签
                if(category1id){
                    query.category1Id=category1id
                }else if(category2id){
                    query.category2Id=category2id
                }else{
                    query.category3Id=category3id
                }
                //如果路由跳转时有params参数,带进去
                if(this.$route.params){
                    location.params=this.$route.params;
                    location.query=query;
                    this.$router.push(location)
                }
            }

        },
        //当鼠标移入的时候，让商品分类列表进行展示
        enterShow(){
            this.show=true
        }
    }

}
//组件挂载完毕，向服务器发请求
</script>

<style scope lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }
                .cur{
                    background:skyblue
                }
            }
        }
        //过渡动画的样式
        .sort-enter-from{
            height:0px;
        }
        .sort-enter-to{
            height: 461px;
        }
        //定义动画时间和速率
        .sort-enter-active{
            transition:all .5s linear;
        }
    }
}
</style>