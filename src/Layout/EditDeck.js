import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api/index";
import Header from "./Header";

function EditDeck() {
  const { deckId } = useParams();
  useEffect(() => {
    readDeck(deckId).then((value) => {
      setFormData(value);
    });
  }, []);
  const initialFormState = {
    name: "",
    description: "",
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
    history.go(-1);
    updateDeck(formData);

    setFormData({ ...initialFormState });
  };
  return (
    <>
      <Header />
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
        <h1>Edit Deck</h1>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              Name:
              <input
                className="form-control d-inline"
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="description">
              Description:
              <textarea
                className="form-control d-inline"
                id="description"
                type="text"
                name="description"
                onChange={handleChange}
                value={formData.description}
              />
            </label>
          </div>
          <br />
          <Link
            type="button"
            className="btn btn-secondary btn-md mr-2"
            to={`/decks/${deckId}`}
          >
            Cancel
          </Link>
          <button className="btn btn-primary btn-md" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default EditDeck;
