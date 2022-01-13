/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { getAllDeck } from "../apis/flashcardModel";
import { getUserDataService } from "../apis/userModel";
import Dashboard from "../components/Home/Dashboard";
import Decks from "../components/Home/Decks";

const Home = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = React.useState({});
  const [allDecks, setAllDecks] = React.useState([]);
  let token = null;
  let login = null;
  let history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/deck/create");
  };

  React.useEffect(async () => {
    const preprocess = async () => {
      if (location.state !== undefined) {
        token = location.state.token;
        localStorage.setItem("token", token);
      } else if (localStorage.getItem("token") !== null) {
        token = localStorage.getItem("token");
      }

      if (token === null) {
        login = false;
      } else {
        setUserInfo(await getUserDataService(token));
        const answer = await getAllDeck(token);
        setAllDecks(answer.data);
      }
    };

    preprocess();
  }, []);

  return (
    <div>
      {login === false ? (
        <Redirect to="sign-in" />
      ) : (
        <div>
          <Dashboard info={userInfo} />
          <Decks decks={allDecks} />
          <button
            type="submit"
            onClick={handleClick}
            className="add-button"
            title="Add new deck"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
