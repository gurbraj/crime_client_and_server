import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import CrimeContainer from "../CrimeContainer"

import CustomAppBar from "../CustomAppBar"

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const App = () => (
  <MuiThemeProvider>
    <div>
      <Route path="/" component={CustomAppBar} />
      <header>
        <Link to="/">Home</Link>
        <Link to="/crime">Crime</Link>
      </header>

      <main>

        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/crime" component={CrimeContainer} />
      </main>
    </div>
  </MuiThemeProvider>
)

export default App
