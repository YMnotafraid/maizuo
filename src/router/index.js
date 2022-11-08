import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '@/views/Films.vue'
import Cinemas from '@/views/Cinemas.vue'
import Center from '@/views/Center.vue'
import Detail from '@/views/Detail.vue'
import City from '@/views/City.vue'
import Search from '@/views/Search.vue'
import Nowplaying from '@/views/films/Nowplaying.vue'
import Comingsoon from '@/views/films/Comingsoon.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/films',
    component: Films,
    children: [
      {
        path: '/films/nowplaying',
        component: Nowplaying
      },
      {
        path: '/films/comingsoon',
        component: Comingsoon
      },
      {
        path: '/films',
        redirect: '/films/nowplaying'
      }
    ]
  },
  {
    path: '/detail/:id',
    component: Detail
  },
  {
    path: '/cinemas',
    component: Cinemas
  },
  {
    path: '/cinemas/search',
    component: Search
  },
  {
    path: '/city',
    component: City
  },

  {
    path: '/center',
    component: Center
  },
  {
    path: '*',
    redirect: '/films'
  }
]

const router = new VueRouter({
  routes
})

export default router
