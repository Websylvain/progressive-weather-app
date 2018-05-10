<template>
  <section class="previsions">
    <ul>
        <li v-for="p in data">
          <span class="label">
            <i :class=" 'icon wi wi-owm-'+ p.weather[0].id"></i>
            <span href="" v-getDayFromDate="p.dt_txt"></span>
          </span>
          <span class="temp">
            <span v-round="p.main.temp"></span>°
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
    margin:5% 0px 0% 0px;
    text-align:left;
  }
  .previsions ul{
    list-style:none;
    padding:0px 15px 0px 15px;
  }
  .previsions ul li{
    border-top:0.3px solid #ffffffb8;
    padding: 25px 0px 25px 0px;
  }
  .previsions ul li .label, .previsions ul li .temp {
    display:inline-block;
  }
  .previsions ul li .label{
    width:80%;
  }
  .previsions ul li .temp{
    width:18%;text-align:center;    font-size: 25px;
  }
  .previsions ul li .label .icon{
    font-size:30px;margin-right: 15px;
  }

</style>
