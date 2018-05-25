<template>
  <section class="previsions">
    <ul>
        <li v-for="p in data">
          <v-layout>
            <v-flex class="label" xs9>
              <i :class=" 'icon wi wi-owm-'+ p.weather[0].id"></i>
              <span v-getDayFromDate="p.dt_txt"></span>
            </v-flex>
            <v-flex class="temp" xs3>
              <span v-round="p.main.temp"></span>°
            </v-flex>

          </v-layout>
        </li>
    </ul>
  </section>
</template>

<script>
import myDirectives from '@/directives/MyDirectives.js'


export default {
  name: 'Previsions',
  props: ['data'],
  directives: myDirectives,
  data () {
    return {

    }
  }
}
</script>

<style>
  .previsions{
    color: black;
    margin:0% 0px 0% 0px;
    text-align:left;
  }
  .previsions ul{
    list-style:none;
    padding:0px 15px 0px 15px;
  }
  .previsions ul li{
    /*border-top:0.3px solid #000000b8;*/
    padding: 25px 0px 25px 0px;
  }
  .previsions ul li .label, .previsions ul li .temp {
    display:inline-block;
  }

  .previsions ul li .temp{
    text-align:right;
    font-size: 25px;
  }
  .previsions ul li .label .icon{
    font-size:30px;margin-right: 15px;
  }

</style>
