import "./Settings.css";
import { Link } from "react-router-dom";
import { useState } from "react";
function Settings({ setEditMode, editMode }) {
  

  const handleChange = (e) => {
    setEditMode(e.target.value);
  };
  return (
    <div className="settings-page-container">
      <div className="edit-type">
        <div className="inline-edit">
          <label>Inline Edit</label>
          <input
            name="inline-edit"
            type="radio"
            value="inline"
            checked={editMode === "inline"}
            onChange={handleChange}
          />
        </div>
        <div className="modal-edit">
          <label>Modal Edit</label>
          <input
            name="modal-edit"
            type="radio"
            value="modal"
            checked={editMode === 'modal'}
            onChange={handleChange}
            
          />
        </div>
      </div>
    </div>
  );
}
export default Settings;