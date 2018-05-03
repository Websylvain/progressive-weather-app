
import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const OWMKEY = 'a9d7a05fe78144cb7f7113e1416e7886';

export default new Vuex.Store({
    state:{
        location: {
            city: 'Carcassonne',
            country: 'FR'
        },
        previsions: [],
        weather:  {}
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
        }
    },
    mutations:{
        SET_WEATHER: (state, previsions) =>{
            state.previsions = previsions;
            state.weather = previsions[0];
        },
        SET_LOCATION: (state, location) => {
            state.location = location;
        }
    },
    actions:{
        //api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1111111111 
        loadWeather:(context, payload) => {
            axios.get('http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID='+ OWMKEY)
            .then((response)=>{
                console.log("success", response.data)
                context.commit('SET_LOCATION', response.data.city)
                context.commit('SET_WEATHER', response.data.list)
            })
            .catch( error =>{
                consol.log("error", error);
            })
        }
    }
})

