import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Home from "./screens/Home"
import Detail from "./screens/Detail"

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
        {/* <Route path="/video/:id" component={Detail} /> */}
      </Switch>
    </BrowserRouter>
  )
}
