import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { history } from '../redux'

const apikey = 'DNXGFWSYHV46ZCNZ96FXJKS95'
const baseUrl =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline'
const units = 'metric'
const weatherElems =
  'datetime%2Cname%2Caddress%2Ctempmax%2Ctempmin%2Ctemp%2Cpreciptype%2Csnow%2Cconditions%2Cdescription%2Cicon'
const dataSections = 'fcst%2Cdays%2Chours%2Ccurrent'
const geoApi = 'd4Ll6HGXoOSoo8PySJzLgGsxGVHBj2Cr'

const GetCoords = (props) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      const lat = res.coords.latitude
      const lon = res.coords.longitude
      const fullUrl = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${geoApi}&location=${lat},${lon}&includeRoadMetadata=true&includeNearestIntersection=true`
      axios.get(fullUrl).then((it) => {
        const answ = it.data.results[0].locations[0].adminArea3
        props.setSomeCity(answ)
      })
    })
    return () => {}
  }, [])
  return props.setSomeCity
}

const IconWthr = (props) => {
  return (
    <div className="weather-img">
      <img
        src={`https://www.visualcrossing.com/img/${props.iconName}.svg`}
        alt={`${props.iconName}`}
        className={`image ${props.imgClasses}`}
      />
    </div>
  )
}

const Forecast = (props) => {
  const weatherList = []
  if (props.dayNum) {
    for (let i = 1; i < props.dayNum + 1; i += 1) {
      const exactDay = new Date(props.fData[i].datetime) // fData - weather.days array
      weatherList.push(
        <div className="weather-list__element weather-element">
          <div className="dayOfYear weather-element__item">
            {exactDay.toString().substring(0, 10)}
          </div>
          <IconWthr iconName={props.fData[i].icon} imgClasses="" />
          <div className="temps weather-element__item">
            <span className="tempmax">{props.fData[i].tempmax}</span>/
            <span className="tempmin">{props.fData[i].tempmin}</span>°C
          </div>
          <div className="conditions weather-element__item">{props.fData[i].conditions}</div>
        </div>
      )
    }
  }
  if (props.hoursNum) {
    const dayHours = [...props.fData[0].hours, props.fData[1].hours]
    for (let i = 1; i <= props.hoursNum + 1; i += 1) {
      if (dayHours[i].temp !== null || dayHours[i].icon.length > 0) {
        weatherList.push(
          <div className="weather-list__element weather-element">
            <div className="weather-element__item time">
              {dayHours[i].datetime.toString().substring(0, 5)}
            </div>
            <IconWthr iconName={dayHours[i].icon} imgClasses="" />
            <div className="weather-element__item">{dayHours[i].temp}°C</div>
            <div className="conditions weather-element__item">{dayHours[i].conditions}</div>
          </div>
        )
      }
    }
  }
  return (
    <div className="weather-wraper">
      <div className="weather-list">{weatherList}</div>
    </div>
  )
}

const GetWeather = (props) => {
  const fullUrl = `${baseUrl}/${props.cityDefault}?unitGroup=${units}&elements=${weatherElems}&include=${dataSections}&key=${apikey}&contentType=json`
  useEffect(() => {
    axios.get(fullUrl).then((it) => {
      const res = it.data
      props.setWeather(res)
    })
    return () => {}
  }, [props.cityDefault])
  return props.setWeather
}

const CurrentWeather = (props) => {
  return (
    <div>
      <IconWthr iconName={props.weatherCur.icon} imgClasses="" />
      <div className="current-time">
        {props.cityDefault}, today, {props.weatherCur.datetime.trim().slice(0, -3)}
      </div>
      <div className="degrees">The temperature is {props.weatherCur.temp}°C</div>
      <div className="conditions">{props.weatherCur.conditions}</div>
    </div>
  )
}

const ShowWeather = (props) => {
  if (Object.keys(props.weather).length > 0) {
    const weatherCur = props.weather.currentConditions
    if (!props.hoursNum) {
      return (
        <div className="td-wtr">
          <CurrentWeather weatherCur={weatherCur} cityDefault={props.cityDefault} />
          <Forecast dayNum={props.dayNum} fData={props.weather.days} />
        </div>
      )
    }
    return (
      <div className="td-wtr">
        <Forecast hoursNum={props.hoursNum} fData={props.weather.days} />
      </div>
    )
  }
  return <div />
}

const SearchForm = (props) => {
  const [city, setCity] = useState('')
  const onChange = (e) => {
    setCity(e.target.value)
  }
  return (
    <div className="flex items-center justify-center">
      <form role="search" className="input-form">
        <input
          id="search-field"
          className="search-field"
          type="text"
          value={city}
          onChange={onChange}
        />
        <button
          id="search-button"
          className="btn-main btn"
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            if (city.length > 2) {
              props.setSomeCity(city)
            }
          }}
        >
          Search
        </button>
      </form>
    </div>
  )
}

const WeatherDetails = (props) => {
  const weatherDetails = (openCity) => {
    history.push(`in/${openCity}`)
  }
  return (
    <div>
      <button
        className="btn btn-sec"
        type="button"
        onClick={() => {
          if (props.city) {
            weatherDetails(props.city)
          }
        }}
      >
        Details...
      </button>
    </div>
  )
}

const DefaultCities = (props) => {
  return (
    <div className="btn-container">
      <button
        className="btn btn-sec"
        type="button"
        onClick={() => {
          props.setSomeCity('Minsk')
        }}
      >
        Minsk
      </button>
      <button
        className="btn btn-sec"
        type="button"
        onClick={() => {
          props.setSomeCity('Moscow')
        }}
      >
        Moscow
      </button>
      <button
        className="btn btn-sec"
        type="button"
        onClick={() => {
          props.setSomeCity('Bratislava')
        }}
      >
        Bratislava
      </button>
    </div>
  )
}

const SaveCity = (props) => {
  localStorage.setItem('savedCity', props.cityDefault)
  return null
}

export {
  SearchForm,
  DefaultCities,
  ShowWeather,
  WeatherDetails,
  Forecast,
  GetWeather,
  SaveCity,
  GetCoords
}
