export default function VideoFactory(data) {
  const { id } = data
  const { description, title, channelTitle: channel, thumbnails } = data.snippet

  if (id.kind.includes("channel")) return undefined

  return {
    id: id.videoId,
    image: thumbnails.high.url,
    title,
    channel,
    description
  }
}
