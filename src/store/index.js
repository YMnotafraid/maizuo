import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      reducer (state) {
        return {
          cityId: state.cityId,
          cityName: state.cityName
        }
      }
    })
  ],
  state: {
    cityName: '深圳',
    cityId: 440300,
    cinemaList: [],
    isShow: true
  },
  mutations: {
    changeCityName (state, cityName) {
      state.cityName = cityName
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    changeCinemaList (state, cinemaList) {
      state.cinemaList = cinemaList
    },
    changeCity (state) {
      state.cinemaList = []
    },
    hide (state) {
      state.isShow = false
    },
    show (state) {
      state.isShow = true
    }
  },
  actions: {
    getCinemaList (store) {
      return http({
        url: `gateway?cityId=${this.state.cityId}&ticketFlag=1&k=6586631`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then((res) => {
        store.commit('changeCinemaList', res.data.data.cinemas)
      })
    }
  }
})
