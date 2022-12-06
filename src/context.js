import React, { useContext, useState, useEffect } from "react";
import { useFetchAll } from "./Components/services/useFetchAll";
import { dummyData } from "./dummydata/dummydata.js";

const AppContext = React.createContext();

const urls = {
  baseString:
    "https://api.nhle.com/stats/rest/en/leaders/{positionPlaceHolder}/{varTypePlaceHolder}?cayenneExp=season={seasonYearsPlaceHolder}%20and%20gameType={gameTypePlaceHolder}",
  urlModifiers: {
    defenseMenModifier: "%20and%20player.positionCode%20=%20%27D%27",
    rookieModifier: "%20and%20isRookie%20=%20%27Y%27",
    franchiseModifier: "%20and%20team.franchiseId={franchiseIdPlaceHolder}",
  },
};

// Every reload (first page visit or if the user changes season/season type (gametype)/franchise) -
// new API calls are needed. This function generates the full URL-array that can be passed to the useFetchAll service.

const generateUrlArray = (
  baseStringUrl,
  urlModifiers,
  season,
  gameType,
  franchiseId
) => {
  const { defenseMenModifier, rookieModifier, franchiseModifier } =
    urlModifiers;
  const { baseString } = baseStringUrl;

  const skaterVarTypes = ["points", "goals", "assists"];
  const goalieVarTypes = ["gaa", "savePctg", "shutouts"];

  // Generate skater URLs
  const skaterArray = skaterVarTypes.map((varType) => {
    return baseStringUrl
      .replace("{varTypePlaceHolder}", varType)
      .replace("{positionPlaceHolder}", "skaters");
  });

  // Generate goalie URLs

  const goalieArray = goalieVarTypes.map((varType) => {
    return baseStringUrl
      .replace("{varTypePlaceHolder}", varType)
      .replace("{positionPlaceHolder}", "goalies");
  });

  // Generate defensemen URLs

  const defenseMenArray = skaterVarTypes.map((varType) => {
    return baseStringUrl
      .replace("{varTypePlaceHolder}", varType)
      .replace("{positionPlaceHolder}", "skaters")
      .concat(defenseMenModifier);
  });

  // Generate rookie URLs

  const rookieArray = skaterVarTypes.map((varType) => {
    return baseStringUrl
      .replace("{varTypePlaceHolder}", varType)
      .replace("{positionPlaceHolder}", "skaters")
      .concat(rookieModifier);
  });

  // Flatten urlArray so we can map over it

  const urlArray = [
    skaterArray,
    goalieArray,
    defenseMenArray,
    rookieArray,
  ].flat();

  // FranchiseId will only be relevant if it gets passed into function. If no franchise is chosen, leaders
  // for the whole league is returned from the API instead.
  return urlArray.map((url) => {
    if (franchiseId) {
      return url
        .concat(franchiseModifier)
        .replace("{franchiseIdPlaceHolder}", franchiseId)
        .replace("{seasonYearsPlaceHolder}", season)
        .replace("{gameTypePlaceHolder}", gameType);
    } else {
      return url
        .replace("{seasonYearsPlaceHolder}", season)
        .replace("{gameTypePlaceHolder}", gameType);
    }
  });
};

// const baseUrl = process.env.REACT_APP_API_BASE_URL;

const AppProvider = ({ children }) => {
  const [season, setSeason] = useState();
  const [seasonType, setSeasonType] = useState();
  const [franchise, setFranchise] = useState(null);

  return (
    <AppContext.Provider
      value={{
        urls,
        season,
        setSeason,
        seasonType,
        setSeasonType,
        franchise,
        setFranchise,
        generateUrlArray,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
