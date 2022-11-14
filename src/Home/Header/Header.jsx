import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUserMinus,
  faSearch,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function Header({
  setModalMode,
  setMode,
  onDeleteSelected,
  checkedItems,
  addMode,
  setAddInline,
  searchValue,
  setSearchValue,
  searchBy,
  setSearchBy,
}) {
  const [searchMode, setSearchMode] = useState(false);

  return (
    <div className="header-container">
      <div className="header-heading">
        <h1>Contacts</h1>
      </div>
      <div className="header-tools">
        <div className="search-by-select" style={{ display: searchMode ? "flex" : "none" }}>
          <label>
            Search By
            <select
              value={searchBy}
              onChange={(e) => {
                setSearchBy(e.target.value);
              }}
            >
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="profession">Profession</option>
            </select>
          </label>
        </div>
        <div
          className="search-input"
          style={{ display: searchMode ? "flex" : "none" }}
        >
          <input
            type="text"
            placeholder="Search something..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
        <span
          className="search-contact-btn"
          style={{ backgroundColor: searchMode ? "#27AAF9" : "#d9d8d8" }}
          onClick={() => {
            if (searchMode === false) {
              setSearchMode(true);
            } else {
              setSearchValue("");
              setSearchMode(false);
            }
          }}
        >
          <FontAwesomeIcon
            icon={searchMode ? faClose : faSearch}
            color="white"
          ></FontAwesomeIcon>
        </span>
        <span
          className="delete-contact-btn"
          style={{
            backgroundColor: checkedItems.length > 0 ? "#27AAF9" : "#d9d8d8",
            cursor : checkedItems.length > 0 ?  "pointer" : "not-allowed",
          }}
          onClick={() => {
            onDeleteSelected();
          }}
        >
          <FontAwesomeIcon
            icon={faUserMinus}
            color="white"
            className="delete-contact-btn-icon"
          />
          <span>Remove Selected</span>
        </span>
        <span
          className="add-contact-btn"
          onClick={() => {
            if (addMode === "inline") {
              setAddInline(true);
            } else {
              setModalMode(true);
              setMode(true);
            }
          }}
        >
          <FontAwesomeIcon
            icon={faUserPlus}
            color="white"
            className="add-contact-btn-icon"
          />
          <span>Add Contact</span>
        </span>
      </div>
    </div>
  );
}

export default Header;
