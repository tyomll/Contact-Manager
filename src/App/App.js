import "./App.css";
import Header from "../Header/Header";
import { list } from "../const";
import ListItem from "../ListItem/ListItem";
import { useState } from "react";
import ListHeader from "../ListHeader/ListHeader";
import ModalForm from "../ModalForm/ModalForm";


const App = () => {
  const [contactList, setContactList] = useState(list)
  const [mode, setMode] = useState(false)
  const [modal, setModal] = useState({})
  return (
    <div>
      <div className="edit-modal-bg" style={{ display: mode ? "flex" : "none" }}>
        <ModalForm
          setMode={setMode}
          modal={modal}
          mode={mode}
          firstName={modal.firstName}
          lastName={modal.lastName}
          email={modal.email}
          phone={modal.phone}
          profession={modal.profession}
          onChange={(newInfo) => {
            setContactList(contactList.map((item) => {
              if (item.id === newInfo.id) {
                return newInfo
              }
              return item
            }))
          }}
        />
      </div>
      <Header />
      <ListHeader />
      <div className="list">
        {contactList.map((item) => {
          return (
            <ListItem
              setModal={setModal}
              key={item.id}
              id={item.id}
              avatar={item.avatar}
              firstName={item.firstName}
              lastName={item.lastName}
              email={item.email}
              phone={item.phone}
              profession={item.profession}
              toggleMode={() => {
                setMode(!mode)
                setModal(item)
              }}
              onDelete={(id) => {
                setContactList(contactList.filter((contact) => {
                  return contact.id !== id
                }))
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;