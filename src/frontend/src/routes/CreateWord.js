import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createWord } from "../apis/flashcardModel";
import "../style/Word.css"

const CreateWord = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  let history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    const result = await createWord(id, name, meaning, example);
    console.log(result);
    history.goBack();
  };

  return (
    <div className="flexbox-container">
      <div className="create-form-container create-word">
        <h1
          style={{
            color: "#edf5d1",
          }}
        >
          Create New Word
        </h1>
        <form className="create-form">
          <label
            style={{ fontSize: "36px", color: "#edf5d1" }}
            htmlFor="name"
          >
            Word
          </label>
          <input
            className="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
          />
          <label
            style={{ fontSize: "36px", color: "#edf5d1" }}
            htmlFor="meaning"
          >
            Meaning
          </label>
          <input
            className="name-input"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            type="text"
            id="meaning"
          />
          <label
            style={{ fontSize: "36px", color: "#edf5d1" }}
            htmlFor="example"
          >
            Example
          </label>
          <input
            className="name-input"
            value={example}
            onChange={(e) => setExample(e.target.value)}
            type="text"
            id="example"
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
              onClick={handleClick}
              type="submit"
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

export default CreateWord;
