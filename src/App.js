import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Update import
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <h1>This is iNotebook</h1>
          <Routes>  {/* Replace Switch with Routes */}
            <Route exact path="/" element={<Home />} />  {/* Update Route syntax */}
            <Route exact path="/about" element={<About />} />  {/* Update Route syntax */}
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
