
import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const OWMKEY = 'a9d7a05fe78144cb7f7113e1416e7886';
const FLICKRKEY = '385faf93e749d1b36c63a91d1245a3f2';

export default new Vuex.Store({
    state:{
        location: {
            city: '',
            country: ''
        },
        previsions: [],
        weather:  {},
        flickrImg: {},
        loading: true,
        error: null
    },
    getters:{
        weather: state => {
            return state.weather;
        },
        previsions: state =>{
            return state.previsions;
        },
        previsionsByDays: state =>{
            let temp = [];
            state.previsions.forEach((value, i) => {
              let date1 = new Date(value.dt_txt).getDate();
              if(state.previsions[i-1] != undefined){
                let date2 = new Date(state.previsions[i-1].dt_txt).getDate();
                if(date2 != undefined){
                  if(date1 != date2)
                      temp.push(value);
                }
              }
            });
            return temp;

        },
        location: state =>{
            return state.location;
        },
        flickr: state => {
            return state.flickrImg;
        },
        loading: state =>{
          return state.loading;
        },
        error: state =>{
          return state.error;
        }
    },
    mutations:{
        SET_WEATHER: (state, previsions) =>{
            state.previsions = previsions;
            state.weather = previsions[0];
        },
        SET_LOCATION: (state, location) => {
            state.location = location;
        },
        SET_LOCATION_PIX: (state, flickrImg) => {
            state.flickrImg = flickrImg;
        },
        SET_LOADING: (state, bool) => {
            state.loading = bool;
        },
        SET_ERROR: (state, error) =>{
          state.error = error;
        }
    },
    actions:{
        setLoading:(context, bool) =>{
            context.commit('SET_LOADING', bool);
        },
        // CALL API FIRST TIME
        loadWeather:(context, payload) => {
            context.commit('SET_LOADING', true);

            let queryChain = "";
            if(payload.lat  != undefined && payload.long != undefined){
              queryChain = 'lat='+payload.lat+'&lon='+payload.long
            }
            else{
              queryChain = "q="+ payload;
            }
            // GET FULL DATAS
            axios.get('https://api.openweathermap.org/data/2.5/forecast?'+ queryChain +'&APPID='+ OWMKEY + '&units=metric')
                .then((response)=>{

                    console.log("success Weather API", response.data);
                    context.commit('SET_LOCATION', response.data.city);
                    context.commit('SET_WEATHER', response.data.list);
                    context.commit('SET_LOADING', false);
                    context.commit('SET_ERROR', null)
                    // GET BG FROM FLICKR API
                    axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+FLICKRKEY
                    +'&media=photos&content_type=1&privacy_filter=1&tags=landscape&radius=32'+ "&lat="+response.data.city.coord.lat+"&lon="+response.data.city.coord.lon+'&per_page=1&page=1&accuracy=11&content_type=1&sort=relevance&format=json&nojsoncallback=1')
                        .then(response=>{
                            console.log('success Flickr API', response.data);
                            context.commit('SET_LOCATION_PIX', response.data.photos.photo[0])
                        })
                        .catch(error =>{
                            console.log('error', error);
                        })

                })
                .catch( error =>{
                    console.log(error);
                    context.commit('SET_LOADING', false);
                    context.commit('SET_ERROR', 404)
                })
        }
    }
})
