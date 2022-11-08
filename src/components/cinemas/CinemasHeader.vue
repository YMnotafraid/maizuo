<template>
  <van-nav-bar
    title="影院"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #left>
      <div>{{ $store.state.cityName }}<van-icon name="arrow-down" /></div>
    </template>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
</template>
<script>
import Vue from 'vue'
import { NavBar, Icon } from 'vant'

Vue.use(Icon)
Vue.use(NavBar)
export default {
  methods: {
    onClickLeft () {
      this.$router.push('/city')
      this.$store.commit('changeCity')
    },
    onClickRight () {
      this.$router.push('/cinemas/search')
    }
  }
}
</script>
