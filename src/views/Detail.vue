<template>
  <div v-if="filmData">
    <detail-header v-scroll="50" :name="filmData.name"></detail-header>
    <div
      v-if="filmData.poster"
      class="film-poster"
      :style="{
        backgroundImage: 'url(' + filmData.poster + ')',
      }"
    ></div>
    <div class="film">
      <div class="col">
        <div>{{ filmData.name }}</div>
        <div style="color: dodgerblue">{{ filmData.grade }}分</div>
      </div>
      <div class="grey-text">{{ filmData.category }}</div>
      <div class="grey-text">{{ filmData.premiereAt | timeFilter }} 上映</div>
      <div class="grey-text">
        {{ filmData.nation }} | {{ filmData.runtime }}分钟
      </div>
      <div
        class="grey-text filmData-synopsis"
        :class="synopsisShow ? '' : 'hidden'"
      >
        {{ filmData.synopsis }}
      </div>
      <div class="flag" @click="synopsisShow = !synopsisShow">
        <i
          class="iconfont"
          :class="synopsisShow ? 'icon-shangla-tianchong' : 'icon-xiala'"
        ></i>
      </div>
      <div class="film-actor">
        <div>演职人员</div>
        <detail-swiper :perview="3.5" name="actors">
          <detail-swiper-item v-for="data in filmData.actors" :key="data.name">
            <div
              :style="{
                backgroundImage: 'url(' + data.avatarAddress + ')',
              }"
              class="avatar"
            ></div>
            <div class="actor-name">{{ data.name }}</div>
            <div class="actor-role">{{ data.role }}</div>
          </detail-swiper-item>
        </detail-swiper>
      </div>
      <div class="film-photo">
        <div class="title">剧照</div>
        <detail-swiper :perview="2" name="photos">
          <detail-swiper-item
            v-for="(data, index) in filmData.photos"
            :key="index"
          >
            <div
              :style="{
                backgroundImage: 'url(' + data + ')',
              }"
              class="avatar"
              @click="handlePreview(index)"
            ></div>
          </detail-swiper-item>
        </detail-swiper>
      </div>
    </div>
  </div>
</template>
<script>
import http from '@/util/http.js'
import Vue from 'vue'
import moment from 'moment'
import DetailSwiper from '@/components/detail/DetailSwiper.vue'
import DetailSwiperItem from '@/components/detail/DetailSwiperItem.vue'
import DetailHeader from '@/components/detail/DetailHeader.vue'
import { ImagePreview } from 'vant'
import obj from '../util/mixinsObj'

Vue.filter('timeFilter', (time) => {
  return moment(time * 1000).format('YYYY-MM-DD')
})
Vue.directive('scroll', {
  inserted (ele, binding) {
    window.onscroll = () => {
      if (
        document.documentElement.scrollTop ||
        document.body.scrollTop > binding.value
      ) {
        ele.style.display = 'block'
        // ele.style.visibility = "visible";
      } else {
        ele.style.display = 'none'
        // ele.style.visibility = "hidden";
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})
export default {
  mixins: [obj],
  components: { DetailSwiper, DetailSwiperItem, DetailHeader },
  methods: {
    handlePreview (index) {
      ImagePreview({
        images: this.filmData.photos,
        startPosition: index,
        closeable: true
      })
    }
  },
  mounted () {
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=8392208`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then((res) => {
      this.filmData = res.data.data.film
      // console.log(res.data.data.film);
    })
  },
  data () {
    return {
      filmData: [],
      synopsisShow: false
    }
  }
}
</script>
<style lang="scss" scoped>
.flag {
  text-align: center;
}
.hidden {
  overflow: hidden;
  height: 2.1111rem;
}
.film {
  padding: 0.6667rem 0.8333rem 0.8333rem 0.8333rem;
}
.film-poster {
  height: 12.4444rem;
  width: 100%;
  background-position: center;
  background-size: cover;
}
.col {
  display: flex;
  justify-content: space-between;
}
.filmData-synopsis {
  margin: 0.6667rem 0;
  line-height: 1.5;
}
.grey-text {
  font-size: 0.7222rem;
  color: #797d82;
  margin-top: 0.2222rem;
}
.film-actor {
  .actor-name {
    padding-top: 0.5556rem;
    font-size: 0.6667rem;
    color: #191a1b;
    text-align: center;
  }
  .actor-role {
    font-size: 0.5556rem;
    color: #797d82;
    text-align: center;
  }
}
.avatar {
  height: 4.7222rem;
  width: 100%;
  background-position: center;
  background-size: cover;
  margin-top: 0.5556rem;
}
.film-photo {
  padding-bottom: 2.7778rem;
  .title {
    padding: 0.8333rem 0;
  }
}
</style>
