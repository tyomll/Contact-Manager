import "./ListHeader.css";

const ListHeader = () => {
  return (
    <div className="list-header">
      <div className="header-checkbox">
        <input type="checkbox" />
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
