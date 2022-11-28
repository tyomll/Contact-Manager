import React, { useState } from "react";
import swal from "sweetalert";
import ListItemPhoneChange from "../../ContactList/ContactListItem/ListItemPhoneChange";

const ModalEditForm = ({
  modalMode,
  setModalMode,
  editItem,
  onChange,
  setEditItem,
}) => {
  const [editedPhone, setEditedPhone] = useState(
    editItem.phone.map((number) => {
      return number;
    })
  );
  const [editedContact, setEditedContact] = useState({
    id: editItem.id,
    avatar: editItem.avatar,
    firstName: editItem.firstName,
    lastName: editItem.lastName,
    email: editItem.email,
    phone: editedPhone,
    profession: editItem.profession,
  });

  return (
    <div
      className="edit-modal-bg"
      style={{ display: modalMode ? "flex" : "none" }}
      onClick={(e) => {
        if (e.target.className === "edit-modal-bg") {
          setModalMode(false);
        }
      }}
    >
      <div className="edit-modal">
        <h1>Edit Contact</h1>
        <label>Name</label>
        <input
          type="text"
          value={editedContact.firstName}
          placeholder="First Name"
          onChange={(e) => {
            setEditedContact({ ...editedContact, firstName: e.target.value });
          }}
        ></input>
        <label>Surname</label>
        <input
          type="text"
          value={editedContact.lastName}
          placeholder="Last Name"
          onChange={(e) => {
            setEditedContact({ ...editedContact, lastName: e.target.value });
          }}
        ></input>
        <label>Email</label>
        <input
          type="text"
          value={editedContact.email}
          placeholder="Email"
          onChange={(e) => {
            setEditedContact({ ...editedContact, email: e.target.value });
          }}
        ></input>
        <label>Phone</label>
        {editedContact.phone.map((phone, i) => {
          return (
            <ListItemPhoneChange
              num={phone.number}
              key={i}
              index={i}
              editedContact={editedContact}
              setEditedContact={setEditedContact}
              setEditedPhone={setEditedPhone}
              editedPhone={editedPhone}
            />
          );
        })}

        <label>Profession</label>
        <input
          type="text"
          value={editedContact.profession}
          placeholder="Profession"
          onChange={(e) => {
            setEditedContact({ ...editedContact, profession: e.target.value });
          }}
        ></input>
        <div className="modal-btns">
          <button
            onClick={() => {
              setModalMode(false);
              setEditItem(undefined);
              setEditedContact(editItem);
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (
                Object.keys(editedContact).every(
                  (k) => editedContact[k] !== ""
                ) &&
                Object.keys(editedPhone).every((k) => editedPhone[k].number)
              ) {
                setEditItem(undefined);
                setModalMode(false);
                setEditedContact({ ...editedContact, phone: editedPhone });
                onChange(editedContact);
              } else {
                swal("Oops Error", "You should fill all fields!", "error");
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

export default ModalEditForm;
