import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faX } from "@fortawesome/free-solid-svg-icons";
import "./ContactPageEdit.css";
import { useState } from "react";
import ListItemPhoneChange from "../../Home/ContactList/ContactListItem/ListItemPhoneChange";
import swal from "sweetalert";

const ContactPageEdit = ({ contact, setEditMode, onChange }) => {
  const [editedPhone, setEditedPhone] = useState(
    contact.phone.map((number) => {
      return number;
    })
  );
  const [editedContact, setEditedContact] = useState({
    id: contact.id,
    avatar: contact.avatar,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    profession: contact.profession,
  });

  return (
    <div className="contact-edit-page">
      <div className="contact-edit-page-container">
        <div className="contact-edit-page-avatar">
          <img src={editedContact.avatar} />
        </div>
        <div className="contact-edit-page-contact-details">
          <div className="contact-edit-page-name">
            <label>Name:</label>
            <input
              placeholder="First Name"
              value={editedContact.firstName}
              onChange={(e) => {
                setEditedContact({
                  ...editedContact,
                  firstName: e.target.value,
                });
              }}
            />
          </div>
          <div className="contact-edit-page-surname">
            <label>Surname:</label>
            <input
              placeholder="Last Name"
              value={editedContact.lastName}
              onChange={(e) => {
                setEditedContact({
                  ...editedContact,
                  lastName: e.target.value,
                });
              }}
            />
          </div>
          <div className="contact-edit-page-email">
            <label>Email:</label>
            <input
              placeholder="Email"
              value={editedContact.email}
              onChange={(e) => {
                setEditedContact({ ...editedContact, email: e.target.value });
              }}
            />
          </div>
          <div className="contact-edit-page-phone">
            <div>
              <label>Phone:</label>
              <ul>
                {editedContact.phone.map((contact, i) => {
                  return (
                    <ListItemPhoneChange
                      num={contact.number}
                      key={i}
                      index={i}
                      editedContact={editedContact}
                      setEditedContact={setEditedContact}
                      setEditedPhone={setEditedPhone}
                      editedPhone={editedPhone}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="contact-edit-page-profession">
            <label>Profession:</label>
            <input
              placeholder="Profession"
              value={editedContact.profession}
              onChange={(e) => {
                setEditedContact({
                  ...editedContact,
                  profession: e.target.value,
                });
              }}
            />
          </div>
          <div className="contact-edit-page-save-button">
            <button
              onClick={() => {
                if (
                  Object.keys(editedContact).every(
                    (k) => editedContact[k] !== ""
                  ) &&
                  Object.keys(editedPhone).every((k) => editedPhone[k].number)
                ) {
                  setEditedContact({ ...editedContact, phone: editedPhone });
                  setEditMode(false);
                  onChange(editedContact);
                } else {
                  swal("Oops Error", "You should fill all fields!", "error");
                }
              }}
            >
              <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>Save
            </button>
          </div>
          <div className="contact-edit-page-cancel-button">
            <button onClick={() => setEditMode(false)}>
              <FontAwesomeIcon icon={faX}></FontAwesomeIcon>Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPageEdit;
