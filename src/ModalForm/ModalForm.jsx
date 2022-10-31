import { useState } from "react";
import "./ModalForm.css";
import swal from "sweetalert";
import uuid from "react-uuid";

function ModalForm({
  editItem,
  setModalMode,
  onChange,
  setEditItem,
  mode,
  onAdd,
  setMode,
}) {
  // Edit mode states
  const [editedName, setEditedName] = useState(
    mode ? undefined : editItem.firstName
  );
  const [editedSurname, setEditedSurname] = useState(
    mode ? undefined : editItem.lastName
  );
  const [editedEmail, setEditedEmail] = useState(
    mode ? undefined : editItem.email
  );
  const [editedPhone, setEditedPhone] = useState(
    mode ? undefined : editItem.phone
  );
  const [editedProfession, setEditedProfession] = useState(
    mode ? undefined : editItem.profession
  );

  // Adding contact mode states
  const [newName, setNewName] = useState();
  const [newSurname, setNewSurname] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newPhone, setNewPhone] = useState();
  const [newProfession, setNewProfession] = useState();
  const editModal = (
    <div className="edit-modal">
      <h2>Edit Contact</h2>
      <label>Name</label>
      <input
        type="text"
        value={editedName}
        onChange={(e) => {
          setEditedName(e.target.value);
        }}
      ></input>
      <label>Surname</label>
      <input
        type="text"
        value={editedSurname}
        onChange={(e) => {
          setEditedSurname(e.target.value);
        }}
      ></input>
      <label>Email</label>
      <input
        type="text"
        value={editedEmail}
        onChange={(e) => {
          setEditedEmail(e.target.value);
        }}
      ></input>
      <label>Phone</label>
      <input
        type="text"
        value={editedPhone}
        onChange={(e) => {
          setEditedPhone(e.target.value);
        }}
      ></input>
      <label>Profession</label>
      <input
        type="text"
        value={editedProfession}
        onChange={(e) => {
          setEditedProfession(e.target.value);
        }}
      ></input>
      <div className="modal-btns">
        <button
          onClick={() => {
            setModalMode(false);
            setEditItem();
            setEditedName(editItem.firstName);
            setEditedSurname(editItem.lastName);
            setEditedEmail(editItem.email);
            setEditedPhone(editItem.phone);
            setEditedProfession(editItem.profession);
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (
              editedName !== "" &&
              editedSurname !== "" &&
              editedEmail !== "" &&
              editedPhone !== "" &&
              editedProfession
            ) {
              onChange({
                ...editItem,
                firstName: editedName,
                lastName: editedSurname,
                email: editedEmail,
                phone: editedPhone,
                profession: editedProfession,
              });

              setEditItem();
              setEditedName(editItem.firstName);
              setEditedSurname(editItem.lastName);
              setEditedEmail(editItem.email);
              setEditedPhone(editItem.phone);
              setEditedProfession(editItem.profession);
              setModalMode(false);
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
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------

  const addModal = (
    <div className="edit-modal">
      <h2>Add contact</h2>
      <label>Name</label>
      <input
        type="text"
        value={newName}
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      ></input>
      <label>Surname</label>
      <input
        type="text"
        value={newSurname}
        onChange={(e) => {
          setNewSurname(e.target.value);
        }}
      ></input>
      <label>Email</label>
      <input
        type="text"
        value={newEmail}
        onChange={(e) => {
          setNewEmail(e.target.value);
        }}
      ></input>
      <label>Phone</label>
      <input
        type="text"
        value={newPhone}
        onChange={(e) => {
          setNewPhone(e.target.value);
        }}
      ></input>
      <label>Profession</label>
      <input
        type="text"
        value={newProfession}
        onChange={(e) => {
          setNewProfession(e.target.value);
        }}
      ></input>
      <div className="modal-btns">
        <button
          onClick={() => {
            setModalMode(false);
            setMode(false)
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (
              newName !== "" &&
              newSurname !== "" &&
              newEmail !== "" &&
              newPhone !== "" &&
              newProfession
            ) {
              onAdd(
                uuid(),
                newName,
                newSurname,
                newEmail,
                newPhone,
                newProfession
              );
              setNewName("");
              setNewSurname("");
              setNewEmail("");
              setNewPhone("");
              setNewProfession("");
              setModalMode(false);
              setMode(false)
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
  return mode ? addModal : editModal;
}
export default ModalForm;
