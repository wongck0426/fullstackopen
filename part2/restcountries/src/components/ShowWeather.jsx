import axios from "axios"
import { useEffect, useState } from "react"

const ShowWeather = ({ capital }) => {
  const APIcall = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`

  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(APIcall)
      .then((res) => {
        setWeather(res.data)
        console.log(weather)
      })
      .catch(console.error("something wrong"))
  }, [capital])

  if (!weather) {
    return <div>Loading the weather</div>
  } else {
    return (
      <>
        <h1>Weather in {capital}</h1>
        <div>temperature {weather.main ? weather.main.temp : "Loading"}</div>
        {weather.main ? (
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
        ) : (
          <h2>Imaging not working</h2>
        )}
        {weather.wind ? (
          <di>wind {weather.wind.speed} m/s</di>
        ) : (
          <div>Loading...</div>
        )}
      </>
    )
  }
}
export default ShowWeather
