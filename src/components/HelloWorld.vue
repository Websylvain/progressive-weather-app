<template>
  <section class="hello">
    <header class="currentWeather" v-if="weather.main" v-lazyimg="getFlickImg()">
      <h1 class="location">
        <span class="country">{{location.country}}</span>
        <span class="city">{{location.name}}</span>
      </h1>
      <v-layout class="hero">
        <v-flex xs7>
          <div class="hero--temp">
            <span v-round="weather.main.temp"></span>°
          </div>
          <div class="hero--description">
            <p>
              <i v-if="weather.sys.pod == 'd'" :class="'wi wi-owm-day-' + weather.weather[0].id"></i>
              <i v-if="weather.sys.pod == 'n'" :class="'wi wi-owm-night-' + weather.weather[0].id"></i>
              {{weather.weather[0].description}}
            </p>
            <p><i class="wi wi-strong-wind"></i> {{weather.wind.speed}} m/s</p>
            <p><i class="wi wi-humidity"></i><span> {{weather.main.humidity}}%</span></p>
          </div>
        </v-flex>
        <v-flex xs5>
        </v-flex>
      </v-layout>
    </header>
    <section class="weatherSum">
      <PrevisionsCharts style="margin-bottom:25px"
        v-if="typeOfView == 'charts'"
        :data="previsionsByDays"
        :options="{
            legend: {
               labels: {
                    fontColor: '#000'
                   }
            },
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor: '#000'
                    },
                }],
              xAxes: [{
                    ticks: {
                        fontColor: '#000'
                    },
                }]
            }
          }"
        :width="400"
        :height="300"></PrevisionsCharts>
      <Previsions v-if="typeOfView == 'list'" :data="previsionsByDays"></Previsions>
    </section>
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
    color:white;
    padding-top: 40%;
    padding-bottom: 5%;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
  }

  .hero{
    padding: 0px 15px 0px 15px;
  }
  .hero .hero--temp{
    font-size: 100px;
    line-height: 100px;
  }

  .hero .hero--description .wi{
    width: 20%;
    display: inline-block;
  }

  .location{
    margin-bottom: 20%;
    text-align: center;
    text-transform: uppercase;
    position: relative;
  }

  .location .city{
      font-size: 40px;    font-weight: bold;
  }

  .location .country{
    opacity: 0.5;
      font-size: 110px;    font-weight: bold;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
  .chooseView{
    font-size:0px;
    margin-bottom: 15%;
    text-transform: uppercase;text-align: center;
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
