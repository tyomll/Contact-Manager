import "./ListItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import swal from "sweetalert";

const ListItem = ({
  item,
  id,
  avatar,
  firstName,
  lastName,
  email,
  phone,
  profession,
  onDelete,
  toggleMode,
  onCheck,
  checkedItems,
  editMode,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [mode, setMode] = useState(true);
  const [editedName, setEditedName] = useState(item.firstName);
  const [editedSurname, setEditedSurname] = useState(item.lastName);
  const [editedEmail, setEditedEmail] = useState(item.email);
  const [editedPhone, setEditedPhone] = useState(item.phone);
  const [editedProfession, setEditedProfession] = useState(item.profession);
  const [saveBtn, setSaveBtn] = useState(false);
  function openDeletePopup() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this contact!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        onDelete(id);
        swal("Contact has been deleted!", {
          icon: "success",
        });
      }
    });
  }
  const listNormalMode = (
    <div className="list-item-container">
      <input
        type="checkbox"
        checked={checkedItems.includes(id)}
        onChange={(e) => {
          if (e.target.checked === true) {
            onCheck(id, true);
          } else {
            onCheck(id, false);
          }
        }}
      />
      <div className="avatar">
        <img className="avatar-img" src={avatar} />
      </div>
      <div className="name">
        {firstName}&nbsp;
        {lastName}
      </div>
      <div className="email">{email}</div>
      <div className="phone">{phone}</div>
      <div className="profession">{profession}</div>
      <div className="edit-btns">
        <span className="edit">
          <FontAwesomeIcon
            icon={faPen}
            onClick={() => {
              if (editMode === "modal") {
                setMode(true);
                toggleMode(id);
              }
              if (editMode === "inline") {
                setMode(false);
              }
            }}
          />
        </span>

        <span className="delete" onClick={openDeletePopup}>
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </div>
    </div>
  );

  const listEditMode = (
    <div className="list-item-container">
      <input
        type="checkbox"
        checked={checkedItems.includes(id)}
        onChange={(e) => {
          if (e.target.checked === true) {
            onCheck(id, true);
          } else {
            onCheck(id, false);
          }
        }}
      />
      <div className="avatar">
        <img className="avatar-img" src={avatar} />
      </div>
      <div className="firstName">
        <input
          type="text"
          value={editedName}
          onChange={(e) => {
            setEditedName(e.target.value);
          }}
        />
      </div>
      <div className="lastName">
        <input
          type="text"
          value={editedSurname}
          onChange={(e) => {
            setEditedSurname(e.target.value);
          }}
        />
      </div>
      <div className="email">
        <input
          type="text"
          value={editedEmail}
          onChange={(e) => {
            setEditedEmail(e.target.value);
          }}
        />
      </div>
      <div className="phone">
        <input
          type="text"
          value={editedPhone}
          onChange={(e) => {
            setEditedPhone(e.target.value);
          }}
        />
      </div>
      <div className="profession">
        <input
          type="text"
          value={editedProfession}
          onChange={(e) => {
            setEditedProfession(e.target.value);
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
                editedName !== "" &&
                editedSurname !== "" &&
                editedEmail !== "" &&
                editedPhone !== "" &&
                editedProfession
              ) {
                setMode(!mode);
                onChange({
                  ...item,
                  firstName: editedName,
                  lastName: editedSurname,
                  email: editedEmail,
                  phone: editedPhone,
                  profession: editedProfession,
                });
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
  return mode ? listNormalMode : listEditMode;
};

export default ListItem;
