import React from "react";
import Header from "./home/Header";
import NotFound from "./home/NotFound";
import DeckCreate from "./deck/DeckCreate";
import DeckView from "./deck/DeckView";
import DeckEdit from "./deck/DeckEdit";
import CardCreate from "./card/CardCreate";
import CardEdit from "./card/CardEdit";
import Home from "./home/Home";
import Study from "./study/Study";
import { Route, Switch } from "react-router-dom";

function Layout() {

  return (
    <>
      <Header />
      <div className="container">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route exact path="/decks/new">
          <DeckCreate />
        </Route>
        <Route exact path="/decks/:deckId">
          <DeckView />
        </Route>
        <Route exact path="/decks/:deckId/edit">
          <DeckEdit />
        </Route>
        <Route exact path="/decks/:deckId/cards/new">
          <CardCreate />
        </Route>
        <Route exact path="/decks/:deckId/cards/:cardId/edit">
          <CardEdit />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      </div>
    </>
  );
}

export default Layout;
