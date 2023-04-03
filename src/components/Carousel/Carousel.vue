<template>
<div class="swiper" id="floor1Swiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
            <img :src="carousel.imgUrl">
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>
</template>

<script>
import Swiper from 'swiper';
export default{
    name:"Carousel",
    props:['list'],
    watch:{
        list:{
            //不管数据有没有变化，上来立即监听一下。
            immediate:true,
            handler(){
                //只能监听到数据已经有啦，结构还是
                this.$nextTick(()=>{
                    var mySwiper=new Swiper('.swiper', {
                    loop: true, // 循环模式选项
                    
                    // 如果需要分页器
                    pagination: {
                    el: '.swiper-pagination',
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    },
                    
                    })    
                })

            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>