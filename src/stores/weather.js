
import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const OWMKEY = 'a9d7a05fe78144cb7f7113e1416e7886';

export default new Vuex.Store({
    state:{
        location: {
            city: '',
            country: ''
        },
        previsions: [],
        weather:  {},
        flickrImg: {}
    },
    getters:{
        weather: state => {
            return state.weather;
        },
        previsions: state =>{
            return state.previsions;
        },
        location: state =>{
            return state.location;
        },
        flickr: state => {
            return state.flickrImg;
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
        }
    },
    actions:{
        // CALL API FIRST TIME
        loadWeather:(context, payload) => {
            let queryChain = 'lat=48.856614&lon=2.3522219000000177'
            
            // GET FULL DATAS
            axios.get('http://api.openweathermap.org/data/2.5/forecast?'+ queryChain +'&APPID='+ OWMKEY + '&units=metric&cnt=20')
                .then((response)=>{
                    console.log("success", response.data)
                    context.commit('SET_LOCATION', response.data.city)
                    context.commit('SET_WEATHER', response.data.list)
                    
                    // GET BG FROM FLICKR API
                    axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=68da3a81a95b2832e0bee9b8221aa7c9&tags=&sort=&has_geo=1&'+queryChain+'&per_page=1&page=1&sort=interestingness-asc&format=json&nojsoncallback=1')
                        .then(response=>{
                            console.log('success', response.data);
                            context.commit('SET_LOCATION_PIX', response.data.photos.photo[0])
                        })
                        .catch(error =>{
                            console.log('error', error);
                        })
                })
                .catch( error =>{
                    consol.log("error", error);
                })
        }
    }
})
