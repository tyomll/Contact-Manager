import Home from "../Home/Home";
import Settings from "../Settings/Settings";
import AboutUs from "../AboutUs/AboutUs";
import { Routes, Route, Link } from 'react-router-dom'
import "./App.css"
function App (){
    return (
        
        <>

        <Link to="/">Home</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/about">About Us</Link>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/about" element={<AboutUs/>}/>
        </Routes>
        </>
    )
}
export default App;