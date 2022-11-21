import React, { useState } from "react";
import ListItemPhoneChange from "./ListItemPhoneChange";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPen,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
const ListItemEditMode = ({
  item,
  reff,
  mode,
  checkedItems,
  setMode,
  openDeletePopup,
  onCheck,
  onChange,
}) => {
  const [editedPhone, setEditedPhone] = useState(
    item.phone.map((number) => {
      return number;
    })
  );
  const [editedContact, setEditedContact] = useState({
    
    id:item.id,
    avatar : item.avatar,
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
    phone: editedPhone,
    profession: item.profession,
  });

  const [saveBtn, setSaveBtn] = useState(false);

  return (
    <div
      className="list-item-container"
      ref={reff.innerRef}
      {...reff.draggableProps}
      {...reff.dragHandleProps}
    >
      <input
        type="checkbox"
        checked={checkedItems.includes(item.id)}
        onChange={(e) => {
          if (e.target.checked === true) {
            onCheck(item.id, true);
          } else {
            onCheck(item.id, false);
          }
        }}
      />
      <div className="avatar">
        <img className="avatar-img" src={item.avatar} />
      </div>
      <div className="firstName-inline">
        <input
          type="text"
          value={editedContact.firstName}
          placeholder="First Name"
          onChange={(e) => {
            setEditedContact({ ...editedContact, firstName: e.target.value });
          }}
        />
      </div>
      <div className="lastName-inline">
        <input
          type="text"
          value={editedContact.lastName}
          placeholder="Last Name"
          onChange={(e) => {
            setEditedContact({ ...editedContact, lastName: e.target.value });
          }}
        />
      </div>
      <div className="email-inline">
        <input
          type="text"
          value={editedContact.email}
          placeholder="Email"
          onChange={(e) => {
            setEditedContact({ ...editedContact, email: e.target.value });
          }}
        />
      </div>
      <div className="phone-inline">
        {editedContact.phone.map((contact, i) => {
          return (
            <ListItemPhoneChange
              item={item}
              num={contact.number}
              key={i}
              index={i}
              editedContact={editedContact}
              setEditedContact={setEditedContact}
              setEditedPhone={setEditedPhone}
              editedPhone={editedPhone}
            />
          );
        })}
      </div>
      <div className="profession-inline">
        <input
          type="text"
          value={editedContact.profession}
          placeholder="Profession"
          onChange={(e) => {
            setEditedContact({ ...editedContact, profession: e.target.value });
          }}
        />
      </div>
      <div className="edit-btns">
        <span
          className="check"
          style={{ display: saveBtn ? "none" : "inline" }}
        >
          <FontAwesomeIcon
            icon={faCheck}
            onClick={() => {
              if (
                Object.keys(editedContact).every(
                  (k) => editedContact[k] !== ""
                ) &&
                Object.keys(editedPhone).every((k) => editedPhone[k].number)
              ) {
                setEditedContact({ ...editedContact, phone: editedPhone });
                setMode(!mode);
                onChange(editedContact);
                
               
              } else {
                swal("Oops Error", "You should fill all fields!", "error");
              }
            }}
          />
        </span>
        <span className="edit" style={{ display: saveBtn ? "inline" : "none" }}>
          <FontAwesomeIcon
            icon={faPen}
            onClick={() => {
              setSaveBtn(true);
            }}
          />
        </span>

        <span className="delete" onClick={openDeletePopup}>
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </div>
    </div>
  );
};

export default ListItemEditMode;
