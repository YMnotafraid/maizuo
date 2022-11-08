<template>
  <div>
    <film-header></film-header>
    <router-view></router-view>
  </div>
</template>
<script>
import FilmHeader from '../components/films/FilmHeader.vue'
export default {
  components: { FilmHeader }
}
</script>
