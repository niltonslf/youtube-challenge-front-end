import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./style.scss"

import YoutubeService from "../../services/YoutubeService"

export default function Detail({ match }) {
  const { params } = match
  const [video, setVideo] = useState({})

  useEffect(() => {
    async function fetchVideo(id) {
      const video = await YoutubeService.fetchVideoDetail(id)
      setVideo(video)
    }
    fetchVideo(params.id)
  }, [params])

  return (
    <section className="detail-container">
      <div className="detail-header">
        <Link to="/">
          <i className="material-icons">arrow_back</i>
        </Link>
        <header className="header-body">
          <h1>{video.title}</h1>
        </header>
      </div>
      <article className="video">
        <div className="video-frame">
          <iframe
            title="title"
            width="560"
            height="400"
            src={`https://www.youtube.com/embed/${params.id}`}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="video-body">
          <div className="video-header">
            <h2>{video.channel}</h2>
            <div className="video-statistics">
              <span>
                <i className="material-icons">thumb_up</i>
                {video.likes}
              </span>
              <span>
                <i className="material-icons">thumb_down</i>
                {video.dislikes}
              </span>
            </div>
          </div>

          <div className="video-description">
            <p>{video.description}</p>
          </div>
        </div>
        <footer>
          <span className="footer-views">
            <i className="material-icons">remove_red_eye</i>
            {video.views}
          </span>
        </footer>
      </article>
    </section>
  )
}
