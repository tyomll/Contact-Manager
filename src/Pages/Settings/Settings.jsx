import "./Settings.css";
import { useSettings, useSettingsDispatch } from "../../context/context";
import { setCardView, setListView } from "../../context/actions/actions";

function Settings({ setViewMode, viewMode }) {
  const settings = useSettings();
  const dispatch = useSettingsDispatch();

  const handleListViewModeChange = () => {
    dispatch(setListView());
  };

  const handleCardViewModeChange = () => {
    dispatch(setCardView());
  };
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
              checked={!settings.viewMode || ""}
              onChange={handleCardViewModeChange}
            />
          </div>
          <div className="list-view">
            <label>List view</label>
            <input
              name="list-view"
              type="radio"
              checked={settings.viewMode || ""}
              onChange={handleListViewModeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Settings;
