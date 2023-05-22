import axios from 'axios'

if (!process.env.RAWG_API_KEY) {
  throw new Error(
    'Please define the RAWG_API_KEY environment variable inside .env.local'
  )
}

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: process.env.RAWG_API_KEY,
  },
})
