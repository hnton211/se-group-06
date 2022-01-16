import React from "react";
import { useHistory } from "react-router-dom";
import Deck from "./Deck";


export default function Decks({ decks }) {
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/deck/${id}`);
  };

  return (
    <div className="decks container">
      {decks.map((deck) => {
        return (
          <div key={deck.id} onClick={() => handleClick(deck.id)}>
            <Deck deck={deck} />
          </div>
        );
      })}
    </div>
  );
}
