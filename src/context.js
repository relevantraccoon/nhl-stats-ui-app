import React, { useContext, useState, useEffect } from "react";

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
  const [loading, setLoading] = useState(null);
  const [currentSeason, setCurrentSeason] = useState(`20222023`);
  const [leaders, setLeaders] = useState({});
  const [currentVarType, setCurrentVarType] = useState({
    goaliesVarType: `gaa`,
    skatersVarType: `points`,
  });
  const [currentGameType, setCurrentGameType] = useState(`2`);
  const [testData, setTestData] = useState({ data: "initialData" });

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
        url = urls.getLeaders,
        defenseMenModifier,
        rookieModifier
      ) => {
        const { goaliesVarType, skatersVarType } = currentVarType;

        const leaders = {
          goalies: {
            position: `goalies`,
            varTypes: [`gaa`, `savePctg`, `shutouts`],
            gaaLeaders: {},
            svPctgLeaders: {},
            shutoutsLeaders: {},
          },
          skaters: {
            position: `skaters`,
            varTypes: [`points`, `goals`, `assists`],
            pointsLeaders: {},
            goalsLeaders: {},
            assistsLeaders: {},
          },
          defensemen: {
            modifier: defenseMenModifier,
            position: `defensemen`,
            varTypes: [`points`, `goals`, `assists`],
            pointsLeaders: {},
            goalsLeaders: {},
            assistsLeaders: {},
          },
          rookies: {
            rookieModifier,
            varTypes: [`points`, `goals`, `assists`],
            pointsLeaders: {},
            goalsLeaders: {},
            assistsLeaders: {},
          },
        };

        const fetchedSkaters = await fetchData(
          url
            .replace("{position}", leaders.skaters.position)
            .replace("{varType}", skatersVarType)
            .replace("{seasonYears}", currentSeason)
            .replace("{gameType}", currentGameType)
        );

        return fetchedSkaters;
      };

      const setSomeState = async () => {
        const fetchedLeaders = await fetchAndAssignLeaders();
        setTestData(fetchedLeaders);
      };

      setSomeState();
    };

    init();
  }, [currentGameType, currentSeason, currentVarType]);

  return (
    <AppContext.Provider value={{ loading, leaders, testData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
