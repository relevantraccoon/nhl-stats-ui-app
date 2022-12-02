import React from "react";
import { useGlobalContext } from "../context";

const Poscardnav = ({ playerType }) => {
  const { leaders } = useGlobalContext();
  const extractedDataFromLeaders = leaders.find(
    (elem) => elem.playerType === playerType
  );

  return (
    <div id="poscardnav-heading-div">
      <header>
        <h2 id="leaders-header">{extractedDataFromLeaders.playerType} </h2>
      </header>
      <nav id="leaders-pos-card-nav">
        <ul>
          {extractedDataFromLeaders.varTypes.map((varType, index) => {
            return <li key={index}>{varType}</li>;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Poscardnav;
