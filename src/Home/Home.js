import "./Home.css";
import ListItem from "./ListItem/ListItem";
import { useEffect, useState } from "react";
import ListHeader from "./ListHeader/ListHeader";
import ModalForm from "./ListItem/ModalForm/ModalForm";
import Header from "./Header/Header";
import InlineContactAdd from "./InlineContactAdd/InlineContactAdd";
import ListItemCardView from "./ListItemCardView/ListItemCardView";
import NoContacts from "../NoContacts/NoContacts";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import uuid from "react-uuid";
const Home = ({ editMode, addMode, viewMode }) => {
  const [contactList, setContactList] = useState([]);
  const [modalMode, setModalMode] = useState(false);
  const [editItem, setEditItem] = useState();
  const [mode, setMode] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [addInline, setAddInline] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("firstName");
  const [filterAlphabetically, setFilterAlphabetically] = useState(false);
  const [contacts, updateContacts] = useState(contactList);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  async function fetchUsers() {
    try {
      setLoading(true)
      setError("");
      const response = await axios.get(
        "https://636f41c5f2ed5cb047d8e6ee.mockapi.io/contactlist/users"
      );
      setLoading(false)
      const users = response.data;
      setContactList(users);
      updateContacts(users);
    } catch (e) {
      setError(e.message);
    }
  }

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
  async function onAdd(contact) {

    try {
      const response = await axios.post(
        "https://636f41c5f2ed5cb047d8e6ee.mockapi.io/contactlist/users",
        contact
      );
      setContactList([
        ...contactList,
        {
          id: contact.id,
          firstName: contact.name,
          lastName: contact.surname,
          email : contact.email,
          phone : contact.phone,
          profession: contact.profession,
        },
      ]);
      updateContacts([
        ...contactList,
        {
          id: uuid(),
          firstName: contact.name,
          lastName: contact.surname,
          email : contact.email,
          phone : contact.phone,
          profession: contact.profession,
        },
      ])
      fetchUsers()
    }
    catch (error) {
      setError(error)
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
  async function onChange(newInfo) {
    setLoading(true)
    const response = await axios.put(`https://636f41c5f2ed5cb047d8e6ee.mockapi.io/contactlist/users/${newInfo.id}`, newInfo)
    setLoading(false)
    setContactList(
      contactList.map((item) => {       
        if (item.id === newInfo.id) {
          return newInfo;
        }
        return item;
      })
    );
    updateContacts(
      contactList.map((item) => {       
        if (item.id === newInfo.id) {
          return newInfo;
        }
        return item;
      })
    )
  }
  async function onDelete(id) {
    try {
      const response = axios.delete(`https://636f41c5f2ed5cb047d8e6ee.mockapi.io/contactlist/users/${id}`)
      setContactList(
        contactList.filter((contact) => {
          return contact.id !== id;
        })
      )
      updateContacts(
        contactList.filter((contact) => {
          return contact.id !== id;
        })
      )
    }
    catch (error) {
      setError(error)
    }
  }
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(contacts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateContacts(items);
  }
  async function onDeleteSelected() {
    const selectedItems = contacts.filter((contact => checkedItems.includes(contact.id))).map(contact => contact.id)
    selectedItems.map((id) => {
      const response = axios.delete(`https://636f41c5f2ed5cb047d8e6ee.mockapi.io/contactlist/users/${id}`)
      console.log(id, response)
    })
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
  
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    
    <div className="container-home">
      {loading && (
        <div className="lds-dual-ring">
        </div>
      )}
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
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <ListItem
                            reff={provided}
                            item={item}                           
                            selectAll={selectAll}
                            checkedItems={checkedItems}
                            editMode={editMode}
                            setContactList={setContactList}
                            contactList={contactList}
                            onCheck={onCheck}
                            toggleMode={() => {
                              toggleMode(item);
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
                    toggleMode(item);
                  }}
                  onChange={onChange}
                  onDelete={onDelete}
                />
              );
            })}
        </div>
      )}
      {!loading && contactList.length === 0 && (
        <NoContacts
          addMode={addMode}
          error={error}
          setAddInline={setAddInline}
          setModalMode={setModalMode}
          setMode={setMode}
        />
      )}
      
    </div>
  );
};

export default Home;
