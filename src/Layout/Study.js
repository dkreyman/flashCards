import React, { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

function Study({ decks }) {
  const { deckId } = useParams();
  const deck = decks.filter((deck) => {
    return deck.id.toString() === deckId;
  });
  const [side, setSide] = useState("front");
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
    if (cardNum + 1 < deck[0]["cards"].length) {
      setCardNum(cardNum + 1);
    } else {
      let confirmed = window.confirm(
        "Restart Cards? Press Cancel To Return Home"
      );
      if (confirmed === true) {
        setCardNum(0);
      } else {
        history.push("/");
      }
    }
  };

  if (deck[0]["cards"].length > 2) {
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
                <a href="#">{deck[0]["name"]}</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Study
              </li>
            </ol>
          </nav>
        </div>
        {deck.map((deck) => {
          return (
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
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
              <a href="#">{deck[0]["name"]}</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        {deck.map((deck) => {
          return (
            <>
              <h1>{deck["name"]}: Study</h1>
              <h3>Not Enough Cards.</h3>
              <p>
                You need at least 3 cards to study. There are{" "}
                {deck["cards"].length} in this deck.
              </p>
              <Link
                to={`/decks/${deck.id}/cards/new`}
                type="button"
                className="btn btn-primary btn-md justify-content-start"
              >
                Add Cards
              </Link>
            </>
          );
        })}
      </div>
    );
  }
}

export default Study;
