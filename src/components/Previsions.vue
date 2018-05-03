<template>
  <section class="previsions">
    <ul>
        <li v-for="p in data">
          <i :class=" 'wi wi-owm-'+ p.weather[0].id"></i>
          {{p.dt_txt}}
        </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Previsions',
  props: ['data'],
  data () {
    return {

    }
  }
}
</script>

<style>
  .previsions{
    margin-top:25%;
    text-align:left;
  }
  .previsions ul{
    list-style:none;
  }
  .previsions ul li{
    padding: 10px 0px 10px 0px;
  }
</style>
