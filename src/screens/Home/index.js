import React, { useState } from "react"
import "./style.scss"

import { Route, Link } from "react-router-dom"

import Input from "../../components/Forms/Input"
import Card from "../../components/Card"
import Detail from "../Detail"

import img404 from "../../assets/404.gif"

import YoutubeService from "../../services/YoutubeService"

export default function Home({ match }) {
  const [isSearch, setIsSearch] = useState(false)
  const [videos, setVideos] = useState([])

  // Disparar ações de busca
  async function makeSearch(term) {
    const results = await YoutubeService.fetchByTerm(term)
    setVideos(results)
    setIsSearch(true)
  }

  function fetchData() {
    console.log("LOAD MORE!!!!")
  }

  return (
    <>
      <div className="home-container">
        <div className={`search-container ${isSearch ? "active" : ""}`}>
          <h1 className="logo">Vearch</h1>
          <Input
            placeholder="Pesquisar"
            icon="search"
            className="search-input"
            onClick={value => makeSearch(value)}
          />
        </div>
        <div className="body-container">
          <InfiniteScroll
            dataLength={videos.length}
            next={fetchData}
            hasMore={true}
            loader={<div>Loading...</div>}
            endMessage={<p>You have seen it all</p>}
          ></InfiniteScroll>
          {videos &&
            videos.map((item, index) => (
              <Card
                id={item.id}
                key={index}
                title={item.title}
                image={item.image}
                channel={item.channel}
              >
                {item.description}
              </Card>
            ))}
          {!videos && (
            <div className="no-result">
              <img src={img404} alt="not found" />
              <p>Não encontramos vídeos com o termo buscado.</p>
              <p>Utilize outras palavras-chave.</p>
            </div>
          )}
        </div>
      </div>
      <Route path="/video/:id" component={Detail} />
    </>
  )
}
