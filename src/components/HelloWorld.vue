<template>
  <section class="hello">
    <aside class="flickrBg" v-lazyimg="getFlickImg()"></aside>

    <header class="currentWeather" v-if="weather.main">
      <h1>
        <span v-round="weather.main.temp"></span>°
      </h1>
      <div class="location">
        <p class="location--name">{{location.name}}, {{location.country}}</p>
        <p>{{weather.weather[0].description}}</p>
      </div>
    </header>

    <v-layout class="weatherSum" v-if="weather.main">
      <v-flex xs3>
        <i class="wi wi-direction-up"></i>
        <span>{{weather.main.temp_max}}°</span>
      </v-flex>
      <v-flex xs3>
        <i class="wi wi-direction-down"></i>
        <span>{{weather.main.temp_min}}°</span>
      </v-flex>
      <v-flex  xs3>
        <i class="wi wi-strong-wind"></i>
        <span>{{weather.wind.speed}} m/s</span>
      </v-flex>
      <v-flex xs3>
        <i class="wi wi-humidity"></i>
        <span>{{weather.main.humidity}}%</span>
      </v-flex>
    </v-layout>

    <Previsions :data="previsionsByDays" v-if="previsionsByDays"></Previsions>

  </section>
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
      'previsionsByDays',
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
    padding-top: 25%;
    padding-bottom:25%;
  }
  .currentWeather h1{
    margin:0px;
    font-size:110px;
  }

  .currentWeather .location{
    text-transform: uppercase;
  }

  .currentWeather .location .location--name{
    font-weight: bold;
    margin-bottom:10px;
  }

  .weatherSum{
    font-size:16px;
  }

  .weatherSum div i, .weatherSum div span{
    display: block;
  }

  .weatherSum div i{
    font-size: 20px;
    margin-bottom: 10px;
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
