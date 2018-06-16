<template>
  <section class="hello">
    <header class="currentWeather" v-if="weather.main" v-lazyimg="getFlickImg()">
      <v-layout class="hero">
        <v-flex xs8>
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
        <v-flex xs4>
        </v-flex>
      </v-layout>
    </header>
    <section class="weatherSum">
      <v-btn
              absolute
              dark
              fab
              top
              right
              color="pink"
            @click="changeTypeOfView">
              <v-icon v-if="typeOfView == 'list'">show_chart</v-icon>
              <v-icon v-else >format_list_bulleted</v-icon>
        </v-btn>
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
    },
    changeTypeOfView(){
      if(this.typeOfView == 'list'){
        this.typeOfView = 'charts';
      }else{
        this.typeOfView = 'list';
      }
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
    background-size: cover;
    background-position: center, bottom;
    background-color:grey;
    padding-top: 45vh;
  }

  .hero{
    padding: 15px;
  }
  .hero .hero--temp{
    font-size: 100px;
    line-height: 100px;
  }

  .hero .hero--description .wi{
    width: 35px;
    display: inline-block;
  }

  .location{
    text-align: center;
    text-transform: uppercase;
    position: relative;
    margin-bottom: 25%;
  }

  .location .city{
      font-size: 40px;    font-weight: bold;
  }

  .location .country{
      opacity: 0.45;
      font-size: 120px;    font-weight: bold;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }

  .weatherSum{
    position: relative;
    padding-top: 20px;
  }

  @media (min-width: 1200px) {
    padding-top: 20%;
  }

</style>
