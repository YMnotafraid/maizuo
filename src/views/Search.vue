<template>
  <div>
    <van-search
      show-action
      v-model="value"
      @input="handleInput"
      @cancel="handleCancel"
      placeholder="输入影城名称"
    />
    <cinemas-list v-if="value" :List="searchList"></cinemas-list>
  </div>
</template>
<script>
import Vue from 'vue'
import { Search } from 'vant'
import CinemasList from '../components/cinemas/CinemasList.vue'
import obj from '../util/mixinsObj'

Vue.use(Search)
export default {
  mixins: [obj],
  components: { CinemasList },
  methods: {
    handleInput () {
      this.searchList = this.$store.state.cinemaList.filter(
        (item) =>
          item.name.toUpperCase().includes(this.value.toUpperCase()) ||
          item.address.toUpperCase().includes(this.value.toUpperCase())
      )
    },
    handleCancel () {
      this.$router.back()
    }
  },
  data () {
    return {
      value: '',
      searchList: []
    }
  }
}
</script>
