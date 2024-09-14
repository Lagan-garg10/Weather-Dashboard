import React from 'react'
import './MainPage.css';
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaCloud } from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios'
import TodayHighlight from '../components/MainPage/TodayHighlight';
import HashLoader from '../../node_modules/react-spinners/HashLoader'
import FifteenDayWeather from '../components/MainPage/FifteenDayWeather';
export default function MainPage() {

  const [dataFifteenDays, setDataFifteenDays] = useState([])
  const [currentData, setCurrentData] = useState({})
  const [fullData, setFullData] = useState({})
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [loading, setLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState()
  const [enteredCityName, setEnteredCityName] = useState()

  async function fetchData() {
    if (latitude) {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude}, ${longitude}?unitGroup=metric&include=events%2Ccurrent%2Cdays%2Chours%2Calerts&key=M8FT58ZHCW4V37ZYFEGPR67TB&contentType=json`
      const res = await axios.get(url)
      // const data = await axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/ludhiana?unitGroup=metric&include=events%2Ccurrent%2Cdays%2Chours%2Calerts&key=M8FT58ZHCW4V37ZYFEGPR67TB&contentType=json')
      // console.log(res.data.currentConditions)
      setDataFifteenDays(res.data.days)
      setCurrentData(res.data.currentConditions)
      setFullData(res)
      if (fullData) {
        console.log(fullData)
      }
    }
  }

  async function fetchDataByCity() {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${enteredCityName}?unitGroup=metric&include=events%2Ccurrent%2Cdays%2Chours%2Calerts&key=M8FT58ZHCW4V37ZYFEGPR67TB&contentType=json`
    const res = await axios.get(url)
    // const data = await axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/ludhiana?unitGroup=metric&include=events%2Ccurrent%2Cdays%2Chours%2Calerts&key=M8FT58ZHCW4V37ZYFEGPR67TB&contentType=json')
    // console.log(res.data.currentConditions)
    setDataFifteenDays(res.data.days)
    setCurrentData(res.data.currentConditions)
    setFullData(res)
    console.log(res)
  }

  async function fetchReverseAddress() {
    if (latitude) {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      // console.log(url)
      const res = await axios.get(url);
      const city = res.data.address.city
      setCurrentCity(city)
    }

  }

  useEffect(() => {
    async function getLatitudeLongitude() {
      setLoading(true)
      if (navigator.geolocation !== undefined) {
        navigator.geolocation.getCurrentPosition(
          await function (position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
          },
          function (error) {
            alert('ERROR', error.message)
          }
        )
      }
      else {
        alert('geoLocation is not there in your device')
      }
      await fetchReverseAddress()
      await fetchData()
      setLoading(false)
    }
    getLatitudeLongitude()
  }, [latitude, longitude])

  const iconObject = {
    'clear-day': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/clear-day.svg',
    'clear-night': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/clear-night.svg',
    'cloudy': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/cloudy.svg',
    'fog': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/fog.svg',
    'hail': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/hail.svg',
    'partly-cloudy-day': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/partly-cloudy-day.svg',
    'partly-cloudy-night': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/partly-cloudy-night.svg',
    'rain-snow-showers-day': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/rain-snow-showers-day.svg',
    'rain-snow-showers-night': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/rain-snow-showers-night.svg',
    'rain-snow': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/rain-snow.svg',
    'rain': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/rain.svg',
    'showers-day': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/showers-day.svg',
    'showers-night': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/showers-night.svg',
    'sleet': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/sleet.svg',
    'snow-showers-day': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/snow-showers-day.svg',
    'snow-showers-night': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/snow-showers-night.svg',
    'snow': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/snow.svg',
    'thunder-rain': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/thunder-rain.svg',
    'thunder-showers-day': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/thunder-showers-day.svg',
    'thunder-showers-night': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/thunder-showers-night.svg',
    'thunder': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/thunder.svg',
    'wind': 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/wind.svg'
  };
  return (
    <div>
      {
        loading ? (<div>
          <HashLoader
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh' }}
            color="#f1aa0b"
            cssOverride={{}}
            size={100}
            speedMultiplier={2}
          />
        </div>) : (<div className="App">
          <div className='app-logo'>
            <div className='logo'>
              <img src='https://pics.craiyon.com/2023-10-14/588962bd7092493d8106eef184cf4772.webp' alt='' />
              <span className='weather-app-name'>Weather</span>
              <span className='weather-app-name-x'>X</span>
            </div>
          </div>
          <main className='main'>
            <div className='main-upper'>
              <div className='main-upper-left'>
                <div className='background'></div>
                <div className='main-upper-left-info'>
                  <img src={iconObject[currentData.icon]} className='weather-icon' alt='weather-con' />
                  <h2>{currentData.temp}°C</h2>
                  <p>{currentData.conditions}</p>
                </div>
                <FaCloud className='cloud-background' />
                <div className='main-upper-left-timeline'>
                  <div className='place'>
                    <FaLocationDot />
                    <p>{currentCity}</p>
                  </div>
                  <div className='time'>
                    <FaCalendarAlt />
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className='main-upper-searchbar'>
                <input onChange={(e)=>setEnteredCityName(e.target.value)} type="text" placeholder='enter city name' />
                <IoSearch onClick={fetchDataByCity} className='search-icon' />
              </div>
              <div className='main-upper-right'>
                <p style={{ fontWeight: 'bold', marginLeft: '300px', position: 'absolute' }}>Today's Highlights</p>
                <div className="highlights">
                  <TodayHighlight currentData={currentData} heading1={'Wind Status'} heading2={'humidity'} description={`the dew point is ${currentData.dew}° right now`} value1={`${currentData.humidity}%`} value2={`${currentData.windspeed}km/h`} />
                  <TodayHighlight currentData={currentData} heading1={'UV Index'} heading2={'Visibility'} description={``} value1={`${currentData.visibility}km`} value2={`${currentData.uvindex} uv`} />
                  <TodayHighlight currentData={currentData} heading1={'Sunrise and Sunset'} heading2={'Feels Like'} description={``} value1={`${currentData.feelslike}°`} value2={``} />
                </div>
              </div>
            </div>
            <div className='main-lower'>
              <div className='main-lower-left'>
                {
                  dataFifteenDays.map((item, index) => (
                    <FifteenDayWeather data={item} key={index} />
                  ))
                }
                <div className='background'></div>
              </div>
              {/* <div className='main-lower-right'>right lower div</div> */}
            </div>
          </main>
        </div>)
      }

    </div>
  )
}
