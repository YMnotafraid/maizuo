<template>
  <van-nav-bar
    fixed
    :title="name"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
</template>
<script>
import Vue from 'vue'
import { NavBar } from 'vant'

Vue.use(NavBar)
export default {
  props: {
    name: {
      type: String,
      default: '标题'
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped></style>
