import React from "react";
import useFetchAll from "./services/useFetchAll";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";

const Leaderselections = () => {
  const { generateUrlArray, urls } = useGlobalContext();

  const { seasonParam, gameTypeParam, franchiseParam } = useParams();

  const generatedUrls = generateUrlArray(
    urls.baseString,
    urls.urlModifiers,
    "20222023",
    "2",
    "28"
  );

  const { leaders, loading, error } = useFetchAll(generatedUrls);

  console.log("these are the generatedUrls:", generatedUrls);
  console.log("these are leaders:", leaders);
  console.log("loading?", loading);
  console.log("error?", error);

  function setInitialSeason() {
    // https://statsapi.web.nhl.com/api/v1/seasons/current <-- use this
    // by using useFetch
  }

  // console.log(
  //   `<Leaderselections/> have contacted useFetchAll and received this back. Leaders: ${leaders} | Loading: ${loading} | error: ${error} | urls: ${JSON.stringify(
  //     returnUrl
  //   )}`
  // );

  return <div>Leaderselections</div>;
};

export default Leaderselections;
