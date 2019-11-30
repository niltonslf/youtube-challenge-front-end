import React, { useState } from "react"
import "./style.scss"

import Input from "../../components/Forms/Input"
import Card from "../../components/Card"

import YoutubeService from "../../services/YoutubeService"

export default function Home() {
  const [isSearch, setIsSearch] = useState(false)
  const [result, setResult] = useState([])

  // Disparar ações de busca
  function makeSearch(term) {
    setIsSearch(true)
    setTimeout(async () => {
      const results = await YoutubeService.fetchByTerm(term)
      setResult(results)
    }, 500)
  }

  return (
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
            <img
              src="https://media2.giphy.com/media/14uQ3cOFteDaU/giphy.gif?cid=790b7611233668a72394af0d83182c2c479c50574f5a68fa&rid=giphy.gif"
              alt="not found"
            />
            <p>Não encontramos vídeos com o termo buscado.</p>
            <p>Utilize outras palavras-chave.</p>
          </div>
        )}
      </div>
    </div>
  )
}
