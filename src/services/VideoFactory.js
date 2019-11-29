/**
 * Cria um novo tipo video para o dado fornecido via argumento
 * @param {*} data dados retornados pela api
 * @param {Array} resources recursos utilizados para fazer a request para a API [part]
 */
export default function VideoFactory(data, resources) {
  const response = resources
    .map(resource => resourcesFactory[resource](data[resource])) // invoca a factory do recurso passando a propriedade específica do mesmo
    .reduce((prev, cur) => ({ ...prev, ...cur }))
  return response
}

/**
 * Factory para tratar os dados dos diferentes tipos de recursos recursos que
 * podem ser solicitados num vídeo
 */
const resourcesFactory = {
  // trata os dados do tipo id
  id: data => {
    const { videoId: id } = data

    return {
      id
    }
  },
  // trata os dados do tipo snippet
  snippet: data => {
    const {
      description,
      title,
      channelTitle: channel,
      thumbnails: {
        high: { url: image }
      }
    } = data

    return { description, title, channel, image }
  },
  // trata os dados do tipo statistic
  statistics: data => {
    const { viewCount: views, likeCount: likes, dislikeCount: dislikes } = data
    return {
      views,
      likes,
      dislikes
    }
  }
}
