import React from "react";
import Positioncard from "./Positioncard";
import { useGlobalContext } from "../context";

const Main = () => {
  const { loading, leaders } = useGlobalContext();

  const allPlayerTypes = leaders.map((playerType) => {
    return playerType.playerType;
  });

  return (
    <main id="main">
      {/* {allPlayerTypes.map((playerType, index) => {
        return <Positioncard key={index} playerType={playerType} />;
      })} */}
      <Positioncard playerType={"skaters"} />
    </main>
  );
};

export default Main;
