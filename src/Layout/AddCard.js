import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard } from "../utils/api/index";
import Header from "./Header";

function AddCard({ decks }) {
  const { deckId } = useParams();
  const deck = decks.filter((deck) => {
    return deck.id.toString() === deckId;
  });
  const initialFormState = {
    front: "Front side of card",
    back: "Back side of card",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    createCard(deckId, formData);
    history.go(-1);
    setFormData({ ...initialFormState });
  };
  return (
    <>
      <Header />
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li class="breadcrumb-item active">{deck[0]["name"]}</li>
            <li class="breadcrumb-item active" aria-current="page">
              Add Card
            </li>
          </ol>
        </nav>
        <h1>Create Card for {deck[0]["name"]}</h1>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="front">
              Front:
              <textarea
                className="form-control d-inline"
                id="front"
                type="text"
                name="front"
                onChange={handleChange}
                value={formData.front}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="back">
              Back:
              <textarea
                className="form-control d-inline"
                id="back"
                type="text"
                name="back"
                onChange={handleChange}
                value={formData.back}
              />
            </label>
          </div>
          <br />
          <Link
            type="button"
            className="btn btn-secondary btn-md mr-2"
            to={`/decks/${deckId}`}
          >
            Done
          </Link>
          <button className="btn btn-primary btn-md" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCard;
