import "./ListHeader.css";
const ListHeader = ({ onCheckAll, checkedItems, contactList, viewMode }) => {
  
  return (
    <>
      <div className="card-view-header">
        
        <div
          className="card-header-checkbox"
          style={{ display: viewMode === "list" ? "none" : "flex" }}
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
        style={{ display: viewMode === "list" ? "flex" : "none" }}
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
    </>
  );
};
export default ListHeader;
