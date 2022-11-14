import Home from "../Home/Home";
import Settings from "../Settings/Settings";
import AboutUs from "../AboutUs/AboutUs";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const editModeFromLocalStorage = localStorage.getItem('editMode') || 'modal'
  const addModeFromLocalStorage = localStorage.getItem('addMode') || 'modal'
  const viewModeFromLocalStorage = localStorage.getItem('viewMode') || 'list'
  const [editMode, setEditMode] = useState(editModeFromLocalStorage);
  const [addMode, setAddMode] = useState(addModeFromLocalStorage);
  const [viewMode, setViewMode] = useState(viewModeFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("editMode", editMode)
  }, [editMode])

  useEffect(() => {
    localStorage.setItem("addMode", addMode)
  }, [addMode])

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode)
  }, [viewMode])

  return (
    <div className="container">
      <div className="app-wrapper">
        <header className="header">
          <nav className="navigation">
            <div className="home">
              <Link to="/">Home</Link>
            </div>
            <div className="nav-right">
              <div className="settings">
                <Link to="/settings">Settings</Link>
              </div>
              <div className="about-us">
                <Link to="/about">About Us</Link>
              </div>
            </div>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home editMode={editMode} addMode={addMode} viewMode={viewMode} />} />
          <Route path="/settings" element={<Settings
            viewMode={viewMode}
            setViewMode={setViewMode}
            setEditMode={setEditMode}
            editMode={editMode}
            setAddMode={setAddMode}
            addMode={addMode} />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </div>

  );
}
export default App;