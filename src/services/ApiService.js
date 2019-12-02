import axios from "axios"

export default function ApiService() {
  const instance = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3"
  })

  return { axios: instance }
}
