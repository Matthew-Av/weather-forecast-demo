import React, { useState } from 'react'
import {
  SearchForm,
  ShowWeather,
  DefaultCities,
  WeatherDetails,
  GetWeather,
  SaveCity,
  GetCoords
} from './search'

const MainPage = () => {
  const [someCity, setSomeCity] = useState(localStorage.getItem('savedCity') || 'Minsk')
  const [weather, setWeather] = useState({})
  return (
    <div className="page-container flex items-center justify-center">
      <GetCoords setSomeCity={setSomeCity} />
      <GetWeather cityDefault={someCity} setWeather={setWeather} />
      <SearchForm setSomeCity={setSomeCity} />
      <ShowWeather cityDefault={someCity} dayNum={3} weather={weather} />
      <WeatherDetails city={someCity} />
      <DefaultCities setSomeCity={setSomeCity} />
      <SaveCity cityDefault={someCity} />
    </div>
  )
}

export default MainPage
