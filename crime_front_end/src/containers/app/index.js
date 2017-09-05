import React from 'react';
import { Route, Link } from 'react-router-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import CrimeContainer from "../CrimeContainer";
import CustomAppBar from "../CustomAppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ChatContainer from "../ChatContainer";
import DataStory from "../../components/DataStory";
import About from "../../components/About";
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <div>
      <Route path="/" component={CustomAppBar} />
      <header>
      </header>
      <main>
        <Route exact path="/" component={CrimeContainer} />
        <Route exact path="/about" component={About} />
        <Route exact path="/chat" component={ChatContainer}/>
        <Route exact path="/data_story" component={DataStory}/>
      </main>

    </div>
  </MuiThemeProvider>
)

export default App
