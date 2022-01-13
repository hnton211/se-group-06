import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getWordsFromDeck } from "../apis/flashcardModel";
import FlashcardList from "../components/DeckPage/FlashcardList";

export default function DeckPage() {
  let history = useHistory();
  const { id } = useParams();
  const [wordList, setWordList] = useState(undefined);

  const handleClick = () => {
    history.push(`/deck/${id}/add`);
  };

  useEffect(async () => {
    const { data } = await getWordsFromDeck(id);
    setWordList(data);
  }, []);

  return (
    <div>
      <div className="container">
        {wordList && <FlashcardList flashcards={wordList} />}
      </div>
      <button title="Add new word" className="add-button" onClick={handleClick}>
        +
      </button>
    </div>
  );
}
