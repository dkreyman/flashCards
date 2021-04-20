import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

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
  console.log(cardNum, deck[0]["cards"].length);
  const handleNext = () => {
    if (cardNum + 1 < deck[0]["cards"].length) {
      setCardNum(cardNum + 1);
    } else {
      setCardNum(0);
    }
  };

  return (
    <>
      {/* TODO: Implement the screen starting here */}
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
}

export default Study;
