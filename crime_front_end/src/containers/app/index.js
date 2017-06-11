import React from 'react';
import { Route, Link } from 'react-router-dom'

import CrimeContainer from "../CrimeContainer"

import CustomAppBar from "../CustomAppBar"

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const App = () => (
  <MuiThemeProvider>
    <div>
      <Route path="/" component={CustomAppBar} />
      <header>
      </header>
      <main>
        <Route exact path="/" component={CrimeContainer} />
      </main>
    </div>
  </MuiThemeProvider>
)

export default App
