import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import Header from "./Header";

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState([]);
  const initialFormState = {
    front: "",
    back: "",
    id: { cardId },
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  useEffect(() => {
    readDeck(deckId).then((value) => {
      setDeck(value);
    });
    readCard(cardId).then((value) => {
      setFormData(value);
    });
  }, []);
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
      id: cardId,
    });
  };
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    updateCard(formData).then(() => {
      history.go(-1);
      setFormData({ ...initialFormState });
    });
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
            <li class="breadcrumb-item active">{deck["name"]}</li>
            <li class="breadcrumb-item active" aria-current="page">
              Edit Card
            </li>
          </ol>
        </nav>
        <h1>Edit Card for {deck["name"]}</h1>
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

export default EditCard;
