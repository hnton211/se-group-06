import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getWordsFromDeck, pushToDeck } from "../apis/flashcardModel";
import Flashcard from "../components/DeckPage/Flashcard";

export default function DeckPage() {
  let history = useHistory();
  const { id } = useParams();
  const [wordList, setWordList] = useState([]);

  const fetchData = async () => {
    const { data } = await getWordsFromDeck(id);
    setWordList(data);
  };

  const handleClick = () => {
    history.push(`/deck/${id}/add`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLevelSubmit = async (level) => {
    const { data } = await pushToDeck(id, wordList[0].id, level);
    fetchData();
  };

  return (
    <div>
      <div className="card-window">
        {wordList.length > 0 && <Flashcard flashcard={wordList[0]} />}
      </div>
      {wordList.length > 0 && (
        <div>
          {" "}
          <button className="level-button" onClick={() => handleLevelSubmit(1)}>
            Easy
          </button>
          <button className="level-button" onClick={() => handleLevelSubmit(2)}>
            Normal
          </button>
          <button className="level-button" onClick={() => handleLevelSubmit(3)}>
            Difficult
          </button>
          <button className="level-button" onClick={() => handleLevelSubmit(4)}>
            Legendary
          </button>
        </div>
      )}
      <button title="Add new word" className="add-button" onClick={handleClick}>
        +
      </button>
    </div>
  );
}
