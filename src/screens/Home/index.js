import React, { useState } from "react";
import "./style.scss";

import Input from "../../components/Forms/Input";
import Card from "../../components/Card";

import { search } from "../../mock";

export default function Home() {
  const [isSearch, setIsSearch] = useState(false);
  const [result, setResult] = useState([]);

  function makeSearch(term) {
    setIsSearch(true);
    setTimeout(() => {
      setResult(search);
    }, 500);
  }

  return (
    <div className="home-container">
      <div className={`search-container ${isSearch ? "active" : ""}`}>
        <Input
          placeholder="Pesquisar"
          icon="search"
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
  );
}
