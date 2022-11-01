import "./ListItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import swal from "sweetalert";

const ListItem = ({
  id,
  avatar,
  firstName,
  lastName,
  email,
  phone,
  profession,
  onDelete,
  toggleMode,
  item,
  onChange,
  setCheckedCount,
  checkedCount,
}) => {
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

  return (
    <div className="list-item-container">
      <input
        type="checkbox"
        checked={item.isChecked}
        onChange={(e) => {
          onChange({
            ...item,
            isChecked: e.target.checked,
          });
          if (e.target.checked === true) {
            setCheckedCount(checkedCount + 1);
          } else {
            setCheckedCount(checkedCount - 1);
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
              toggleMode(id);
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
export default ListItem;
