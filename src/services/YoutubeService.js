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
  async fetchByTerm(term, pageToken) {
    const part = ["id", "snippet"]

    try {
      const response = await this.axios.get("/search", {
        params: {
          part: part.join(","),
          q: term,
          type: "video",
          key: this.key,
          maxResults: 21,
          pageToken: pageToken || ""
        }
      })

      // guarda os itens retornados na busca
      const { items, nextPageToken } = response.data

      // trata os resultados do youtube
      const videos = items
        .map(item => VideoFactory(item, part))
        .filter(item => !!item)
      return { nextPageToken: nextPageToken || null, videos }
    } catch (e) {
      return null
    }
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
