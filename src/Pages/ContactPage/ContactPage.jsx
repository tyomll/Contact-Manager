import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./ContactPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ContactPageEdit from "./ContactPageEdit/ContactPageEdit";

const ContactPage = ({ BASE_URL, onChange, contactList }) => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [editMode, setEditMode] = useState(false);

  async function getCurrentUserData() {
    const response = await BASE_URL.get(`/users/${id}`);
    const user = response.data;
    setContact(user);
  }
  useEffect(() => {
    getCurrentUserData();
  }, [contactList]);

  const normalMode = (
    <div className="contact-page">
      <Link to="/">
        <div className="contact-page-back">
          <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
        </div>
      </Link>
      {contact && (
        <div className="contact-page-container">
          <div className="contact-page-avatar">
            <img src={contact.avatar} />
          </div>
          <div className="contact-page-contact-details">
            <div className="contact-page-name">
              <label>Name:</label>
              <p>{contact.firstName}</p>
            </div>
            <div className="contact-page-surname">
              <label>Surname:</label>
              <p>{contact.lastName}</p>
            </div>
            <div className="contact-page-email">
              <label>Email:</label>
              <p>{contact.email}</p>
            </div>
            <div className="contact-page-phone">
              <div>
                <label>Phone:</label>
                {contact.phone.map((contact, i) => {
                  return <p key={i}>{contact.number}</p>;
                })}
              </div>
            </div>
            <div className="contact-page-profession">
              <label>Profession:</label>
              <p>{contact.profession}</p>
            </div>
            <div className="contact-page-edit-button">
              <button onClick={() => setEditMode(true)}>
                <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>Edit contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  return editMode ? (
    <ContactPageEdit
      contact={contact}
      setEditMode={setEditMode}
      onChange={onChange}
    />
  ) : (
    normalMode
  );
};

export default ContactPage;
