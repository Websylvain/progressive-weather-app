<template>
  <div id="app" :class="period">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      date: new Date
    }
  },
  computed: {
    year(){
      return this.date.getFullYear();
    },
    period(){
      let hour = this.date.getHours();
      return (hour > 5 && hour < 18)? 'app--day': 'app--night';
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  font-size: 20px;
  width:100%;
  height:100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

#app.app--day{
  background: rgb(246,230,180);
  background: -moz-linear-gradient(top, rgba(246,230,180,1) 0%, rgba(237,144,23,1) 100%);
  background: -webkit-linear-gradient(top, rgba(246,230,180,1) 0%,rgba(237,144,23,1) 100%);
  background: linear-gradient(to bottom, rgba(246,230,180,1) 0%,rgba(237,144,23,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f6e6b4', endColorstr='#ed9017',GradientType=0 );
}

#app.app--night {
  background: rgb(114,94,127);
  background: -moz-linear-gradient(top, rgba(114,94,127,1) 0%, rgba(13,40,137,1) 100%);
  background: -webkit-linear-gradient(top, rgba(114,94,127,1) 0%,rgba(13,40,137,1) 100%);
  background: linear-gradient(to bottom, rgba(114,94,127,1) 0%,rgba(13,40,137,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#725e7f', endColorstr='#0d2889',GradientType=0 );
}
</style>
