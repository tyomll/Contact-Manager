import "./App.css";
import { list } from "../const";
import ListItem from "../ListItem/ListItem";
import { useState } from "react";
import ListHeader from "../ListHeader/ListHeader";
import ModalForm from "../ModalForm/ModalForm";
import Header from "../Header/Header";

const App = () => {
  const [contactList, setContactList] = useState(list)
  const [modalMode, setModalMode] = useState(false)
  const [editItem, setEditItem] = useState()
  const [mode, setMode] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [checkedItems, setCheckedItems] = useState([])

  return (
    <div className="container">
      <div className="edit-modal-bg" style={{ display: modalMode ? "flex" : "none" }}>
        {(mode || editItem) && <ModalForm
          mode={mode}
          setMode={setMode}
          setEditItem={setEditItem}
          contactList={contactList}
          setModalMode={setModalMode}
          editItem={editItem}
          modalMode={modalMode}
          onChange={(newInfo) => {
            setContactList(contactList.map((item) => {
              if (item.id === newInfo.id) {
                return newInfo
              }
              return item
            }))
          }}
          onAdd={(id, name, surname, email, phone, profession) => {
            setContactList([
              ...contactList,
              {
                key: id,
                id: id,
                firstName: name,
                lastName: surname,
                email: email,
                phone: phone,
                profession: profession
              }
            ])
          }}
        />}
      </div>
      <Header
        setModalMode={setModalMode}
        setMode={setMode}
        onDeleteSelected={() => {
          setContactList(contactList.filter((contact) => {
            return !contact.isChecked
          }))
        }}
      />
      <ListHeader onCheck={() => {
        setSelectAll(!selectAll)
        contactList.map(() => {
          setCheckedItems([
            ...contactList,
          ]
          )
        })
      }} />
      <div className="list">
        {contactList.map((item) => {
          return (
            <ListItem
              item={item}
              key={item.id}
              id={item.id}
              avatar={item.avatar}
              firstName={item.firstName}
              lastName={item.lastName}
              email={item.email}
              phone={item.phone}
              profession={item.profession}
              selectAll={selectAll}
              onCheck={(id, isChecked) => {
                if (isChecked === false) {
                  setCheckedItems(checkedItems.filter((contact) => {
                    return contact.id !== id
                  }))
                }
                if (isChecked === true) {
                  contactList.map((contact) => {
                    if (id === contact.id) {
                      setCheckedItems([
                        ...checkedItems,
                        contact
                      ]
                      )
                    }
                  })
                }
              }}
              toggleMode={() => {
                setModalMode(true)
                setEditItem(item)
              }}
              onChange={(newInfo) => {
                setContactList(contactList.map((item) => {
                  if (item.id === newInfo.id) {
                    return newInfo
                  }
                  return item
                }))
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