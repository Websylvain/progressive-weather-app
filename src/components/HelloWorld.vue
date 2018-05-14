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

    <p class="chooseView">
      <span class="chooseView--left" :class="{active: typeOfView == 'list'}" @click.stop.prevent="typeOfView = 'list'">list</span>
      <span class="chooseView--right" :class="{active: typeOfView == 'charts'}"  @click.stop.prevent="typeOfView = 'charts'">charts</span>
    </p>

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

    <PrevisionsCharts style="margin-bottom:25px"
      v-if="typeOfView == 'charts'"
      :data="previsionsByDays"
      :options="{
          legend: {
             labels: {
                  fontColor: 'white'
                 }
          },
          responsive: true,
          maintainAspectRatio: true,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true,
                      fontColor: 'white'
                  },
              }],
            xAxes: [{
                  ticks: {
                      fontColor: 'white'
                  },
              }]
          }
        }"
      :width="400"
      :height="300"></PrevisionsCharts>
    <Previsions v-if="typeOfView == 'list'" :data="previsionsByDays"></Previsions>

  </section>
</template>

<script>
import weather from '@/stores/weather.js'
import { mapGetters } from 'vuex'
import Previsions from '@/components/Previsions'
import PrevisionsCharts from '@/components/PrevisionsCharts'
import myDirectives from '@/directives/MyDirectives.js'

export default {
  name: 'HelloWorld',
  store: weather,
  components:{Previsions, PrevisionsCharts},
  directives: myDirectives,
  data () {
    return {
        typeOfView: "list"
    }
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
    padding-bottom:15%;
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
    margin-bottom:5%;
  }

  .weatherSum div i, .weatherSum div span{
    display: block;
  }

  .weatherSum div i{
    font-size: 20px;
    margin-bottom: 10px;
  }

  .chooseView{
    font-size:0px;
    margin-bottom: 15%;
    text-transform: uppercase;
  }

  .chooseView .chooseView--left,.chooseView .chooseView--right  {
    font-size: 15px;
    border: 1px solid #fff;
    margin:0;
    padding:5px;
    display: inline-block;
  }

  .chooseView .chooseView--left{
    border-radius: 5px 0px 0px 5px;
  }

  .chooseView .active {
    color: black;   border: 1px solid #000;
  }

  .chooseView .chooseView--right{
    border-radius: 0px 5px 5px 0px;
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
