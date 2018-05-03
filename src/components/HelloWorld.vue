<template>
  <main class="hello">

    <header class="currentWeather" v-if="weather.main">
      <h1 v-KelvToCelcius="weather.main.temp"></h1>
      <p>{{location.name}}, {{location.country}}</p>
    </header>
    <Previsions :data="previsions"></Previsions>
  </main>
</template>

<script>
import weather from '@/stores/weather.js'
import { mapGetters, mapActions } from 'vuex'

import Previsions from '@/components/Previsions'
export default {
  name: 'HelloWorld',
  store: weather,
  components:{Previsions},
  directives: {
    KelvToCelcius:{
      bind(el, binding, vnode){
        el.innerHTML = Math.round(binding.value -273.15) + "°C";
      }
    }
  },
  mounted(){
    this.$store.dispatch('loadWeather');
  },
  methods:{
    kelvinToCelcius(kelvin){
      return (300 - kelvin);
    }
  },
  computed:{
    ...mapGetters([
      'weather',
      'location',
      'previsions'
    ])
  }
}
</script>

<style>
  .hello{
    padding-top:25%;
  }
  .currentWeather{
    text-align: center;
  }
  .currentWeather h1{
    font-size:80px;
    margin-bottom:0px;
  }
</style>