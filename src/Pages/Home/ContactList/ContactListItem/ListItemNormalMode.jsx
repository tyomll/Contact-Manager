import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const ListItemNormalMode = ({
  item,
  reff,
  checkedItems,
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
        <Link to={`contacts/${item.id}`}>
          <FontAwesomeIcon icon={faUserTie} />
        </Link>
        <span className="edit">
          <FontAwesomeIcon
            icon={faPen}
            onClick={() => {
              toggleMode(item.id);
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
