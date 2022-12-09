import "./Settings.css";
import { useSettings, useSettingsDispatch } from "../../context/context";
import { setSavedSettings } from "../../context/actions/actions";
import { useState } from "react";

function Settings() {
  const settings = useSettings();
  const dispatch = useSettingsDispatch();
  const [previousSettings, setPreviousSettings] = useState(settings);

  const handleListViewModeChange = () => {
    setPreviousSettings({ ...previousSettings, viewMode: true });
  };
  const handleCardViewModeChange = () => {
    setPreviousSettings({ ...previousSettings, viewMode: false });
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
              checked={!previousSettings.viewMode || ""}
              onChange={handleCardViewModeChange}
            />
          </div>
          <div className="list-view">
            <label>List view</label>
            <input
              name="list-view"
              type="radio"
              checked={previousSettings.viewMode || ""}
              onChange={handleListViewModeChange}
            />
          </div>
        </div>
        <div className="settings-buttons">
          <button onClick={() => dispatch(setSavedSettings(previousSettings))}>
            Save
          </button>
          <button onClick={() => setPreviousSettings(settings)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
export default Settings;
