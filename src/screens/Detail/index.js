import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "./style.scss"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

import YoutubeService from "../../services/YoutubeService"

export default function Detail({ match }) {
  let history = useHistory()
  const { params } = match
  const [video, setVideo] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchVideo(id) {
      const video = await YoutubeService.fetchVideoDetail(id)
      setVideo(video)
      setIsLoading(false)
    }
    fetchVideo(params.id)
  }, [params])

  function handleLeavePage() {
    history.goBack(1)
  }

  return (
    <section
      className={`detail-container ${
        isLoading ? "detail-animation-enter" : ""
      }`}
    >
      <SkeletonTheme color="#ffffff" highlightColor="#efefef">
        <div className="detail-header">
          <span className="header-back-arrow" onClick={handleLeavePage}>
            <i className="material-icons">arrow_back</i>
          </span>
          <header className="header-body">
            <h2 className="header-title">{video.title || <Skeleton />}</h2>
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
              <h2>{video.channel || <Skeleton />}</h2>
              <div className="video-statistics">
                <span>
                  <i className="material-icons">thumb_up</i>
                  {video.likes || <Skeleton width={50} />}
                </span>
                <span>
                  <i className="material-icons">thumb_down</i>
                  {video.dislikes || <Skeleton width={50} />}
                </span>
              </div>
            </div>

            <div className="video-description">
              {video.description || <Skeleton count={10} />}
            </div>
          </div>
          <footer>
            <span className="footer-views">
              <i className="material-icons">remove_red_eye</i>
              {video.views || <Skeleton width={50} />}
            </span>
          </footer>
        </article>
      </SkeletonTheme>
    </section>
  )
}
