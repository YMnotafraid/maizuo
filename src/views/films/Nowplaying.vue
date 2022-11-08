<template>
  <div class="film-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <li
        class="film-list-item"
        v-for="data in filmsList"
        :key="data.filmId"
        @click="handleClick(data.filmId)"
      >
        <div class="film-l"><img :src="data.poster" alt="" /></div>
        <div class="film-r">
          <div class="film-name">{{ data.name }}</div>
          <div class="film-smallsize">
            观众评分：<span style="color: dodgerblue">{{ data.grade }}</span>
          </div>
          <div class="film-smallsize film-actors">
            主演：{{ data.actors | actorsFilter }}
          </div>
          <div class="film-smallsize">
            {{ data.nation }} | {{ data.runtime }}分钟
          </div>
        </div>
      </li>
    </van-list>
  </div>
</template>
<script>
import http from '../../util/http'
import Vue from 'vue'
import { List } from 'vant'

Vue.use(List)
Vue.filter('actorsFilter', (data) => {
  return data === undefined
    ? '暂无主演'
    : data.map((item) => item.name).join(',')
})
export default {
  methods: {
    handleClick (filmId) {
      this.$router.push(`/detail/${filmId}`)
    },
    onLoad () {
      console.log('load')
      if (this.filmsList.length >= this.total && this.total !== 0) {
        this.finished = true
      }
      this.current++
      http({
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=921753`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        this.filmsList = [...this.filmsList, ...res.data.data.films]
        // 加载状态结束
        this.loading = false
      })
    }
  },
  mounted () {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=921753`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      this.filmsList = res.data.data.films
      this.total = res.data.data.total
    })
  },
  data () {
    return {
      filmsList: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  }
}
</script>
<style lang="scss" scoped>
.film-list {
  padding: 0 0 2.7778rem 0;
}
.film-l {
  img {
    width: 3.6667rem;
    height: 5.1333rem;
  }
}
.film-r {
  padding: 0 0.5556rem;
  .film-name {
    width: 100%;
    color: #191a1b;
    font-size: 0.8889rem;
    height: 1.2222rem;
    line-height: 1;
    margin-right: 0.2778rem;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .film-actors {
    width: 100%;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.film-smallsize {
  font-size: 0.7222rem;
  margin-top: 0.2222rem;
  color: #797d82;
}
.film-list-item {
  display: flex;
  padding: 0.8333rem;
}
</style>
