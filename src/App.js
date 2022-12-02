import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import Loading from "./Components/Loading";
import { useGlobalContext } from "./context";

function App() {
  const { loading, leaders } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  // if (leaders) {
  //   console.log("from frontend: ", leaders);
  // }

  return (
    <div className="App">
      <button onClick={() => console.log(leaders)}>click me</button>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
