import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Home from "../Pages/Home/Home";
import Settings from "../Pages/Settings/Settings";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Navigation from "../Navigation/Navigation";


function App() {
  const editModeFromLocalStorage = localStorage.getItem('editMode') || 'modal'
  const addModeFromLocalStorage = localStorage.getItem('addMode') || 'modal'
  const viewModeFromLocalStorage = localStorage.getItem('viewMode') || 'list'
  const [editMode, setEditMode] = useState(editModeFromLocalStorage);
  const [addMode, setAddMode] = useState(addModeFromLocalStorage);
  const [viewMode, setViewMode] = useState(viewModeFromLocalStorage);
  const BASE_URL = axios.create({
    baseURL: "https://636f41c5f2ed5cb047d8e6ee.mockapi.io/contactlist/",
  });
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
      <Navigation />
      <div className="h-screen flex-1 p-5">
        <Routes>
          <Route path="/" element={<Home editMode={editMode} addMode={addMode} viewMode={viewMode} BASE_URL={BASE_URL} />} />
          <Route path="/settings" element={<Settings
            viewMode={viewMode}
            setViewMode={setViewMode}
            setEditMode={setEditMode}
            editMode={editMode}
            setAddMode={setAddMode}
            addMode={addMode}
          />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </div>
  );
}


export default App;