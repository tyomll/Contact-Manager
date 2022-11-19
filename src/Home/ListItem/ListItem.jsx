import "./ListItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import swal from "sweetalert";
import ListItemInputChange from "./ListItemInputChange";

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
  reff,
}) => {
  const [mode, setMode] = useState(true);
  const [editedName, setEditedName] = useState(item.firstName);
  const [editedSurname, setEditedSurname] = useState(item.lastName);
  const [editedEmail, setEditedEmail] = useState(item.email);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [editedPhone, setEditedPhone] = useState();
  const [editedProfession, setEditedProfession] = useState(item.profession);
  const [saveBtn, setSaveBtn] = useState(false);

  console.log(phoneNumbers);
  function openDeletePopup() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this contact!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        onDelete(item.id);
        swal("Contact has been deleted!", {
          icon: "success",
        });
      }
    });
  }
  function changePhoneNumber(index, phone) {
    
    setPhoneNumbers(
      [
        {
          index,
          phone
        }
      ]
    );
  }
  const listNormalMode = (
    <div
      className={
        checkedItems.includes(id)
          ? "list-item-container checked"
          : "list-item-container"
      }
      ref={reff.innerRef}
      {...reff.draggableProps}
      {...reff.dragHandleProps}
    >
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

      <div className="phone">
        <ul>
          {item.phone.map((number, i) => {
            return <li key={i}>{number}</li>;
          })}
        </ul>
      </div>
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
    <div
      className="list-item-container"
      ref={reff.innerRef}
      {...reff.draggableProps}
      {...reff.dragHandleProps}
    >
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
      <div className="firstName-inline">
        <input
          type="text"
          value={editedName}
          placeholder="First Name"
          onChange={(e) => {
            setEditedName(e.target.value);
          }}
        />
      </div>
      <div className="lastName-inline">
        <input
          type="text"
          value={editedSurname}
          placeholder="Last Name"
          onChange={(e) => {
            setEditedSurname(e.target.value);
          }}
        />
      </div>
      <div className="email-inline">
        <input
          type="text"
          value={editedEmail}
          placeholder="Email"
          onChange={(e) => {
            setEditedEmail(e.target.value);
          }}
        />
      </div>
      <div className="phone-inline">
        {phone.map((num, i) => {
          return (
            <ListItemInputChange
              num={num}
              key={i}
              changePhoneNumber={changePhoneNumber}
              index={i}
            />
          );
        })}
      </div>
      <div className="profession-inline">
        <input
          type="text"
          value={editedProfession}
          placeholder="Profession"
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
