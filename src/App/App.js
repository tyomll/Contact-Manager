import Home from "../Home/Home";
import Settings from "../Settings/Settings";
import AboutUs from "../AboutUs/AboutUs";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGear, faPeopleGroup, faArrowLeft} from "@fortawesome/free-solid-svg-icons";

function App() {
  const editModeFromLocalStorage = localStorage.getItem('editMode') || 'modal'
  const addModeFromLocalStorage = localStorage.getItem('addMode') || 'modal'
  const viewModeFromLocalStorage = localStorage.getItem('viewMode') || 'list'
  const [editMode, setEditMode] = useState(editModeFromLocalStorage);
  const [addMode, setAddMode] = useState(addModeFromLocalStorage);
  const [viewMode, setViewMode] = useState(viewModeFromLocalStorage);
  const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Home" , icon : faHome , link : "/"},
    { title: "Settings", icon : faGear , link : "/settings"},
    { title: "About Us", icon : faPeopleGroup , link : "/about", gap: true },

  ];
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
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
        <Link to={"/"} >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/1024px-Google_Contacts_icon.svg.png"
            className={` w-10 cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Contact Manager
          </h1>
          </Link>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link to={Menu.link} key={index}>
            <li
              
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            > 
              <FontAwesomeIcon icon = {Menu.icon}></FontAwesomeIcon>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
            </Link>
          ))}
        </ul>
      </div>
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