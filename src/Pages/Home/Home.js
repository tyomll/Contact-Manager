import "./Home.css";
import { useState } from "react";
import ListHeader from "./ListHeader/ListHeader";
import ModalForm from "./ModalForm/ModalForm";
import Header from "./Header/Header";
import InlineContactAdd from "./InlineContactAdd/InlineContactAdd";
import NoContacts from "./NoContacts/NoContacts";
import Pagination from "./Pagination/Pagination";
import ContactList from "./ContactList/ContactList";
import { useSettings } from "../../context/context";

const Home = ({
  editMode,
  addMode,
  viewMode,
  BASE_URL,
  onChange,
  contactList,
  setContactList,
  contacts,
  updateContacts,
  loading,
  fetchUsers,
  error,
  setError,
  checkedItems,
  setCheckedItems,
}) => {
  const [modalMode, setModalMode] = useState(false);
  const [editItem, setEditItem] = useState();
  const [mode, setMode] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [addInline, setAddInline] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("firstName");
  const [sortBy, setSortBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [onePageUserCount, setOnePageUserCount] = useState(8);
  const lastContactIndex = currentPage * onePageUserCount;
  const firstContactIndex = lastContactIndex - onePageUserCount;
  const currentPosts = contacts.slice(firstContactIndex, lastContactIndex);
  const settings = useSettings();
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
      const response = await BASE_URL.post("/users", contact);
      setContactList([...contactList, response.data]);
      updateContacts([...contactList, response.data]);
      fetchUsers();
    } catch (error) {
      setError(error);
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
  async function onDelete(id) {
    try {
      BASE_URL.delete(`/users/${id}`);
      setContactList(
        contactList.filter((contact) => {
          return contact.id !== id;
        })
      );
      updateContacts(
        contactList.filter((contact) => {
          return contact.id !== id;
        })
      );
    } catch (error) {
      setError(error);
    }
  }

  async function onDeleteSelected() {
    const selectedItems = contacts
      .filter((contact) => checkedItems.includes(contact.id))
      .map((contact) => contact.id);
    selectedItems.map((id) => {
      BASE_URL.delete(`/users/${id}`);
    });
    updateContacts(
      contacts.filter((contact) => !checkedItems.includes(contact.id)),
      setCheckedItems([])
    );
    setContactList(
      contactList.filter((contact) => !checkedItems.includes(contact.id)),
      setCheckedItems([])
    );
  }
  function toggleMode(item) {
    setModalMode(true);
    setEditItem(item);
  }

  return (
    <div className="container-home">
      {loading && <div className="lds-dual-ring"></div>}
      {(modalMode || editItem) && (
        <ModalForm
          mode={mode}
          setMode={setMode}
          setEditItem={setEditItem}
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
        setSortBy={setSortBy}
        sortBy={sortBy}
      />
      <ContactList
        viewMode={viewMode}
        contacts={contacts}
        updateContacts={updateContacts}
        searchBy={searchBy}
        searchValue={searchValue}
        sortBy={sortBy}
        selectAll={selectAll}
        checkedItems={checkedItems}
        editMode={editMode}
        setContactList={setContactList}
        contactList={contactList}
        onCheck={onCheck}
        toggleMode={toggleMode}
        onChange={onChange}
        onDelete={onDelete}
        currentPosts={currentPosts}
      />

      {!loading && contactList.length === 0 && (
        <NoContacts
          addMode={addMode}
          error={error}
          setAddInline={setAddInline}
          setModalMode={setModalMode}
          setMode={setMode}
        />
      )}
      <Pagination
        contactList={contactList}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onePageUserCount={onePageUserCount}
        setOnePageUserCount={setOnePageUserCount}
        currentPosts={currentPosts}
        lastContactIndex={lastContactIndex}
        firstContactIndex={firstContactIndex}
      />
    </div>
  );
};

export default Home;
