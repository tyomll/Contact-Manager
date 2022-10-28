import { useState } from "react";
import "./ModalForm.css";
import swal from "sweetalert";

function ModalForm({ modal, setMode, onChange, firstName, mode }) {
  const [newName, setNewName] = useState(modal.firstName);
  const [newSurname, setNewSurname] = useState(modal.lastName);
  const [newEmail, setNewEmail] = useState(modal.email);
  const [newPhone, setNewPhone] = useState(modal.phone);
  const [newProfession, setNewProfession] = useState(modal.profession);
  return (
    <div className="edit-modal">
      <h2>Edit Contact</h2>

      <label>Name</label>
      <input
        type="text"
        defaultValue={newName}
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      ></input>
      <label>Surname</label>
      <input
        type="text"
        defaultValue={newSurname}
        onChange={(e) => {
          setNewSurname(e.target.value);
        }}
      ></input>
      <label>Email</label>
      <input
        type="text"
        defaultValue={newEmail}
        onChange={(e) => {
          setNewEmail(e.target.value);
        }}
      ></input>
      <label>Phone</label>
      <input
        type="text"
        defaultValue={newPhone}
        onChange={(e) => {
          setNewPhone(e.target.value);
        }}
      ></input>
      <label>Profession</label>
      <input
        type="text"
        defaultValue={newProfession}
        onChange={(e) => {
          setNewProfession(e.target.value);
        }}
      ></input>
      <div className="modal-btns">
        <button
          onClick={() => {
            setMode(false);
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            console.log(newName);
            if (
              newName !== undefined &&
              newSurname !== undefined &&
              newEmail !== undefined &&
              newPhone !== undefined &&
              newProfession !== undefined
            ) {
              setMode(false);
              onChange({
                ...modal,
                firstName: newName,
                lastName: newSurname,
                email: newEmail,
                phone: newPhone,
                profession: newProfession,
              });
            } else {
              swal("Oops Error", "You should fill all fields!", "error");
            }
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
export default ModalForm;
