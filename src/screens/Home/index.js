import React, { useState, useEffect } from "react"
import "./style.scss"

import { Route } from "react-router-dom"

import Input from "../../components/Forms/Input"
import Card from "../../components/Card"
import Detail from "../Detail"

import img404 from "../../assets/404.gif"

import YoutubeService from "../../services/YoutubeService"

export default function Home({ match }) {
  const [isSearch, setIsSearch] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchResult, setSearchResult] = useState([])
  const [videos, setVideos] = useState([])

  useEffect(() => {
    if (searchResult) {
      setVideos([...videos, ...searchResult])
    } else {
      setVideos(null)
    }
    setIsLoading(false)
  }, [searchResult]) // eslint-disable-line

  // Disparar ação de busca
  async function makeSearch(term) {
    setIsLoading(true)
    const results = await YoutubeService.fetchByTerm(term)

    if (results) {
      const { videos } = results
      setSearchResult(videos)
      setIsSearch(true)
      return
    }
    // console.log("erro")
    setSearchResult(null)
    setIsSearch(true)
  }

  function listenPageScroll(event) {
    const homeContainer = event.target
    const homeHeight = homeContainer.scrollHeight

    homeContainer.addEventListener("scroll", () => {
      const posY = homeContainer.scrollTop
      const scrollHeight = homeContainer.clientHeight
      const scrollBottomPos = posY + scrollHeight

      console.log("listener", { isLoading })

      if (!isLoading) {
        if (scrollBottomPos >= homeHeight) {
          console.log("load more")
          makeSearch("violão")
        }
      }
    })
  }

  return (
    <>
      <div className="home-container" onScroll={listenPageScroll}>
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
