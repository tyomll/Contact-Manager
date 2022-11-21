import React, { useState } from "react";
import ModalPhoneAdd from "./ModalPhoneAdd";

const ModalAddForm = ({
  modalMode,
  setModalMode,
  setEditItem,
  setMode,
  onAdd,
}) => {
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
    <div
      className="edit-modal-bg"
      style={{ display: modalMode ? "flex" : "none" }}
      onClick={(e) => {
        if (e.target.className === "edit-modal-bg") {
          setModalMode(false);
          setEditItem();
        }
      }}
    >
      <div className="edit-modal">
        <h1>Add contact</h1>
        <label>Name</label>
        <input
          type="text"
          value={newContact.firstName}
          onChange={(e) => {
            setNewContact({ ...newContact, firstName: e.target.value });
          }}
        ></input>
        <label>Surname</label>
        <input
          type="text"
          value={newContact.lastName}
          onChange={(e) => {
            setNewContact({ ...newContact, lastName: e.target.value });
          }}
        ></input>
        <label>Email</label>
        <input
          type="text"
          value={newContact.email}
          onChange={(e) => {
            setNewContact({ ...newContact, email: e.target.value });
          }}
        ></input>
        <label>Phone</label>
        {addedPhone.length === 0 && (
          <ModalPhoneAdd
            newContact={newContact}
            addNumber={addNumber}
            addedPhone={addedPhone}
            setAddedPhone={setAddedPhone}
            setNewContact={setNewContact}
          />
        )}
        {addedPhone.map((phone, i) => {
          return (
            <ModalPhoneAdd
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

        <label>Profession</label>
        <input
          type="text"
          value={newContact.profession}
          onChange={(e) => {
            setNewContact({ ...newContact, profession: e.target.value });
          }}
        ></input>
        <div className="modal-btns">
          <button
            onClick={() => {
              setModalMode(false);
              setMode(false);
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (
                Object.keys(newContact).every(
                  (k) => newContact[k] !== ""
                ) &&
                Object.keys(addedPhone).every((k) => addedPhone[k].number)
              ) {
                setModalMode(false);
                setMode(false);
                onAdd(newContact);
              }
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddForm;
