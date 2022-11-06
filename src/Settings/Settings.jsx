import "./Settings.css";
import { Link } from "react-router-dom";
import { useState } from "react";
function Settings({ setEditMode, editMode, setAddMode, addMode }) {
  const handleEditChange = (e) => {
    setEditMode(e.target.value);
  };
  const handleAddChange = (e) => {
    setAddMode(e.target.value);
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
            onChange={handleEditChange}
          />
        </div>
        <div className="modal-edit">
          <label>Modal Edit</label>
          <input
            name="modal-edit"
            type="radio"
            value="modal"
            checked={editMode === 'modal'}
            onChange={handleEditChange} 
          />
        </div>
      </div>
      <div className="add-type">
        <div className="inline-add">
          <label>Inline Add</label>
          <input
            name="inline-add"
            type="radio"
            value="inline"
            checked={addMode === "inline"}
            onChange={handleAddChange}
          />
        </div>
        <div className="modal-add">
          <label>Modal Add</label>
          <input
            name="modal-add"
            type="radio"
            value="modal"
            checked={addMode === 'modal'}
            onChange={handleAddChange} 
          />
        </div>
      </div>
    </div>
  );
}
export default Settings;