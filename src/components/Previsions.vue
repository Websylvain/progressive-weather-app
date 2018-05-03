<template>
    <ul class="previsions">
        <li v-for="p in previsions">
          {{p.dt_txt}} 
        </li>
    </ul>
</template>

<script>
export default {
  name: 'Previsions',
  props: ['data'],
  data () {
    return {
      previsions: {...this.data}
    }
  }
}
</script>
