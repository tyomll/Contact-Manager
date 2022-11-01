import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserMinus } from "@fortawesome/free-solid-svg-icons";

function Header({ setModalMode, setMode, checkedCount, onDeleteSelected }) {
  return (
    <div className="header-container">
      <h1>Contacts</h1>
      <span
        className="delete-contact-btn"
        style={{ backgroundColor: checkedCount > 0 ? "#27AAF9" : "#d9d8d8" }}
        onClick={() => {
          onDeleteSelected()
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
          setModalMode(true);
          setMode(true);
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
  );
}

export default Header;
