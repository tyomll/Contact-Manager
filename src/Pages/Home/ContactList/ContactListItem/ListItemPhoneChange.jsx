import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faAdd } from "@fortawesome/free-solid-svg-icons";
const ListItemPhoneChange = ({
  num,
  index,
  editedPhone,
  editedContact,
  setEditedContact,
  setEditedPhone,
}) => {
  const [value, setValue] = useState(num);

  function changeNumber(e) {
    setEditedPhone(
      editedPhone.map((phoneNumber, i) => {
        if (i === index) {
          return {
            ...phoneNumber,
            number: e.target.value,
          };
        }
        return phoneNumber;
      })
    );
  }
  function addNumber(e) {
    setEditedPhone([
      ...editedPhone,
      {
        number: "",
      },
    ]);
  }
  function deleteNumber() {
    setEditedPhone(
      editedPhone.filter((phoneNumber, i) => {
        return i !== index;
      })
    );
  }
  useEffect(() => {
    setEditedContact({ ...editedContact, phone: editedPhone });
  }, [value]);
  useEffect(() => {
    setEditedContact({ ...editedContact, phone: editedPhone });
  }, [editedPhone]);
  useEffect(() => {
    setEditedContact({ ...editedContact, phone: editedPhone });
  }, [editedPhone]);

  return (
    <ul>
      <li>
        {editedContact.phone.length > 1 && (
          <button onClick={deleteNumber} style={{ marginRight: "5px" }}>
            <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
          </button>
        )}
        {editedContact.phone.length < 3 && (
          <button onClick={(event) => addNumber(event)}>
            <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
          </button>
        )}

        <input
          type="text"
          value={value}
          placeholder="Phone"
          onChange={(event) => {
            setValue(event.target.value);
            changeNumber(event);
          }}
        />
      </li>
    </ul>
  );
};

export default ListItemPhoneChange;
