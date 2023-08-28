import { useState } from "react";
import TableRows from "../TableRow";
import { CButton } from "@coreui/react";

import { addProduct } from "src/context/ProductContext/service";

const Ticket = ({ data, eventDetail }) => {
  console.log("Ticket Data --------", data);
  console.log("Event Detail Data --------", eventDetail);

  const [rowsData, setRowsData] = useState([]);
  const addTableRows = () => {
    const rowsInput = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phone: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };
  console.log("Row Data-----", rowsData);

  const handleSubmit = (event) => {
    alert("The name you entered was");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Phone No</th>
                <th>
                  <button
                    className="btn btn-outline-success"
                    onClick={addTableRows}
                  >
                    +
                  </button>
                </th>
              </tr>
             
            </thead>
            <tbody>
              <TableRows
                rowsData={rowsData}
                deleteTableRows={deleteTableRows}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </tbody>
          </table>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
};
export default Ticket;
