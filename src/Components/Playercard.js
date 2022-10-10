import React from "react";

const Playercard = () => {
  return (
    <div id="leaders-player-card">
      <img
        id="leaders-player-image"
        src="https://assets.nhle.com/mugs/nhl/20222023/NSH/8475799.png"
        alt="player"
      />
      <div id="leaders-player-info">
        <div>
          <p id="leaders-player-number">
            #<span>22</span>
          </p>
          <p id="leaders-player-name">Nino Niederreiter</p>
        </div>
        <div>
          <p id="leaders-player-team">Nashville Predators</p>
          <p id="leaders-player-pos">R</p>
        </div>
        <div>
          <p id="leaders-player-points-title">Points</p>
          <p id="leaders-player-points">3</p>
        </div>
      </div>
    </div>
  );
};

export default Playercard;
