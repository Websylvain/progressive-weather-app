<template>
  <section class="previsions">
    <ul>
        <li v-for="p in data">
          <span class="day">
            {{p.dt_txt}}
          </span>
          <span class="temp">
            <span v-round="p.main.temp"></span>
            °C
          </span>
          <span class="logo">
            <i :class=" 'icon wi wi-owm-'+ p.weather[0].id"></i>
          </span>
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
    margin-top:15%;
    text-align:left;
  }
  .previsions ul{
    list-style:none;
    padding:0px 15px 0px 15px;
  }
  .previsions ul li{
    padding: 20px 0px 20px 0px;
  }

</style>
