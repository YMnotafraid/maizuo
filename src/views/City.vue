<template>
  <van-index-bar :index-list="computedList" @select="handleSelect">
    <div v-for="data in cityList" :key="data.type">
      <van-index-anchor :index="data.type" />
      <van-cell
        v-for="item in data.list"
        :key="item.cityId"
        :title="item.name"
        @click="handleClick(item)"
      />
    </div>
  </van-index-bar>
</template>
<script>
import Vue from 'vue'
import { IndexBar, IndexAnchor, Cell, Toast } from 'vant'
import http from '@/util/http.js'
import obj from '../util/mixinsObj'
Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Cell)
Vue.use(Toast)
export default {
  mixins: [obj],
  data () {
    return {
      cityList: []
    }
  },
  computed: {
    computedList () {
      return this.cityList.map((item) => item.type)
    }
  },
  mounted () {
    http({
      url: 'gateway?k=8786170',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then((res) => {
      this.cityList = this.renderCity(res.data.data.cities)
    })
  },
  methods: {
    handleClick (city) {
      this.$router.push('/cinemas')
      this.$store.commit('changeCityName', city.name)
      this.$store.commit('changeCityId', city.cityId)
    },
    handleSelect (data) {
      Toast(data)
    },
    renderCity (cityList) {
      let list = []
      const sortList = []
      for (let i = 65; i < 91; i++) {
        list = cityList.filter(
          (item) =>
            item.pinyin.substring(0, 1).toUpperCase() === String.fromCharCode(i)
        )
        list.length &&
          sortList.push({
            type: String.fromCharCode(i),
            list: list
          })
      }
      console.log(sortList)
      return sortList
    }
  }
}
</script>
