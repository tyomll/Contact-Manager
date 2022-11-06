import "./Home.css";
import { list } from "../const";
import ListItem from "./ListItem/ListItem";
import { useState } from "react";
import ListHeader from "./ListHeader/ListHeader";
import ModalForm from "./ModalForm/ModalForm";
import Header from "./Header/Header";
import InlineContactAdd from "./InlineContactAdd/InlineContactAdd";

const Home = ({ editMode, addMode }) => {
  const [contactList, setContactList] = useState(list);
  const [modalMode, setModalMode] = useState(false);
  const [editItem, setEditItem] = useState();
  const [mode, setMode] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [addInline, setAddInline] = useState(false)
  function onCheck() {
    setSelectAll(!selectAll);
    if (selectAll === false) {
      setCheckedItems(
        contactList.map((contact) => {
          return contact.id;
        })
      );
    } else {
      setCheckedItems([]);
    }
  }
  function onAdd(id, name, surname, email, phone, profession) {
    {
      setContactList([
        ...contactList,
        {
          key: id,
          id: id,
          firstName: name,
          lastName: surname,
          email: email,
          phone: phone,
          profession: profession,
        },
      ]);
    }
  }
  return (
    <div className="container">
      {(editMode === "inline" ? mode : false || editItem) && (
        <div
          className="edit-modal-bg"
          style={{ display: modalMode ? "flex" : "none" }}
        >

          <ModalForm
            mode={mode}
            setMode={setMode}
            setEditItem={setEditItem}
            contactList={contactList}
            setModalMode={setModalMode}
            editItem={editItem}
            modalMode={modalMode}
            onChange={(newInfo) => {
              setContactList(
                contactList.map((item) => {
                  if (item.id === newInfo.id) {
                    return newInfo;
                  }
                  return item;
                })
              );
            }}
            onAdd={onAdd}
          />

        </div>
      )}
      <Header
        setModalMode={setModalMode}
        setMode={setMode}
        checkedItems={checkedItems}
        addMode={addMode}
        setAddInline={setAddInline}
        editMode={editMode}
        onDeleteSelected={() => {
          setContactList(
            contactList.filter((contact) => !checkedItems.includes(contact.id)),
            setCheckedItems([])
          )
        }}
      />
      {addInline && <InlineContactAdd onAdd={onAdd} setAddInline={setAddInline}/>}
      <ListHeader
        onCheck={onCheck}
        selectAll={selectAll}
        checkedItems={checkedItems}
        contactList={contactList}
      />
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
              checkedItems={checkedItems}
              editMode={editMode}
              setContactList={setContactList}
              contactList={contactList}
              onCheck={(id, isChecked) => {
                if (isChecked === false) {
                  setCheckedItems(
                    checkedItems.filter((checkedItemId) => {
                      return checkedItemId !== id;
                    })
                  );
                }
                if (isChecked === true) {
                  contactList.map((contact) => {
                    if (id === contact.id) {
                      setCheckedItems([...checkedItems, contact.id]);
                    }
                  });
                }
              }}
              toggleMode={() => {
                setModalMode(true);
                setEditItem(item);
              }}
              onChange={(newInfo) => {
                setContactList(
                  contactList.map((item) => {
                    if (item.id === newInfo.id) {
                      return newInfo;
                    }
                    return item;
                  })
                );
              }}
              onDelete={(id) => {
                setContactList(
                  contactList.filter((contact) => {
                    return contact.id !== id;
                  })
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;