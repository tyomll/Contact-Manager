import "./ListItem.css";
import { useState } from "react";
import swal from "sweetalert";
import ListItemNormalMode from "./ListItemNormalMode";
import ListItemEditMode from "./ListItemEditMode";

const ListItem = ({
  item,
  reff,
  editMode,
  checkedItems,
  toggleMode,
  onCheck,
  onChange,
  onDelete,
}) => {
  const [mode, setMode] = useState(true);
  
  function openDeletePopup() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this contact!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        onDelete(item.id);
        swal("Contact has been deleted!", {
          icon: "success",
        });
      }
    });
  }

  return mode ? (
    <ListItemNormalMode
      id={item.id}
      checkedItems={checkedItems}
      reff={reff}
      onCheck={onCheck}
      item={item}
      editMode={editMode}
      setMode={setMode}
      toggleMode={toggleMode}
      openDeletePopup={openDeletePopup}
    />
  ) : (
    <ListItemEditMode
      id={item.id}
      checkedItems={checkedItems}
      reff={reff}
      onCheck={onCheck}
      item={item}
      editMode={editMode}
      setMode={setMode}
      toggleMode={toggleMode}
      openDeletePopup={openDeletePopup}
      mode={mode}
      onChange={onChange}
    />
  );
};

export default ListItem;
