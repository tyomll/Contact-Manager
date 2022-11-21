import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
const ListItemNormalMode = ({
  item,
  reff,
  checkedItems,
  editMode,
  setMode,
  onCheck,
  toggleMode,
  openDeletePopup,
}) => {
  return (
    <div
      className={
        checkedItems.includes(item.id)
          ? "list-item-container checked"
          : "list-item-container"
      }
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
      <div className="name">
        {item.firstName}&nbsp;
        {item.lastName}
      </div>
      <div className="email">{item.email}</div>

      <div className="phone">
        <ul>
          {item.phone.map((number, i) => {
            return <li key={i}>{number.number}</li>;
          })}
        </ul>
      </div>
      <div className="profession">{item.profession}</div>
      <div className="edit-btns">
        <span className="edit">
          <FontAwesomeIcon
            icon={faPen}
            onClick={() => {
              if (editMode === "modal") {
                setMode(true);
                toggleMode(item.id);
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
};

export default ListItemNormalMode;
