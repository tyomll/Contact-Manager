import Home from "../Home/Home";
import Settings from "../Settings/Settings";
import AboutUs from "../AboutUs/AboutUs";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";

import Navigation from "../Navigation/Navigation";

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
    <div className="flex">
      <Navigation/>
      <div className="h-screen flex-1 p-5">
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