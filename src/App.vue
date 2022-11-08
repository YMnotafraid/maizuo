<template>
  <div id="app">
    <router-view></router-view>
    <MyTabbar></MyTabbar>
  </div>
</template>
<script>
import 'vant/lib/index.css'
import MyTabbar from '@/components/MyTabbar.vue'
export default {
  components: {
    MyTabbar
  }
}
</script>
