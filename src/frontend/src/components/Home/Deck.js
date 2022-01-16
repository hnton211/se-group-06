import React from "react";
import "../../style/Deck.css"
export default function Deck({ deck }) {
  
  return (
    <div className="card-container">
        <div className="card-circle">
        </div>
        <div className="card-content">
            <p>{deck.deck_name}</p>
        </div>
    </div>
  );
}
