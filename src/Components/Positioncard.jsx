import React, { useState } from "react";
import Poscardnav from "./Poscardnav";
import Playercard from "./Playercard";
import Leaderslist from "./Leaderslist";
import Error from "./Error";
import { useGlobalContext } from "../context";

const Positioncard = ({ playerType }) => {
  const [currentScoreType, setCurrentScoreType] = useState({
    goalies: "gaa",
    skaters: "points",
  });

  const [currentFocusedLeader, setCurrentFocusedLeader] = useState();

  const handleHover = (id) => {
    setCurrentFocusedLeader(id);
  };

  const { leaders } = useGlobalContext();

  const extractedPlayerTypeData = leaders.filter((elem) => {
    if (elem.playerType === playerType) {
      return elem;
    }
  });

  const buildPlayerList = (rawData, currentScoreType, playerType) => {
    if (rawData[0].playerType === `${playerType}`) {
      const useScoreType = currentScoreType[`${playerType}`];
      return rawData[0].data[useScoreType].data.map((player) => {
        return {
          fullName: player.player.fullName,
          sweaterNumber: player.player.sweaterNumber,
          score: player[`${currentScoreType}`],
          team: player.team.fullName,
          playerID: player.player.id,
        };
      });
    }
  };

  const playerList = buildPlayerList(
    extractedPlayerTypeData,
    currentScoreType,
    playerType
  );

  // Error handle
  if (false) {
    return (
      <>
        <Poscardnav />
        <Error />
      </>
    );
  }

  // NEXT STEP IS TO DISPLAYLEADER. Take the ID from currentFocusedLeader och slå upp mot
  // playerList med den. Då får du ut data. Assigna det till state här i positionCard via
  // useEffect.
  // passa den staten vidare till Playercard. som renderar det som är i staten.-

  return (
    <section id="leaders-pos-card">
      <Poscardnav playerType={playerType} currentScoreType={currentScoreType} />
      <div id="leaders-pos-card-main">
        <Playercard
          playerType={playerType}
          currentScoreType={currentScoreType}
          playerList={playerList}
          currentFocusedLeader={currentFocusedLeader}
        />
        <Leaderslist
          playerType={playerType}
          currentScoreType={currentScoreType}
          handleHover={handleHover}
          playerList={playerList}
        />
        <h1>{currentFocusedLeader}</h1>
      </div>
    </section>
  );
};

export default Positioncard;
