import React from "react";
import { useParams, Link } from "react-router-dom";

function DeckOverview({ decks }) {
  const { deckId } = useParams();
  return (
    <>
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <h1>Deck Overview</h1>
        <Link
          to="/decks/new"
          type="button"
          className="btn btn-secondary btn-lg"
        >
          Create Deck +
        </Link>
        {decks
          .filter((deck) => {
            return deck.id.toString() === deckId;
          })
          .map((deck) => {
            return (
              <div>
                {deck["cards"].map((card) => {
                  return (
                    <div class="card mt-2 pt-3">
                      <div class="card-body">
                        <p>{card["front"]}</p>
                      </div>
                      <div className="m-3">
                        <button
                          to="/decks/:deckId"
                          type="button"
                          className="btn btn-secondary btn-md justify-content-start"
                        >
                          Flip
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default DeckOverview;
