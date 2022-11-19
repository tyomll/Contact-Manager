import React, { useState } from "react";

const ListItemInputChange = ({
  num,
  changePhoneNumber,
  index
}) => {
  const [value, setValue] = useState(num);
  return (
    <ul>
      <li>
        <input
          type="text"
          value={value}
          placeholder="Phone"
          onChange={(e) => {
            setValue(e.target.value);
            changePhoneNumber(index , e.target.value)

          }}
        />
      </li>
    </ul>
  );
};

export default ListItemInputChange;
