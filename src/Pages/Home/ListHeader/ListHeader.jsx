import "./ListHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ } from "@fortawesome/free-solid-svg-icons";
import { useSettings } from "../../../context/context";

const ListHeader = ({
  onCheckAll,
  checkedItems,
  contactList,
  setSortBy,
  sortBy,
}) => {
  const viewMode = useSettings();

  return (
    <>
      <div className="card-view-header">
        <div
          className="card-header-checkbox"
          style={{ display: !viewMode ? "none" : "flex" }}
        >
          <input
            type="checkbox"
            checked={
              checkedItems.length === contactList.length &&
              contactList.length !== 0
                ? true
                : false
            }
            onChange={() => {
              onCheckAll();
            }}
          />
          <p>Select All</p>
        </div>
      </div>
      <div
        className="list-header"
        style={{ display: viewMode ? "flex" : "none" }}
      >
        <div className="header-checkbox">
          <input
            type="checkbox"
            checked={
              checkedItems.length === contactList.length &&
              contactList.length !== 0
                ? true
                : false
            }
            onChange={() => {
              onCheckAll();
            }}
          />
        </div>
        <div className="list-header-breaker"></div>
        <div className="header-name">
          <p>
            <span
              style={{
                color: sortBy === "firstName" ? "rgb(39 170 249)" : "#678796",
              }}
              className="filter-alphabetically"
              onClick={() => {
                if (sortBy === null) {
                  setSortBy("firstName");
                } else {
                  setSortBy(null);
                }
              }}
            >
              <FontAwesomeIcon icon={faArrowDownAZ}></FontAwesomeIcon>
            </span>
            name
          </p>
        </div>
        <div className="header-email">
          <p>
            <span
              style={{
                color: sortBy === "lastName" ? "rgb(39 170 249)" : "#678796",
              }}
              className="filter-alphabetically"
              onClick={() => {
                if (sortBy === null) {
                  setSortBy("lastName");
                } else {
                  setSortBy(null);
                }
              }}
            >
              <FontAwesomeIcon icon={faArrowDownAZ}></FontAwesomeIcon>
            </span>
            email
          </p>
        </div>
        <div className="header-phone">
          <p>phone</p>
        </div>
        <div className="header-profession">
          <p>
            <span
              style={{
                color: sortBy === "profession" ? "rgb(39 170 249)" : "#678796",
              }}
              className="filter-alphabetically"
              onClick={() => {
                if (sortBy === null) {
                  setSortBy("profession");
                } else {
                  setSortBy(null);
                }
              }}
            >
              <FontAwesomeIcon icon={faArrowDownAZ}></FontAwesomeIcon>
            </span>
            profession
          </p>
        </div>
      </div>
    </>
  );
};
export default ListHeader;
