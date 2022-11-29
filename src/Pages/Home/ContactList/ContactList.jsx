import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ListItemCardView from "./ContactItemCardView/ListItemCardView";
import ListItem from "./ContactListItem/ListItem";
const ContactList = ({
  viewMode,
  contacts,
  updateContacts,
  searchBy,
  searchValue,
  sortBy,
  selectAll,
  checkedItems,
  editMode,
  setContactList,
  contactList,
  onCheck,
  toggleMode,
  onChange,
  onDelete,
  currentPosts,
}) => {
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(contacts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateContacts(items);
  }

  return (
    <>
      {viewMode === "list" && (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div
                className="list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {currentPosts
                  .filter((contact) => {
                    if (
                      Object.prototype.toString.call(contact[searchBy]) !==
                      "[object Array]"
                    ) {
                      return searchValue.toLowerCase() === ""
                        ? contact
                        : contact[searchBy].toLowerCase().includes(searchValue);
                    } else {
                      if (
                        contact[searchBy].some((e) =>
                          e.number.includes(searchValue)
                        )
                      ) {
                        return searchValue === ""
                          ? contact
                          : contact[searchBy].some((e) =>
                              e.number.includes(searchValue)
                            );
                      }
                    }
                  })
                  .sort((a, b) => {
                    if (sortBy !== null) {
                      return a[sortBy].localeCompare(b[sortBy]);
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
          {currentPosts
            .filter((contact) => {
              if (
                Object.prototype.toString.call(contact[searchBy]) !==
                "[object Array]"
              ) {
                return searchValue.toLowerCase() === ""
                  ? contact
                  : contact[searchBy].toLowerCase().includes(searchValue);
              } else {
                if (
                  contact[searchBy].some((e) => e.number.includes(searchValue))
                ) {
                  return searchValue === ""
                    ? contact
                    : contact[searchBy].some((e) =>
                        e.number.includes(searchValue)
                      );
                }
              }
            })
            .map((item) => {
              return (
                <ListItemCardView
                  item={item}
                  key={item.id}
                  id={item.id}
                  checkedItems={checkedItems}
                  onCheck={onCheck}
                  toggleMode={() => {
                    toggleMode(item);
                  }}
                  onChange={onChange}
                  onDelete={onDelete}
                  editMode={editMode}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

export default ContactList;
