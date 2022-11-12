import "./Home.css";
import { list } from "../const";
import ListItem from "./ListItem/ListItem";
import { useState } from "react";
import ListHeader from "./ListHeader/ListHeader";
import ModalForm from "./ModalForm/ModalForm";
import Header from "./Header/Header";
import InlineContactAdd from "./InlineContactAdd/InlineContactAdd";
import ListItemCardView from "./ListItemCardView/ListItemCardView";
import NoContacts from "../NoContacts/NoContacts";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Home = ({ editMode, addMode, viewMode }) => {
  const [contactList, setContactList] = useState(list);
  const [modalMode, setModalMode] = useState(false);
  const [editItem, setEditItem] = useState();
  const [mode, setMode] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [addInline, setAddInline] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("firstName");
  const [filterAlphabetically, setFilterAlphabetically] = useState(false);
  const [contacts, updateContacts] = useState(contactList)
  function onCheckAll() {
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
  function onCheck(id, isChecked) {
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
  }
  function onChange(newInfo) {
    updateContacts(
      contactList.map((item) => {
        if (item.id === newInfo.id) {
          return newInfo;
        }
        return item;
      })
    );
  }
  function onDelete(id) {
    setContactList(
      contactList.filter((contact) => {
        return contact.id !== id;
      })
    );

  }
  function onSearch(value) { }
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(contacts)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    updateContacts(items)
  }
  function onDeleteSelected() {
    setContactList(
      contactList.filter((contact) => !checkedItems.includes(contact.id)),
      setCheckedItems([])
    );
    updateContacts(
      contacts.filter((contact) => !checkedItems.includes(contact.id)),
      setCheckedItems([])
    );
  }
  function toggleMode(item) {
    setModalMode(true);
    setEditItem(item);
  }
  return (
    <div className="container">
      {(modalMode || editItem) && (
        <ModalForm
          mode={mode}
          setMode={setMode}
          setEditItem={setEditItem}
          contactList={contactList}
          setModalMode={setModalMode}
          editItem={editItem}
          modalMode={modalMode}
          onChange={onChange}
          onAdd={onAdd}
        />
      )}
      <Header
        setModalMode={setModalMode}
        setMode={setMode}
        checkedItems={checkedItems}
        addMode={addMode}
        setAddInline={setAddInline}
        editMode={editMode}
        onSearch={onSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        onDeleteSelected={onDeleteSelected}
      />
      {addInline && (
        <InlineContactAdd onAdd={onAdd} setAddInline={setAddInline} />
      )}
      <ListHeader
        onCheckAll={onCheckAll}
        selectAll={selectAll}
        checkedItems={checkedItems}
        contactList={contactList}
        viewMode={viewMode}
        filterAlphabetically={filterAlphabetically}
        setFilterAlphabetically={setFilterAlphabetically}
      />
      {viewMode === "list" && (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div
                className="list"
                ref={provided.innerRef}
                {...provided.droppableProps}

              >
                {contacts
                  .filter((contact) => {
                    return searchValue.toLowerCase() === ""
                      ? contact
                      : contact[searchBy].toLowerCase().includes(searchValue);
                  })
                  .sort((a, b) => {
                    if (filterAlphabetically === true) {
                      return a.firstName.localeCompare(b.firstName);
                    }
                  })
                  .map((item, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <ListItem

                            reff={provided}
                            item={item}
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
                            onCheck={onCheck}
                            toggleMode={() => {
                              toggleMode(item)
                            }}
                            onChange={onChange}
                            onDelete={onDelete}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      {viewMode === "card" && (
        <div className="card-items">
          {contactList
            .filter((contact) => {
              return searchValue.toLowerCase() === ""
                ? contact
                : contact[searchBy].toLowerCase().includes(searchValue);
            })
            .map((item) => {
              return (
                <ListItemCardView
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
                  onCheck={onCheck}
                  toggleMode={() => {
                    toggleMode(item)
                  }}
                  onChange={onChange}
                  onDelete={onDelete}
                />
              );
            })}
        </div>
      )}
      {contactList.length === 0 && (
        <NoContacts
          addMode={addMode}
          setAddInline={setAddInline}
          setModalMode={setModalMode}
          setMode={setMode}
        />
      )}
    </div>

  );
};

export default Home;
