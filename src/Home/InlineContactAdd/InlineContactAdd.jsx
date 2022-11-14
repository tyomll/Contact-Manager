import "./InlineContactAdd.css";
import { useState } from "react";
import uuid from "react-uuid";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faAdd} from "@fortawesome/free-solid-svg-icons";

function InlineContactAdd({ onAdd , setAddInline}) {
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newProfession, setNewProfession] = useState("");
  return (
    <div className="contact-add-inline">
      <input
        type="text"
        placeholder="First Name"
        value={newName}
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={newSurname}
        onChange={(e) => {
          setNewSurname(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Email"
        value={newEmail}
        onChange={(e) => {
          setNewEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Phone"
        value={newPhone}
        onChange={(e) => {
          setNewPhone(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Profession"
        value={newProfession}
        onChange={(e) => {
          setNewProfession(e.target.value);
        }}
      />
      <button onClick={() => {
        setAddInline(false)
        setNewName("")
        setNewSurname("")
        setNewEmail("")
        setNewPhone("")
        setNewProfession("")
      }}><FontAwesomeIcon icon={faX}></FontAwesomeIcon></button>
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
            setNewName("")
            setNewSurname("")
            setNewEmail("")
            setNewPhone("")
            setNewProfession("")
          } else {
            swal("Oops Error", "You should fill all fields!", "error");
          }
        }}
      >
        <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
      </button>
    </div>
  );
}
export default InlineContactAdd;
