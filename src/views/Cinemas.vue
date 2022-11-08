<template>
  <div>
    <cinemas-header></cinemas-header>
    <cinemas-list :List="$store.state.cinemaList"></cinemas-list>
  </div>
</template>
<script>
import CinemasHeader from '../components/cinemas/CinemasHeader.vue'
import CinemasList from '../components/cinemas/CinemasList.vue'
export default {
  components: { CinemasHeader, CinemasList }
}
</script>
