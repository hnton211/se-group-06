import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import SignIn from "./routes/SignIn";
import Home from "./routes/Home";
import DeckPage from "./routes/DeckPage";
import CreateDeck from "./routes/CreateDeck";
import CreateWord from "./routes/CreateWord";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/deck/create">
          <CreateDeck />
        </Route>
        <Route path="/deck/:id/add">
          <CreateWord />
        </Route>
        <Route path="/deck/:id">
          <DeckPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
