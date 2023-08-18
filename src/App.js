import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <h1>This is iNotebook</h1>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
