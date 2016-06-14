// TODO: change this to es6

import {capitalize} from 'lodash';
let rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=5b71e81685f0a6c5e731181b8b059480'

let kelvinToF = function(kelvin) {
  return Math.round((kelvin - 273.15) * 1.8 + 32) + ' ˚F';
}

module.exports = function(latitude, longitude) {
  let url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;
  return fetch(url)
    .then((resp) => {
      return resp.json()
    })
    .then((json) => {
      return {
        city: json.name,
        temp: kelvinToF(json.main.temp),
        desc: capitalize(json.weather[0].description)
      }
    })
}
