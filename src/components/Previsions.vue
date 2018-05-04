<template>
  <section class="previsions">
    <ul>
        <li v-for="p in data">
          <div class="day">
            {{p.dt_txt}}
          </div>
          <div class="temp">
            <span v-round="p.main.temp"></span>
            °C
          </div>   
          <i :class=" 'icon wi wi-owm-'+ p.weather[0].id"></i>
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

  .day, .temp, .icon{
    display: table-cell;
    vertical-align: middle;
  }

  .day{
    width:50%;
  }

  .temp{
    width:35%;text-align:right;
  }

  .icon{
    text-align:center;
    width: 15%;    font-size: 25px;
  }
</style>
