import React from "react";
import Poscardnav from "./Poscardnav";
import Playercard from "./Playercard";
import Leaderslist from "./Leaderslist";
import Error from "./Error";

const Positioncard = () => {
  // Error handle
  if (false) {
    return (
      <>
        <Poscardnav />
        <Error />
      </>
    );
  }

  return (
    <section id="leaders-pos-card">
      <Poscardnav />
      <div id="leaders-pos-card-main">
        <Playercard />
        <Leaderslist />
      </div>
    </section>
  );
};

export default Positioncard;
