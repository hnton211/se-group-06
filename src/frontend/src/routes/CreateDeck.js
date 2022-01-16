import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../apis/flashcardModel";

const CreateDeck = () => {
  let history = useHistory();
  const [name, setName] = useState("");
  const handleCreate = async (e) => {
    e.preventDefault();
    const result = await createDeck(localStorage.getItem("token"), name);
    console.log(result);
    history.goBack();
  };

  return (
    <div className="flexbox-container">
      <div className="create-form-container create-deck">
        <h1
          style={{
            color: "#edf5d1",
          }}
        >
          Create New Deck
        </h1>
        <form className="create-form">
          <label
            style={{ marginTop: "2rem",fontSize: "36px", color: "#edf5d1" }}
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="name-input"
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="name"
            type="text"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <button
              className="create-button"
              onClick={handleCreate}
              title="create"
              style={{
                cursor: "pointer"
              }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDeck;
