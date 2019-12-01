import React, { useState } from "react"
import "./style.scss"

import { Route, Link } from "react-router-dom"

import Input from "../../components/Forms/Input"
import Card from "../../components/Card"

import Detail from "../Detail"

import img404 from "../../assets/404.gif"

import img404 from "../../assets/404.gif"

import YoutubeService from "../../services/YoutubeService"

export default function Home({ match }) {
  const [isSearch, setIsSearch] = useState(false)
  const [result, setResult] = useState([])

  // Disparar ações de busca
  async function makeSearch(term) {
    const results = await YoutubeService.fetchByTerm(term)
    setResult(results)
    setIsSearch(true)
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
          {result &&
            result.map((item, index) => (
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
          {!result && (
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
