import React from "react";

const Dashboard = ({ info }) => {
  return (
    <div
      style={{
        textTransform: "uppercase",
        fontSize: 25,
        textAlign: "center",
        color: "#379683",
      }}
    >
      <h1> Greetings, {info.username}</h1>
    </div>
  );
};

export default Dashboard;
