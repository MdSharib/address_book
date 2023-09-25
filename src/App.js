import { useRef, useState } from "react";
import "./App.css";
import Entries from "./Components/Entries/Entries";
import Navbar from "./Components/Navbar/Navbar";
import Table from "./Components/Table/Table";

function App() {
  const [tableData, setTableData] = useState([
    { name: "Name", address: "Address", phone: "Phone", email: "Email" },
  ]);
  const [storeTable, setStoreTable] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();

  // create table field
  const formHandler = (e) => {
    e.preventDefault();
    if (
      nameRef.current.value.trim() === "" ||
      addressRef.current.value.trim() === "" ||
      phoneRef.current.value.trim() === "" ||
      emailRef.current.value.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (
      phoneRef.current.value.trim().length !== 10 ||
      !/^\d+$/.test(phoneRef.current.value.trim())
    ) {
      alert("please enter valid phone number");
      return;
    }
    const data = {
      id: isEditing ? formData.id : Math.random() * 10,
      name: isEditing ? formData.name : nameRef.current.value,
      address: isEditing ? formData.address : addressRef.current.value,
      phone: isEditing ? formData.phone : phoneRef.current.value,
      email: isEditing ? formData.email : emailRef.current.value,
    };
    // console.log("data", data);
    if (isEditing) {
      const rowIndexToEdit = tableData.findIndex(
        (entry) => entry.id === editId
      );

      if (rowIndexToEdit !== -1) {
        const updatedTableData = [...tableData];
        updatedTableData[rowIndexToEdit] = data;
        setTableData(updatedTableData);
        setStoreTable(updatedTableData);
        // tableHandler(updatedTableData);
        setEditId("");
        setIsEditing(false);
        setFormData({
          id: "",
          name: "",
          address: "",
          phone: "",
          email: "",
        });
        nameRef.current.value = "";
        addressRef.current.value = "";
        phoneRef.current.value = "";
        emailRef.current.value = "";
        return;
      }
    }
    tableHandler(data);
    nameRef.current.value = "";
    addressRef.current.value = "";
    phoneRef.current.value = "";
    emailRef.current.value = "";
  };

  // search functionality
  const searchTableHandler = (data) => {
    if (data === "") {
      setTableData(storeTable);
      return;
    }
    const filteredData = storeTable.filter((entry) => {
      const query = data.toLowerCase();
      return (
        entry.name.toLowerCase().includes(query) ||
        entry.address.toLowerCase().includes(query) ||
        entry.phone.includes(data) ||
        entry.email.toLowerCase().includes(query)
      );
    });
    setTableData(filteredData);
  };
  const tableHandler = (data) => {
    setTableData(() => [...storeTable, data]);
    setStoreTable(() => [...storeTable, data]);

    // console.log(tableData);
  };

  // delete action handler
  const deleteHandler = (id) => {
    // console.log("id" , id);
    const filteredData = tableData.filter((entry) => {
      return entry.id !== id;
    });
    setTableData(filteredData);
    setStoreTable(filteredData);
  };

  const editHandler = (id) => {
    const selected = tableData.find((entry) => entry.id === id);

    if (selected) {
      setEditId(id);
      setFormData(selected);
      setIsEditing(true);
    }
  };

  return (
    <div className="main">
      <div className="container">
        <Navbar />
        <Entries searchTableHandler={searchTableHandler} />
        <Table
          tableData={tableData}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
        {isEditing ? (
          <div className="create-entry-div">
            <div className="entry-heading">Edit entry</div>
            <div className="entry-fields">
              <form onSubmit={formHandler}>
                <div className="form-row">
                  <label>Name: </label>
                  <input
                    type="text"
                    ref={nameRef}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  ></input>
                </div>
                <div className="form-row">
                  <label>Address: </label>
                  <input
                    type="text"
                    ref={addressRef}
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  ></input>
                </div>
                <div className="form-row">
                  <label>Phone: </label>
                  <input
                    type="tel"
                    ref={phoneRef}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  ></input>
                </div>
                <div className="form-row">
                  <label>Email: </label>
                  <input
                    type="email"
                    ref={emailRef}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  ></input>
                </div>
                <div className="form-row">
                  <button type="submit">Edit Entry</button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="create-entry-div">
            <div className="entry-heading">Create new entry</div>
            <div className="entry-fields">
              <form onSubmit={formHandler}>
                <div className="form-row">
                  <label>Name: </label>
                  <input type="text" ref={nameRef}></input>
                </div>
                <div className="form-row">
                  <label>Address: </label>
                  <input type="text" ref={addressRef}></input>
                </div>
                <div className="form-row">
                  <label>Phone: </label>
                  <input type="tel" ref={phoneRef}></input>
                </div>
                <div className="form-row">
                  <label>Email: </label>
                  <input type="email" ref={emailRef}></input>
                </div>
                <div className="form-row">
                  <button type="submit">Add Entry</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
