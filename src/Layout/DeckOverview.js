import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck } from "../utils/api/index";

function DeckOverview() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const history = useHistory();
  useEffect(() => {
    readDeck(deckId).then((value) => {
      setDeck(value);
      setCards(value["cards"]);
    });
  }, [deck]);
  const handleDeleteDeck = (id) => {
    deleteDeck(id);
    history.push("/");
  };
  const handleDeleteCard = (id) => {
    deleteCard(id);
  };
  return (
    <>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active">{deck["name"]}</li>
          </ol>
        </nav>
      </div>
      <div className="container">
        <h6 className="float-right mb-0 d-inline-block">
          {cards.length} Cards
        </h6>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div className="d-flex">
          <div className="p-2">
            <Link
              to={`/decks/${deck.id}/edit`}
              type="button"
              className="btn btn-secondary btn-md justify-content-start"
            >
              Edit
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
          <div className="p-2">
            <Link
              to={`/decks/${deck.id}/cards/new`}
              type="button"
              className="btn btn-primary btn-md justify-content-start"
            >
              Add Cards
            </Link>
          </div>
          <div className="ml-auto p-2">
            <button
              type="button"
              className="btn btn-danger btn-md justify-content-end"
              onClick={() => handleDeleteDeck(deck.id)}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="mt-5">
          <h2>Cards:</h2>
        </div>
        {cards.map((card) => {
          return (
            <div className="card mt-2 pt-3">
              <div className="card-body">
                <h5>Front: </h5>
                <p>{card["front"]}</p>
                <h5>Back:</h5>
                <p>{card["back"]}</p>
              </div>
              <div className="m-3">
                <Link
                  to={`/decks/${deck.id}/cards/${card.id}/edit`}
                  type="button"
                  className="btn btn-secondary mr-2 btn-md justify-content-start"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn btn-danger btn-md justify-content-end"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DeckOverview;
