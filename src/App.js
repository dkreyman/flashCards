import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./Layout/NotFound";
import Study from "./Layout/Study";
import DeckOverview from "./Layout/DeckOverview";
import { listDecks } from "./utils/api/index";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    listDecks().then((value) => {
      setDecks(value);
    });
  }, []);

  return (
    <div className="app-routes">
      <Switch>
        <Route exact path="/">
          <Layout decks={decks} />
        </Route>
        <Route exact path="/decks/:deckId">
          <DeckOverview decks={decks} />
        </Route>
        <Route exact path="/decks/:deckId/study">
          <Study decks={decks} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
