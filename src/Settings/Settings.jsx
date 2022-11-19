import "./Settings.css";
import swal from "sweetalert";
function Settings({
  setEditMode,
  editMode,
  setAddMode,
  addMode,
  setViewMode,
  viewMode,
}) {
  const handleEditChange = (e) => {
    if (viewMode === "card" && e.target.value === "inline") {
      swal(
        "Oops Error",
        "You can't use inline edit mode in card view mode",
        "error"
      );
    } else {
      setEditMode(e.target.value);
    }
  };
  const handleAddChange = (e) => {
    setAddMode(e.target.value);
  };
  const handleViewModeChange = (e) => {
    if (e.target.value === "card" && editMode === "inline") {
      setEditMode("modal");
      setViewMode(e.target.value);
      swal(
        "Oops Error",
        "You can't use inline edit mode in card view mode",
        "error"
      );
    } else {
      setViewMode(e.target.value);
    }
  };
  return (
    <div className="settings-page-container">
      <div className="settings-toggles">
        <div>
          <h3 className="settings-heading">Edit Contact Type</h3>
        </div>
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
              checked={editMode === "modal"}
              onChange={handleEditChange}
            />
          </div>
        </div>
        <div>
          <h3 className="settings-heading">Add Contact Type</h3>
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
              checked={addMode === "modal"}
              onChange={handleAddChange}
            />
          </div>
        </div>
        <div>
          <h3 className="settings-heading">Contact View Type</h3>
        </div>
        <div className="contacts-view">
          <div className="card-view">
            <label>Card View</label>
            <input
              name="card-view"
              type="radio"
              value="card"
              checked={viewMode === "card"}
              onChange={handleViewModeChange}
            />
          </div>
          <div className="list-view">
            <label>List view</label>
            <input
              name="list-view"
              type="radio"
              value="list"
              checked={viewMode === "list"}
              onChange={handleViewModeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Settings;
