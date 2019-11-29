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
    const part = ["id", "snippet"]

    const response = await this.axios.get("/search", {
      params: {
        part: part.join(","),
        q: term,
        type: "video",
        key: this.key
      }
    })
    // guarda os itens retornados na busca
    const { items } = response.data
    // trata os resultados do youtube
    const videos = items
      .map(item => VideoFactory(item, part))
      .filter(item => !!item)
    return videos
  }

  /**
   * Busca detalhes de um vídeo a partir do seu ID
   * @param {String} id 
   * @return {video}
   */
  async fetchVideoDetail(id) {
    const part = ["id", "snippet", "statistics"]

    const response = await this.axios.get("/videos", {
      params: {
        id,
        part: part.join(","),
        key: this.key
      }
    })

    const { items } = response.data
    const video = VideoFactory(items[0], part)

    return video
  }
}
export default new YoutubeService()
