<template>
  <v-app id="app" :class="period">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <navigation></navigation>
    </v-navigation-drawer>
    <v-toolbar app flat dark absolute color="transparent">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title><h1 v-if="location">{{location.name}}, {{location.country}}</h1></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.native.stop="dialog = true">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon @click.native.stop="initLocation()">
        <v-icon>my_location</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-progress-circular :size="70" :width="7" indeterminate v-if="loading"></v-progress-circular>
      <!-- CONTENT -->
      <router-view v-else/>
      <!-- END CONTENT -->
    </v-content>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Choose your location...</v-card-title>
        <v-card-text>
          <v-text-field id="testing" v-model="manualSearch" @keyup.enter="manualSearchLocation()"label="Location" ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat="flat" @click.native="dialog = false">Cancel</v-btn>
          <v-btn flat="flat" @click.native="manualSearchLocation()">Search</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters} from 'vuex'
import navigation from '@/components/ui/navigation';
import weather from '@/stores/weather.js'
export default {
  name: 'App',
  store: weather,
  data(){
    return {
      drawer: false,
      date: new Date,
      dialog: false,
      geohash: {},
      manualSearch: "",
      geoLocation: false
    }
  },
  components: {navigation},
  mounted(){
    this.initLocation();
  },
  methods:{
    manualSearchLocation(){
      this.$store.dispatch('loadWeather', this.manualSearch); // LUNCH STORE WITH LOCATION
      this.dialog = false;
      this.manualSearch = "";

      if(this.$route.name == 'error'){
        this.$router.push('/');
      }

    },
    initLocation(){
      if (navigator.geolocation) {
          this.geoLocation = true;
          // GET POSITION
          navigator.geolocation.getCurrentPosition((position) => {

              this.geohash = {
                lat: position.coords.latitude,
                long: position.coords.longitude,
                precision: this.precision
              }

              //IF NOT RETURN TO HELLO VIEW
              if(this.$route.name == 'error'){
                this.$router.push('/');
              }

              // API OPEN WEATHER MAP SEARCH
              this.$store.dispatch('setLoading', true);
              this.$store.dispatch('loadWeather', this.geohash);

          }, (err) => {

              // error handling here
              console.log("GEOLOCATION ERR", err);
              this.$store.dispatch('setLoading', false);
              this.$router.push('/error/no-geo');

          })
      } else {
          console.error('Cannot access geolocation');
          this.$store.dispatch('setLoading', false);
          this.$router.push('/error/no-geo');
      }
    }
  },
  computed: {
    ...mapGetters([
      'loading',
      'location',
      'error'
    ]),
    year(){
      return this.date.getFullYear();
    },
    period(){
      let hour = this.date.getHours();
      return (hour > 5 && hour < 18)? 'app--day': 'app--night';
    }
  },
  watch:{
    error(n, o){
      if (n == 404){
        this.$router.push('/error/no-data');
      }
    }
  }
}
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

.content{
  padding-top: 0px!important;
  color:black;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  font-size: 20px;
  width:100%;
  height:100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

#app.app--day{
  /*background: rgb(246,230,180) fixed;
  background: -moz-linear-gradient(top, rgba(246,230,180,0.8) 0%, rgba(237,144,23,0.85) 100%) fixed;
  background: -webkit-linear-gradient(top, rgba(246,230,180,0.8) 0%,rgba(237,144,23,0.85) 100%) fixed;
  background: linear-gradient(to bottom, rgba(246,230,180,0.8) 0%,rgba(237,144,23,0.85) 100%) fixed;
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f6e6b4', endColorstr='#ed9017',GradientType=0 );
*/}

#app.app--night {
  /*background: rgb(114,94,127);
  background: -moz-linear-gradient(top, rgba(114,94,127,0.8) 0%, rgba(13,40,137,0.85) 100%) fixed;
  background: -webkit-linear-gradient(top, rgba(114,94,127,0.8) 0%,rgba(13,40,137,0.85) 100%) fixed;
  background: linear-gradient(to bottom, rgba(114,94,127,0.8) 0%,rgba(13,40,137,0.85) 100%) fixed;
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#725e7f', endColorstr='#0d2889',GradientType=0 );
*/}

p{
  margin-top:0px;
}

.progress-circular {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    position: absolute!important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}


</style>
