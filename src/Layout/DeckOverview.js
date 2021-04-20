import React from "react";
import { useParams, Link } from "react-router-dom";

function DeckOverview({ decks }) {
  const { deckId } = useParams();
  const deck = decks.filter((deck) => {
    return deck.id.toString() === deckId;
  });
  return (
    <>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li class="breadcrumb-item active">{deck[0]["name"]}</li>
          </ol>
        </nav>
      </div>
      <div className="container">
        {deck.map((deck) => {
          return (
            <div>
              <div>
                <div>
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
                    <div class="p-2">
                      <Link
                        to={`/decks/${deck.id}/cards/new`}
                        type="button"
                        className="btn btn-primary btn-md justify-content-start"
                      >
                        Add Cards
                      </Link>
                    </div>
                    <div class="ml-auto p-2">
                      <Link
                        to="/decks/:deckId/study"
                        type="button"
                        className="btn btn-danger btn-md justify-content-end"
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h2>Cards:</h2>
              </div>
              {deck["cards"].map((card) => {
                return (
                  <div class="card mt-2 pt-3">
                    <div class="card-body">
                      <h5>Front: </h5>
                      <p>{card["front"]}</p>
                      <h5>Back:</h5>
                      <p>{card["back"]}</p>
                    </div>
                    <div className="m-3">
                      <Link
                        to="/decks/:deckId"
                        type="button"
                        className="btn btn-secondary btn-md justify-content-start"
                      >
                        Edit
                      </Link>
                      <Link
                        to="/decks/:deckId"
                        type="button"
                        className="btn btn-danger m-1 btn-md justify-content-start"
                      >
                        Delete
                      </Link>
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
