function TableRows({ rowsData, deleteTableRows, handleChange }) {
  return rowsData.map((data, index) => {
    const { firstName, lastName, emailAddress, phone } = data; 
   
    return (
      <tr key={index}>
        <td>
          <input
            type="text"
            value={firstName}
            onChange={(evnt) => handleChange(index, evnt)}
            name="firstName"
            className="form-control"
          />
        </td>
        <td>
          <input
            type="text"
            value={lastName}
            onChange={(evnt) => handleChange(index, evnt)}
            name="lastName"
            className="form-control"
          />
        </td>
        <td>
          <input
            type="text"
            value={emailAddress}
            onChange={(evnt) => handleChange(index, evnt)}
            name="emailAddress"
            className="form-control"
          />{" "}
        </td>
        <td>
          <input
            type="number"
            value={phone}
            onChange={(evnt) => handleChange(index, evnt)}
            name="phone"
            className="form-control"
          />{" "}
        </td>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteTableRows(index)}
          >
            x
          </button>
        </td>
      </tr>
    );
  });
}
export default TableRows;
