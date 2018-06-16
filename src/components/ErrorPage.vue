<template>
  <section class="errorPage">
    <header class="header">
      <h1 v-if="errorType === 'no-geo'">
        <v-icon>location_off</v-icon>
        <span>NO GPS DATA...</span>
      </h1>
      <h1 v-if="errorType === 'no-data'">
        <v-icon>sentiment_very_dissatisfied</v-icon>
        <span>NO RESULTS, LOCATION NOT FOUND...</span>
      </h1>
    </header>
    <section class="errorMessage">
      <p>You can also use the search option ! </p>
    </section>
  </section>
</template>

<script>

export default {
  name: 'ErrorPage',
  data () {
    return {
      errorType: ""
    }
  },
  mounted(){
    this.errorType = this.$route.params.type;
  }
}
</script>

<style scoped>

  .header{
    height: 50vh;
    position: relative;
    text-align:center;
    background-color: grey;
    color: white;
  }

  .header h1{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .header .icon{
    display: block;
    font-size: 55px;
    margin-bottom:15px;
  }

  .errorMessage{
    padding: 20px 15px 20px 15px;
    text-align:center;
  }



</style>
