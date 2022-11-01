import "./ListHeader.css";
import { useState } from "react";
const ListHeader = ({ selectAll }) => {
  const [allCheckboxes, setAllCheckboxes] = useState(true);
  return (
    <div className="list-header">
      <div className="header-checkbox">
        <input
          type="checkbox"
          onClick={() => {
            selectAll(allCheckboxes);
            setAllCheckboxes(!allCheckboxes);
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
