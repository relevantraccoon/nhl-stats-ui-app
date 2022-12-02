import React, { useState } from "react";
import { useGlobalContext } from "../context";

const Leaderslist = ({
  playerType,
  currentScoreType,
  setCurrentScoreType,
  setCurrentFocusedLeader,
  handleHover,
  playerList,
}) => {
  return (
    <div id="leaders-playerlist-div">
      <ul id="leaders-list">
        {playerList.map((player, index) => {
          return (
            <li
              key={index}
              onMouseEnter={() => {
                handleHover(player.playerID);
              }}
            >{`${player.fullName}`}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default Leaderslist;
