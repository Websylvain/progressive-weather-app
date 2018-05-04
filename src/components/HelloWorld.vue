<template>
  <main class="hello">
    <aside class="flickrBg" v-lazyimg="getFlickImg()"></aside>

    <header class="currentWeather" v-if="weather.main">
      <h1>
        <span v-round="weather.main.temp"></span>°
      </h1>
      <p class="location">{{location.name}}, {{location.country}} | <i :class="'wi wi-owm-'+ weather.weather[0].id"></i> | {{weather.main.temp_max}}°C / {{weather.main.temp_min}}°C </p>
      <p>{{weather.weather[0].description}}</p>
    </header>
    <Previsions :data="previsions"></Previsions>

  </main>
</template>

<script>
import weather from '@/stores/weather.js'
import { mapGetters, mapActions } from 'vuex'
import Previsions from '@/components/Previsions'

import myDirectives from '@/directives/MyDirectives.js'

export default {
  name: 'HelloWorld',
  store: weather,
  components:{Previsions},
  directives: myDirectives,
  mounted(){
    this.$store.dispatch('loadWeather');
  },
  methods:{
    getFlickImg(){
      // 'https://farm' + flickr.farm + '.staticflickr.com/' + flickr.server + '/' + flickr.id + '_' + flickr.secret + '.jpg'
      let img = 'https://farm' + this.flickr.farm + '.staticflickr.com/' + this.flickr.server + '/' + this.flickr.id + '_' + this.flickr.secret + '.jpg';
      return img;
    }
  },
  computed:{
    ...mapGetters([
      'weather',
      'location',
      'previsions',
      'flickr'
    ])
  }
}
</script>

<style>
  body{
    margin:0px;
  }
  .currentWeather{
    text-align: center;
    padding-top: 50%;
  }
  .currentWeather h1{
    margin:0px;
    font-size:110px;
  }
  .currentWeather h2{
    margin:0px;
    text-transform: uppercase;
  }
  .currentWeather .location{
    font-size:16px;
  }
  .flickrBg{
    position: fixed;
    z-index: -10;
    top: 0; left: 0; right: 0; bottom: 0;
    height: 100%; width:100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-size: cover;
    background-position-x: center;
    background-position-y: center;
  }
</style>
