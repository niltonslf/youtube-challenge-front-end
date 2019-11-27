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
        {result.map((item, index) => (
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
      </div>
    </div>
  );
}
