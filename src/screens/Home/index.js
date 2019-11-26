import React, { useState } from "react";
import "./style.scss";

import Input from "../../components/Forms/Input";

export default function Home() {
  const [isSearch, setIsSearch] = useState(false);

  function makeSearch(term) {
    setIsSearch(true);
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
      <div className="body-container">body</div>
    </div>
  );
}
