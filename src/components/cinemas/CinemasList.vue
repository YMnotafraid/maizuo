<template>
  <div
    class="box"
    :style="{
      height: height,
    }"
  >
    <ul>
      <li v-for="data in List" :key="data.cinemaId" class="cinema">
        <div class="cinema-l">
          <div class="cinema-name">{{ data.name }}</div>
          <div class="cinema-address">{{ data.address }}</div>
        </div>
        <div class="cinema-r">
          <div>￥{{ data.lowPrice / 100 }}起</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { mapState, mapActions } from 'vuex'
export default {
  props: ['List'],
  computed: {
    ...mapState(['cinemaList'])
  },
  methods: {
    ...mapActions(['getCinemaList'])
  },
  mounted () {
    this.height = document.documentElement.clientHeight - 50 - 46 + 'px'
    if (this.cinemaList.length === 0) {
      this.getCinemaList().then((res) => {
        this.$nextTick(() => {
          const bs = new BScroll('.box', {
            scrollbar: {
              fade: true
            }
          })
        })
      })
    } else {
      console.log('缓存')
      this.$nextTick(() => {
        const bs = new BScroll('.box', {
          scrollbar: {
            fade: true
          }
        })
      })
    }
  },

  data () {
    return {
      height: 0
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  overflow: hidden;
}
.cinema {
  display: flex;
  justify-content: space-between;
  padding: 0.8333rem;
}
.cinema-l {
  display: flex;
  flex-direction: column;
  width: calc(100% - 3.6111rem);
  .cinema-name {
    color: #191a1b;
    font-size: 0.8333rem;
    float: left;
  }
  .cinema-address {
    color: #797d82;
    font-size: 0.6667rem;
    margin-top: 0.2778rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.cinema-r {
  font-size: 0.8333rem;
  color: dodgerblue;
}
</style>
