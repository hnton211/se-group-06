import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createWord } from "../apis/flashcardModel";

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
      <div className="create-form-container">
        <h1
          style={{
            color: "#edf5d1",
            marginTop: "100px",
            flex: "1",
          }}
        >
          Create New Word
        </h1>
        <form className="create-form">
          <label
            style={{ margin: "10px 0px", fontSize: "25px", color: "#edf5d1" }}
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
            style={{ margin: "10px 0px", fontSize: "25px", color: "#edf5d1" }}
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
            style={{ margin: "10px 0px", fontSize: "25px", color: "#edf5d1" }}
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
