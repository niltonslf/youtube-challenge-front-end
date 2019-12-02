import React from "react"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import "./style.scss"

export default function Card({ title, children, image, channel, id }) {
  return (
    <article className="card-container">
      <header>
        {image && <img src={image} alt={title} />}
        {!image && <Skeleton height={320} />}
      </header>
      <div className="card-body">
        <h1>{title || <Skeleton />}</h1>
        <h2>{channel || <Skeleton />}</h2>
        <p>{children || <Skeleton count={3} />}</p>
      </div>
      <footer>
        <Link to={`/video/${id}`} className="btn-default">
          Detalhes do vídeo
        </Link>
      </footer>
    </article>
  )
}
