import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

export default function Card({ title, children, image, channel, id }) {
  return (
    <article className="card-container">
      <header>
        <img src={image} alt={title} />
      </header>
      <div className="card-body">
        <h1>{title}</h1>
        <h2>{channel}</h2>
        <p>{children}</p>
      </div>
      <footer>
        <Link to={`/video/${id}`}>Detalhes do vídeo</Link>
      </footer>
    </article>
  );
}
