import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_URL

const getWeather = async (city = 'Yangon') => {
  // show only filter city
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`
  const response = await axios.get(baseUrl)
  return response.data
}

// eslint-disable-next-line
export default {
  getWeather
} 