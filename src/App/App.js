import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Home from "../Pages/Home/Home";
import Settings from "../Pages/Settings/Settings";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Navigation from "../Navigation/Navigation";
import ContactEditPage from "../Pages/ContactPage/ContactPage";
import { useSettings } from "../context/context";
function App() {

  const checkedContactsFromLocalStorage =
    localStorage.getItem("checkedContacts") || "[]";
  const [contactList, setContactList] = useState([]);
  const [contacts, updateContacts] = useState(contactList);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkedItems, setCheckedItems] = useState(
    checkedContactsFromLocalStorage
  );

  const BASE_URL = axios.create({
    baseURL: "https://636f41c5f2ed5cb047d8e6ee.mockapi.io/contactlist/",
  });

  async function fetchUsers() {
    try {
      setLoading(true);
      setError("");
      const response = await BASE_URL.get("/users");
      setLoading(false);
      const users = response.data;
      setContactList(users);
      updateContacts(users);
    } catch (e) {
      setError(e.message);
    }
  }
  async function onChange(newInfo) {
    setLoading(true);
    await BASE_URL.put(`/users/${newInfo.id}`, newInfo);
    setLoading(false);
    setContactList(
      contactList.map((item) => {
        if (item.id === newInfo.id) {
          return newInfo;
        }
        return item;
      })
    );
    updateContacts(
      contactList.map((item) => {
        if (item.id === newInfo.id) {
          return newInfo;
        }
        return item;
      })
    );
  }
  useEffect(() => {
    fetchUsers();
  }, []);


  useEffect(() => {
    localStorage.setItem("checkedContacts", checkedItems);
  }, [checkedItems]);
  return (
      <div className="flex">
        <Navigation />
        <div className="h-screen flex-1 p-5">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  BASE_URL={BASE_URL}
                  contactList={contactList}
                  contacts={contacts}
                  loading={loading}
                  setContactList={setContactList}
                  updateContacts={updateContacts}
                  setLoading={setLoading}
                  error={error}
                  setError={setError}
                  fetchUsers={fetchUsers}
                  onChange={onChange}
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <Settings/>
              }
            />
            <Route path="/about" element={<AboutUs />} />
            <Route
              path="/contacts/:id"
              element={
                <ContactEditPage
                  BASE_URL={BASE_URL}
                  onChange={onChange}
                  contactList={contactList}
                />
              }
            />
          </Routes>
        </div>
      </div>
  );
}

export default App;
