import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Layout({ decks }) {
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
            <div class="card mt-2">
              <div class="card-body">
                <h8 className="float-right mb-0 d-inline-block">
                  {deck["cards"].length} Cards
                </h8>
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <div class="d-flex">
                  <div class="p-2">
                    <Link
                      to={`/decks/${deck.id}`}
                      type="button"
                      className="btn btn-secondary btn-md justify-content-start"
                    >
                      View
                    </Link>
                  </div>
                  <div class="p-2">
                    <Link
                      to={`/decks/${deck.id}/study`}
                      type="button"
                      className="btn btn-primary btn-md justify-content-start"
                    >
                      Study
                    </Link>
                  </div>
                  <div class="ml-auto p-2">
                    <Link
                      to="/decks/:deckId/study"
                      type="button"
                      className="btn btn-primary btn-md justify-content-end"
                    >
                      Delete
                    </Link>
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
