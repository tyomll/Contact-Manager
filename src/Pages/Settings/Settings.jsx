import "./Settings.css";

function Settings({
  setViewMode,
  viewMode,
}) {
  const handleViewModeChange = (e) => {
    setViewMode(e.target.value);
  };

  return (
    <div className="settings-page-container">
      <div className="settings-toggles">
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
