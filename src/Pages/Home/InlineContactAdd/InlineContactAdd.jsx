import "./InlineContactAdd.css";
import { useState } from "react";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faAdd } from "@fortawesome/free-solid-svg-icons";
import InlinePhoneAdd from "./AddContactPhoneChange";

function InlineContactAdd({ onAdd, setAddInline }) {
  const [addedPhone, setAddedPhone] = useState([]);
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: addedPhone,
    profession: "",
  });
  function addNumber(e) {
    setAddedPhone([
      ...addedPhone,
      {
        number: "",
      },
    ]);
  }
  return (
    <div className="contact-add-inline">
      <input
        type="text"
        placeholder="First Name"
        value={newContact.firstName}
        onChange={(e) => {
          setNewContact({ ...newContact, firstName: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={newContact.lastName}
        onChange={(e) => {
          setNewContact({ ...newContact, lastName: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Email"
        value={newContact.email}
        onChange={(e) => {
          setNewContact({ ...newContact, email: e.target.value });
        }}
      />

      {addedPhone.length === 0 && (
        <InlinePhoneAdd
          newContact={newContact}
          addNumber={addNumber}
          addedPhone={addedPhone}
          setAddedPhone={setAddedPhone}
          setNewContact={setNewContact}
        />
      )}
      {addedPhone.map((phone, i) => {
        return (
          <InlinePhoneAdd
            key={i}
            index={i}
            newContact={newContact}
            addNumber={addNumber}
            addedPhone={addedPhone}
            setAddedPhone={setAddedPhone}
            setNewContact={setNewContact}
          />
        );
      })}

      <input
        type="text"
        placeholder="Profession"
        value={newContact.profession}
        onChange={(e) => {
          setNewContact({ ...newContact, profession: e.target.value });
        }}
      />
      <button
        className="cancel-btn"
        onClick={() => {
          setAddInline(false);
        }}
      >
        <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
      </button>
      <button
        className="add-btn"
        onClick={() => {
          if (
            Object.keys(newContact).every((k) => newContact[k] !== "") &&
            Object.keys(addedPhone).every((k) => addedPhone[k].number)
          ) {
            onAdd(newContact);
            setAddedPhone([]);
            setNewContact({
              firstName: "",
              lastName: "",
              email: "",
              phone: addedPhone,
              profession: "",
            });
          } else {
            swal("Oops Error", "You should fill all fields!", "error");
          }
        }}
      >
        <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
      </button>
    </div>
  );
}
export default InlineContactAdd;
