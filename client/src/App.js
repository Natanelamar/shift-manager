import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import Main from "./components/MainCheck";
import FormCard from "./components/FormCard";

function App() {
  return (
    <>
      <Header />
      <div className="main-div">
        <Main />
        <FormCard />
      </div>
    </>
  );
}

export default App;
