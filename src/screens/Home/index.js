import React from "react";
import "./style.scss";

import { Input } from "../../components/Forms/Input";

export default function Home() {
  return (
    <div className="home-container">
      <div className="search-container">
        <Input placeholder="Pesquisar" />
      </div>
    </div>
  );
}
