import { useEffect } from "react";
import { React } from "react";
import { useGlobalContext } from "../context";

const Playercard = ({ playerType, playerList, currentFocusedLeader }) => {
  // const [currentlyDisplayedLeader, setCurrentlyDisplayedLeader] =
  //   useState(null);
  // const { leaders, focusedLeader } = useGlobalContext();

  // const extractedPlayerTypeData = leaders.filter((elem) => {
  //   if (elem.playerType === playerType) {
  //     return elem;
  //   }
  // })[0].data;

  // const changeDisplayedLeader = (extractedPlayerTypeData) => {
  //   if (currentlyDisplayedLeader === null) {
  //     // initialise with no1 leader
  //     extractedPlayerTypeData[0]
  //   }
  // };

  // changeDisplayedLeader(extractedPlayerTypeData);

  // const extractedPlayerTypeData = leaders.filter((elem) => {
  //   if (elem.playerType === playerType) {
  //     return elem;
  //   }
  // });

  useEffect(() => {
    console.log(currentFocusedLeader);
    console.log(playerList);
  }, [currentFocusedLeader]);

  return (
    <div id="leaders-player-card">
      <img
        id="leaders-player-image"
        src="https://assets.nhle.com/mugs/nhl/20222023/NSH/8475799.png"
        alt="player"
      />
      <div id="leaders-player-info">
        <div id="leaders-player-info-div-1">
          <p id="leaders-player-number">
            #<span>22</span>
          </p>
          <p id="leaders-player-name">Nino Niederreiter</p>
        </div>
        <div id="leaders-player-info-div-2">
          <p id="leaders-player-team">Nashville Predators</p>
          <p id="leaders-player-pos">R</p>
        </div>
        <div id="leaders-player-info-div-3">
          <p id="leaders-player-points-title">Points</p>
          <p id="leaders-player-points">3</p>
        </div>
      </div>
    </div>
  );
};

export default Playercard;
