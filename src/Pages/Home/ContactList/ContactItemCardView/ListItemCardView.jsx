import "./ListItemCardView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const ListItemCardView = ({
  item,
  id,
  onDelete,
  toggleMode,
  onCheck,
  checkedItems,
  editMode,
}) => {
  function openDeletePopup() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this contact!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        onDelete(id);
        swal("Contact has been deleted!", {
          icon: "success",
        });
      }
    });
  }
  return (
    <div className="card">
      <div className="card-avatar">
        <img className="card-avatar-img" src={item.avatar} />
      </div>
      <div className="card-name">
        {item.firstName}&nbsp;
        {item.lastName}
      </div>
      <div className="card-email">{item.email}</div>
      <div className="card-phone">
        <ul>
          {item.phone.map((phone, i) => {
            return <li key={i}>{phone.number}</li>;
          })}
        </ul>
      </div>
      <div className="card-profession">{item.profession}</div>
      <div className="card-edit-btns">
        {editMode === "modal" ? (
          <span className="card-edit">
            <FontAwesomeIcon
              icon={faPen}
              onClick={() => {
                toggleMode(id);
              }}
            />
          </span>
        ) : (
          <Link to={`contacts/${id}`}>
            <FontAwesomeIcon icon={faPen} />
          </Link>
        )}
        <span className="card-delete" onClick={openDeletePopup}>
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </div>
      <input
        type="checkbox"
        checked={checkedItems.includes(id)}
        className="card-checkbox"
        onChange={(e) => {
          if (e.target.checked === true) {
            onCheck(id, true);
          } else {
            onCheck(id, false);
          }
        }}
      />
    </div>
  );
};

export default ListItemCardView;
