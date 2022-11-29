import "./NoContacts.css";

function NoContacts({ addMode, setAddInline, setModalMode, setMode, error }) {
  return (
    <div className="no-contacts">
      <h1 className="no-contacts-heading">{error ? error : "Nothing Found"}</h1>
      <span>
        Click here to{" "}
        <span
          style={{ color: "#756CC0" }}
          onClick={() => {
            if (addMode === "inline") {
              setAddInline(true);
            } else {
              setModalMode(true);
              setMode(true);
            }
          }}
        >
          Add contact
        </span>
      </span>
    </div>
  );
}
export default NoContacts;
