import ApiService from "./ApiService"

import VideoFactory from "./VideoFactory"
const { axios } = ApiService()

class YoutubeService {
  constructor() {
    this.axios = axios
    this.key = process.env.REACT_APP_YT_KEY
  }

  /**
   * Buscar vídeos por um termo
   * @param {*} term termo à ser buscado
   * @returns {Array} videos
   */
  async fetchByTerm(term) {
    const response = await this.axios.get("/search", {
      params: {
        part: "id,snippet",
        q: term,
        key: this.key
      }
    })
    // guarda os itens retornados na busca
    const { items } = response.data

    // faz um tratamento dos dados retornados do youtube
    const parsedVideos = items
      .map(item => VideoFactory(item))
      .filter(item => !!item)

    return parsedVideos
  }
}
export default new YoutubeService()
