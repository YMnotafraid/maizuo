<template>
  <div v-if="$store.state.isShow">
    <van-tabbar route active-color="dodgerblue" inactive-color="#000">
      <van-tabbar-item replace to="/films" icon="video-o">电影</van-tabbar-item>
      <van-tabbar-item replace to="/cinemas" icon="home-o"
        >影院</van-tabbar-item
      >
      <van-tabbar-item replace to="/center" icon="friends-o"
        >主页</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<script>
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant'
Vue.use(Tabbar)
Vue.use(TabbarItem)
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>
