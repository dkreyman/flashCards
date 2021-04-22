import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index";

function Layout() {
  const handleDelete = (id) => {
    deleteDeck(id);
  };
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    listDecks().then((value) => {
      setDecks(value);
    });
  }, [decks]);
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Link
          to="/decks/new"
          type="button"
          className="btn btn-secondary btn-lg"
        >
          Create Deck +
        </Link>
        {decks.map((deck) => {
          return (
            <div key={deck["cards"]["id"]} className="card mt-2">
              <div className="card-body">
                <h6 className="float-right mb-0 d-inline-block">
                  {deck["cards"].length} cards
                </h6>
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <div className="d-flex">
                  <div className="p-2">
                    <Link
                      to={`/decks/${deck.id}`}
                      type="button"
                      className="btn btn-secondary btn-md justify-content-start"
                    >
                      View
                    </Link>
                  </div>
                  <div className="p-2">
                    <Link
                      to={`/decks/${deck.id}/study`}
                      type="button"
                      className="btn btn-primary btn-md justify-content-start"
                    >
                      Study
                    </Link>
                  </div>
                  <div className="ml-auto p-2">
                    <button
                      type="button"
                      className="btn btn-danger btn-md justify-content-end"
                      onClick={() => handleDelete(deck.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Layout;
