/* eslint-disable */
import React, { useState, useEffect } from "react"
import "./style.scss"

import { Route } from "react-router-dom"

import Input from "../../components/Forms/Input"
import Card from "../../components/Card"
import Detail from "../Detail"

import img404 from "../../assets/404.gif"

import YoutubeService from "../../services/YoutubeService"

export default function Home({ match }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [videos, setVideos] = useState([])
  // serach term
  const [term, setTerm] = useState("")
  // infinite scroll
  const [isFetching, setIsFetching] = useState(false)
  const [pageToken, setPageToken] = useState("")

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isFetching) return
    fetchMoreVideos()
  }, [isFetching])

  useEffect(() => {
    if (term) makeSearch(term)
  }, [term])

  function handleScroll() {
    const scrollBottom = window.innerHeight + document.documentElement.scrollTop
    if (scrollBottom !== document.documentElement.offsetHeight) return
    setIsFetching(true)
  }

  // Disparar ação de busca
  async function makeSearch(term) {
    const results = await YoutubeService.fetchByTerm(term)
    if (!results) return

    const { videos, nextPageToken } = results
    setVideos(videos)
    setPageToken(nextPageToken)
    setIsLoaded(true)
  }
  // Buscar videos da próxima página
  async function fetchMoreVideos() {
    const results = await YoutubeService.fetchByTerm(term, pageToken)
    if (!results) return

    const { videos, nextPageToken } = results
    setPageToken(nextPageToken)

    setTimeout(() => {
      setVideos(prevState => [...prevState, ...videos])
      setIsFetching(false)
    }, 2000)
  }

  return (
    <>
      <div className="home-container">
        <div className={`search-container ${isLoaded ? "active" : ""}`}>
          <h1 className="logo">Vearch</h1>
          <Input
            placeholder="Pesquisar"
            icon="search"
            className="search-input"
            onClick={value => setTerm(value)}
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
          {isFetching && <div className="loading">Carregando</div>}
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
