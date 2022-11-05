import "./ListHeader.css";
import { useState } from "react";
const ListHeader = ({selectAll , onCheck , checkedItems , contactList}) => {
  return (
    <div className="list-header">
      <div className="header-checkbox">
        <input
          type="checkbox"
          checked={checkedItems.length === contactList.length ? true : false}
          onChange={() => {
            onCheck()
          }}
        />
      </div>
      <div className="header-name">
        <p>name</p>
      </div>
      <div className="header-email">
        <p>email</p>
      </div>
      <div className="header-phone">
        <p>phone</p>
      </div>
      <div className="header-profession">
        <p>profession</p>
      </div>
    </div>
  );
};
export default ListHeader;