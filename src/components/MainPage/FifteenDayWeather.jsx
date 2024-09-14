import React, { useEffect, useState } from 'react'

export default function FifteenDayWeather({ data }) {
  const [day, setDay] = useState('')
  const [icon, setIcon] = useState('')
  const [feelsLike, setFeelsLike] = useState('')
  const [date, setDate] = useState('')
  useEffect(() => {
    if (data) {
      setIcon(data.icon)
      setFeelsLike(data.feelslike)
      setDate(data.datetime)

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const givenDate = new Date(date)
      const dayOfWeek = givenDate.getDay()

      setDay(days[dayOfWeek])
    }
  }, [data, date])
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', height:'10vh', alignItems:'center', borderBottom:'1px solid black'}}>
      <img style={{height:'5vh'}} src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/${icon}.svg`} alt="" />
      <h1>{`${feelsLike}°`}</h1>
      <p>{date}</p>
      <p>{day}</p>
    </div>
  )
}
