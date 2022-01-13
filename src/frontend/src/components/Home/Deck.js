import React from "react";

export default function Deck({ deck }) {
  return (
    <div className="deck">
      <h1>{deck.deck_name}</h1>
    </div>
  );
}
