import "./AddContact.css"


function AddContact({setModalMode , setMode}) {
    return(
        <div>
            <button onClick={() => {
                setModalMode(true)
                setMode(true)
            }}>Add</button>
        </div>
    )
}

export default AddContact;
