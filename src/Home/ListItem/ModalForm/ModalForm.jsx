import "./ModalForm.css";
import ModalEditForm from "./EditForm/ModalEditForm";
import ModalAddForm from "./AddForm/ModalAddForm";
function ModalForm({
  editItem,
  setModalMode,
  onChange,
  setEditItem,
  mode,
  onAdd,
  setMode,
  modalMode,
}) {
  return mode ? (
    <ModalAddForm
      modalMode={modalMode}
      setModalMode={setModalMode}
      setEditItem={setEditItem}
      setMode={setMode}
      onAdd={onAdd}
    />
  ) : (
    <ModalEditForm
      modalMode={modalMode}
      setModalMode={setModalMode}
      editItem={editItem}
      onChange={onChange}
      setEditItem={setEditItem}
    />
  );
}
export default ModalForm;
