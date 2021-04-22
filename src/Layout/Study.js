import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    readDeck(deckId).then((value) => {
      setDeck(value);
      setCards(value["cards"]);
    });
  }, []);
  const [side, setSide] = useState("front");
  let nextDisplay;
  if (side === "front") {
    nextDisplay = "none";
  } else {
    nextDisplay = "inline";
  }
  const handleFlip = () => {
    if (side === "front") {
      setSide("back");
    } else {
      setSide("front");
    }
  };
  const [cardNum, setCardNum] = useState(0);
  const history = useHistory();
  const handleNext = () => {
    if (cardNum + 1 < deck["cards"].length) {
      setCardNum(cardNum + 1);
      setSide("front");
    } else {
      let confirmed = window.confirm(
        "Restart Cards? Press Cancel To Return Home"
      );
      if (confirmed === true) {
        setCardNum(0);
        setSide("front");
      } else {
        history.push("/");
      }
    }
  };

  if (cards.length > 2) {
    return (
      <>
        {/* TODO: Implement the screen starting here */}
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li class="breadcrumb-item">
                <a href={`/decks/${deck.id}`}>{deck["name"]}</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Study
              </li>
            </ol>
          </nav>
        </div>
        <div className="container">
          <h1>{deck["name"]}: Study</h1>
          <div class="card mt-2 pt-3">
            <div class="card-body">
              <h4>
                Card {cardNum + 1} of {deck["cards"].length}
              </h4>
              <p>{deck["cards"][cardNum][side]}</p>
            </div>
            <div className="m-3">
              <button
                to="/decks/:deckId"
                type="button"
                className="btn btn-secondary btn-md justify-content-start"
                onClick={handleFlip}
              >
                Flip
              </button>
              <button
                to="/decks/:deckId"
                type="button"
                className="btn btn-secondary btn-md m-2"
                onClick={handleNext}
                style={{ display: nextDisplay }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li class="breadcrumb-item">
              <a href="#">{deck["name"]}</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <div>
          <h1>{deck["name"]}: Study</h1>
          <h3>Not Enough Cards.</h3>
          <p>
            You need at least 3 cards to study. There are {cards.length} in this
            deck.
          </p>
          <Link
            to={`/decks/${deck.id}/cards/new`}
            type="button"
            className="btn btn-primary btn-md justify-content-start"
          >
            Add Cards
          </Link>
          <div />
        </div>
      </div>
    );
  }
}

export default Study;
