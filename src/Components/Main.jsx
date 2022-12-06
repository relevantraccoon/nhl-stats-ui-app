import React from "react";
// import { useGlobalContext } from "../context";
import { Routes, Route } from "react-router-dom";
import Leaderstart from "./Leaderstart";
import Leaderselections from "./Leaderselections";

const Main = () => {
  // const { loading, leaders } = useGlobalContext();

  // const allPlayerTypes = leaders.map((playerType) => {
  //   return playerType.playerType;
  // });

  return (
    <main id="main">
      {/* {allPlayerTypes.map((playerType, index) => {
        return <Positioncard key={index} playerType={playerType} />;
      })} */}
      {/* <Positioncard playerType={"skaters"} /> */}
      <Routes>
        <Route path="/:season/:gameType/" element={<Leaderstart />} />
        <Route
          path="/:season/:gameType/:franchise/"
          element={<Leaderselections />}
        />
      </Routes>
    </main>
  );
};

export default Main;
