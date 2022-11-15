import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import Loading from "./Components/Loading";
import { useGlobalContext } from "./context";
import { useState } from "react";

function App() {
  const { loading, leaders, testData } = useGlobalContext();

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (testData) {
    console.log("from frontend: ", testData);
  }
  return (
    <div className="App">
      <button onClick={() => console.log(testData)}>click me</button>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
