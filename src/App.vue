<template>
<div>
  <Header></Header>
<router-view></router-view>
<!-- 在home，search显示，在登录，注册隐藏 -->
<Footer v-show="$route.meta.show"></Footer>
</div>
</template>

<script>
import Header from './components/header/header.vue';
import Footer from './components/footer/footer.vue';
export default{
  name:"",
  components:{
    Header,
    Footer
  },
  mounted(){
    this.$store.dispatch('getCategoryList')
  }
}
</script>

<style lang="less">

</style>
