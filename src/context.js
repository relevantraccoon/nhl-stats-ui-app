import React, { useContext, useState, useEffect } from "react";
// use temporary dummy data to avoid CORS errors
import { dummyData } from "./dummydata/dummydata.js";

const AppContext = React.createContext();

const url = `https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster`;

const urls = {
  allTeamsURL: "https://statsapi.web.nhl.com/api/v1/teams",
  // getPlayerStats: `https://statsapi.web.nhl.com/api/v1/people/{id}/stats/?stats=statsSingleSeason&season={season}`,
  // getCurrentSeasonData: "https://statsapi.web.nhl.com/api/v1/seasons/current",
  // getAllRosters:
  //   "https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster&season={season}",
  getLeaders:
    "https://api.nhle.com/stats/rest/en/leaders/{position}/{varType}?cayenneExp=season={seasonYears}%20and%20gameType={gameType}",
  defenseMenModifier: "%20and%20player.positionCode%20=%20%27D%27",
  rookieModifier: "%20and%20isRookie%20=%20%27Y%27",
};

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentSeason, setCurrentSeason] = useState(`20222023`);
  const [leaders, setLeaders] = useState([]);
  const [currentScoreType, setCurrentScoreType] = useState({
    goaliesVarType: `gaa`,
    skatersVarType: `points`,
  });
  const [currentGameType, setCurrentGameType] = useState(`2`);

  // use temporary dummy data to avoid CORS errors

  const { fetchedSkaters, fetchedGoalies, fetchedDefensemen, fetchedRookies } =
    dummyData;

  useEffect(() => {
    async function fetchData(url) {
      const response = await fetch(url);
      if (!response.ok) {
        const errorMessage = `An error has occurred: ${response.status}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      return data;
    }

    const init = async () => {
      const fetchAndAssignLeaders = async (
        // Activate fetching when ready to build and push
        // Getting cors error while in local host, cors-anywhere is returning 403
        // Temporary solution - using dummy data
        url = urls.getLeaders,
        defenseMenModifier = urls.defenseMenModifier,
        rookieModifier = urls.rookieModifier
      ) => {
        //   const { goaliesVarType, skatersVarType } = currentVarType;
        //   const corsPolicyPreambleURL = `https://cors-anywhere.herokuapp.com/`;

        //   const fetchedSkaters = await fetchData(
        //     `${corsPolicyPreambleURL}${url
        //       .replace("{position}", "skaters")
        //       .replace("{varType}", skatersVarType)
        //       .replace("{seasonYears}", currentSeason)
        //       .replace("{gameType}", currentGameType)}`
        //   );

        //   const fetchedGoalies = await fetchData(
        //     `${corsPolicyPreambleURL}${url
        //       .replace("{position}", "goalies")
        //       .replace("{varType}", goaliesVarType)
        //       .replace("{seasonYears}", currentSeason)
        //       .replace("{gameType}", currentGameType)}`
        //   );

        //   const fetchedDefensemen = await fetchData(
        //     `${corsPolicyPreambleURL}${url
        //       .replace("{position}", "skaters")
        //       .replace("{varType}", skatersVarType)
        //       .replace("{seasonYears}", currentSeason)
        //       .replace("{gameType}", currentGameType)}${defenseMenModifier}`
        //   );

        //   const fetchedRookies = await fetchData(
        //     `${corsPolicyPreambleURL}${url
        //       .replace("{position}", "skaters")
        //       .replace("{varType}", skatersVarType)
        //       .replace("{seasonYears}", currentSeason)
        //       .replace("{gameType}", currentGameType)}${rookieModifier}`
        //   );

        const fetchedLeadersArr = [
          {
            data: fetchedSkaters,
            playerType: "skaters",
            varTypes: ["points", "goals", "assists"],
          },
          {
            data: fetchedDefensemen,
            playerType: "defensemen",
            varTypes: ["gaa", "sv%", "shutouts"],
          },
          {
            data: fetchedGoalies,
            playerType: "goalies",
            varTypes: ["points", "goals", "assists"],
          },
          {
            data: fetchedRookies,
            playerType: "rookies",
            varTypes: ["points", "goals", "assists"],
          },
        ];

        return fetchedLeadersArr;
      };

      const setStateAfterFetching = async () => {
        const fetchedLeaders = await fetchAndAssignLeaders();
        setLeaders(fetchedLeaders);
        setLoading(false);
      };

      setStateAfterFetching();
    };

    init();
  }, [currentGameType, currentSeason, currentScoreType]);

  return (
    <AppContext.Provider
      value={{
        loading,
        leaders,
        currentScoreType,
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
