import { CButton, CCol, CRow } from "@coreui/react";
import { PhoneNumberInput } from "src/components/Inputs/PhoneInput";

function TableRows({ rowsData, deleteTableRows, handleChange }) {
  return rowsData.map((data, index) => {
    const { first_name, last_name, email, phone_number, disable } = data;

    return (
      <tr key={index}>
        <td>
          <input
            type="text"
            value={first_name}
            onChange={(evnt) => handleChange(index, evnt)}
            name="first_name"
            className="form-control"
            disabled={disable}
          />
        </td>
        <td>
          <input
            type="text"
            value={last_name}
            onChange={(evnt) => handleChange(index, evnt)}
            name="last_name"
            className="form-control"
            disabled={disable}
          />
        </td>
        <td>
          <input
            type="text"
            value={email}
            onChange={(evnt) => handleChange(index, evnt)}
            name="email"
            className="form-control"
            disabled={disable}
          />{" "}
        </td>
        <td>
          <PhoneNumberInput
            phone_number={phone_number}
            handleOnChange={(evnt) => handleChange(index, evnt)}
            name="phone_number"
            className="form-control"
            disabled={disable}
          />
        </td>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteTableRows(index)}
            disabled={disable}
          >
            x
          </button>
        </td>
      </tr>
    );
  });
}
export default TableRows;
