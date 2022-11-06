import Home from "../Home/Home";
import Settings from "../Settings/Settings";
import AboutUs from "../AboutUs/AboutUs";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { useState } from "react";
function App() {
  const [editMode, setEditMode] = useState("inline");
  const [addMode, setAddMode] = useState("modal");
  return (
    <>
      <header className="header">
        <nav className="navigation">
          <div className="home">
            <Link to="/">Home</Link>
          </div>
          <div className="settings">
            <Link to="/settings">Settings</Link>
          </div>
          <div className="about-us">
            <Link to="/about">About Us</Link>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home editMode={editMode} addMode={addMode}/>} />
        <Route path="/settings" element={<Settings setEditMode={setEditMode} editMode={editMode} setAddMode={setAddMode} addMode={addMode}/>} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </>
  );
}
export default App;