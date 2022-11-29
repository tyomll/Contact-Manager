import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faAdd } from "@fortawesome/free-solid-svg-icons";
const InlinePhoneAdd = ({
  newContact,
  addNumber,
  addedPhone,
  setAddedPhone,
  setNewContact,
  index,
}) => {
  const [value, setValue] = useState("");
  function handleNumberChange(e) {
    if (addedPhone.length === 0) {
      setAddedPhone([
        ...addedPhone,
        {
          number: e.target.value,
        },
      ]);
    } else {
      setAddedPhone(
        addedPhone.map((phoneNumber, i) => {
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
  }
  function deleteNumber() {
    setAddedPhone(
      addedPhone.filter((phoneNumber, i) => {
        return i !== index;
      })
    );
  }
  useEffect(() => {
    setNewContact({ ...newContact, phone: addedPhone });
  }, [addedPhone]);

  return (
    <div>
      {newContact.phone.length > 1 && (
        <button onClick={() => deleteNumber()} style={{ marginRight: "5px" }}>
          <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
        </button>
      )}
      {newContact.phone.length < 3 && (
        <button onClick={(event) => addNumber(event)}>
          <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
        </button>
      )}

      <input
        type="text"
        value={value}
        placeholder={`Phone ${index ? index + 1 : 1}`}
        onChange={(event) => {
          setValue(event.target.value);
          handleNumberChange(event);
        }}
      />
    </div>
  );
};

export default InlinePhoneAdd;
