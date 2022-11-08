<template>
  <div>
    <van-sticky>
      <van-tabs color="dodgerblue" @click="handleClick">
        <van-tab title="正在热映"></van-tab>
        <van-tab title="即将上映"></van-tab>
      </van-tabs>
    </van-sticky>
  </div>
</template>
<script>
import Vue from 'vue'

import { Tab, Tabs, Sticky } from 'vant'
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Sticky)
export default {
  methods: {
    handleClick (name, title) {
      if (title === '正在热映') {
        this.$router.push('/films/nowplaying')
      } else {
        this.$router.push('/films/comingsoon')
      }
    }
  }
}
</script>
