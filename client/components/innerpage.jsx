import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShowWeather, GetWeather, SearchForm } from './search'

const InnerPage = () => {
  const { cityName } = useParams()
  const [cityDet, setCityDet] = useState(cityName)
  const [weather, setWeather] = useState({})
  return (
    <div className="page-container flex items-center justify-center">
      <SearchForm setSomeCity={setCityDet} />
      <GetWeather cityDefault={cityDet} setWeather={setWeather} />
      <h1>Detailed weather forecast for {cityDet}</h1>
      <div className="weather-table flex">
        <div className="weather-table__elem">
          <h3 className="h3">Hourly forecast</h3>
          <ShowWeather cityDefault={cityDet} weather={weather} hoursNum={10} />
        </div>
        <div className="weather-table__elem">
          <h3 className="h3">10 day forecast</h3>
          <ShowWeather cityDefault={cityDet} dayNum={10} weather={weather} />
        </div>
      </div>
    </div>
  )
}

export default InnerPage
