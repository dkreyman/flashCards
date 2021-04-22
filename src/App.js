import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./Layout/NotFound";
import Study from "./Layout/Study";
import DeckOverview from "./Layout/DeckOverview";
import { listDecks } from "./utils/api/index";
import NewDeck from "./Layout/NewDeck";
import EditDeck from "./Layout/EditDeck";
import AddCard from "./Layout/AddCard";
import EditCard from "./Layout/EditCard";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <div className="app-routes">
      <Switch>
        <Route exact path="/">
          <Layout />
        </Route>
        <Route exact path="/decks/new">
          <NewDeck />
        </Route>
        <Route exact path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route exact path="/decks/:deckId">
          <DeckOverview />
        </Route>
        <Route exact path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <AddCard />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
