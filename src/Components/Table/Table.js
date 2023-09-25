import React from "react";
import "./styles.css";

const Table = ({tableData, deleteHandler, editHandler}) => {

  const deleteBtnHandler = (id) => {
    deleteHandler(id);
  }
  const editBtnHandler = (id) => {
    editHandler(id);
  }
  return (
    <div className="table-div">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={() => editBtnHandler(item.id)}>Edit</button>
                <button onClick={() => deleteBtnHandler(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
