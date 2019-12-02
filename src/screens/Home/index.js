/* eslint-disable */
import React, { useState, useEffect } from "react"
import "./style.scss"

import { useHistory } from "react-router-dom"

import Input from "../../components/Forms/Input"
import Card from "../../components/Card"
import Detail from "../Detail"

import img404 from "../../assets/404.gif"

import YoutubeService from "../../services/YoutubeService"

export default function Home({ match }) {
  let history = useHistory()

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
    const {
      location: { search }
    } = history
    const urlParam = new URLSearchParams(search)
    setTerm(urlParam.get("search"))
  }, [])

  useEffect(() => {
    if (!isFetching) return
    fetchMoreVideos()
  }, [isFetching])

  useEffect(() => {
    if (term) makeSearch(term)
  }, [term])

  // Lidar com o scroll da página
  function handleScroll() {
    const homeContainer = document.querySelector(".home-container")
    const scrollBottom = homeContainer.clientHeight + homeContainer.scrollTop
    if (scrollBottom !== homeContainer.offsetHeight) return
    setIsFetching(true)
  }

  // Disparar ação de busca
  async function makeSearch(term) {
    history.push(`/?search=${term}`) // adicionar termo na url

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
    setPageToken(nextPageToken) // salva o token da próxima página

    setTimeout(() => {
      setVideos(prevState => [...prevState, ...videos])
      setIsFetching(false)
    }, 2000)
  }

  //
  function backHome() {
    history.push("/")
    setTerm("")
    setVideos([])
    setIsLoaded(false)
  }

  return (
    <>
      <div className="home-container">
        <div className={`search-container ${isLoaded ? "active" : ""}`}>
          <h1 className="logo" onClick={backHome}>
            Vearch
          </h1>
          <Input
            placeholder="Pesquisar"
            icon={!term ? "search" : "close"}
            className="search-input"
            val={term}
            onClick={value => (!term ? setTerm(value) : backHome())}
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
        {isFetching && <div className="loading">Carregando</div>}
      </div>
    </>
  )
}
