import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

export default function Detail({ match }) {
  const { params } = match;
  useEffect(() => {
    function fetchVideo(id) {
      console.log(`find video #${id}`);
    }

    fetchVideo(params.id);
  }, [params]);

  return (
    <section className="detail-container">
      <div className="detail-header">
        <Link to="/">
          <i className="material-icons">arrow_back</i>
        </Link>
        <header className="header-body">
          <h1>Título do vídeo 1</h1>
        </header>
      </div>
      <article className="video">
        <div className="video-frame">
          <iframe
            width="560"
            height="400"
            src="https://www.youtube.com/embed/jt9oRHFpZfs"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="video-body">
          <div className="video-header">
            <h2>Nome do canal</h2>
            <div className="video-statistics">
              <span>
                <i className="material-icons">thumb_up</i>
                9.999
              </span>
              <span>
                <i className="material-icons">thumb_down</i>
                9.999
              </span>
            </div>
          </div>

          <div className="video-description">
            <p>
              Laboris Lorem culpa id Lorem quis laborum tempor sint ad
              incididunt cillum. Ea labore dolor fugiat irure minim qui.
              Proident laborum sunt nisi consectetur elit ex elit Lorem velit
              esse sit elit mollit. Mollit officia sint dolore fugiat est do
              enim laborum fugiat adipisicing. Aute cillum dolor cupidatat non.
            </p>
          </div>
        </div>
        <footer>
          <span className="footer-views">
            <i className="material-icons">remove_red_eye</i>
            9.999
          </span>
        </footer>
      </article>
    </section>
  );
}
