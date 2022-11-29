import "./ListItem.css";
import swal from "sweetalert";
import ListItemNormalMode from "./ListItemNormalMode";

const ListItem = ({
  item,
  reff,
  editMode,
  checkedItems,
  toggleMode,
  onCheck,
  onDelete,
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
        onDelete(item.id);
        swal("Contact has been deleted!", {
          icon: "success",
        });
      }
    });
  }

  return (
    <ListItemNormalMode
      id={item.id}
      checkedItems={checkedItems}
      reff={reff}
      onCheck={onCheck}
      item={item}
      editMode={editMode}
      toggleMode={toggleMode}
      openDeletePopup={openDeletePopup}
    />
  );
};

export default ListItem;
