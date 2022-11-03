import "./ListItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import swal from "sweetalert";

const ListItem = ({
  id,
  avatar,
  firstName,
  lastName,
  email,
  phone,
  profession,
  onDelete,
  toggleMode,
  selectAll,
  onCheck,
}) => {
  const [isChecked, setIsChecked] = useState(false);
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
    <div className="list-item-container">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          
          if(isChecked === false){
            onCheck(id , true);
            setIsChecked(true)
          }
          else{
            onCheck(id , false);
            setIsChecked(false)
          }       
        }}
      />
      <div className="avatar">
        <img className="avatar-img" src={avatar} />
      </div>
      <div className="name">
        {firstName}&nbsp;
        {lastName}
      </div>
      <div className="email">{email}</div>
      <div className="phone">{phone}</div>
      <div className="profession">{profession}</div>
      <div className="edit-btns">
        <span className="edit">
          <FontAwesomeIcon
            icon={faPen}
            onClick={() => {
              toggleMode(id);
            }}
          />
        </span>

        <span className="delete" onClick={openDeletePopup}>
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </div>
    </div>
  );
  
};

export default ListItem;
