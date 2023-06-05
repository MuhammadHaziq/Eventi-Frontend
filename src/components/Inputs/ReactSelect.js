import React, { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { CFormLabel } from "@coreui/react";

const ReactSelect = ({
  options = [],
  isClearable = true,
  isSearchable = true,
  isCreatable = false,
  isRequired = false,
  handleChange,
  name,
  label,
  value,
  placeholder = "Select",
  id = "",
  className = "",
}) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState(options.filter((item) => item.value === value)?.[0] || null);
  }, [value, options]);

  const handleOnChange = (selectedValue) => {
    setState(selectedValue);
    const e = {
      target: { name: name, value: selectedValue?.value || selectedValue },
    };
    handleChange(e);
  };
  return (
    <>
      {label && <CFormLabel htmlFor={label}>{label}</CFormLabel>}
      {isCreatable ? (
        <CreatableSelect
          className={className}
          options={options}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isCreatable={isCreatable}
          isRequired={isRequired}
          id={id}
          value={state}
          onChange={handleOnChange}
          placeholder={placeholder}
        />
      ) : (
        <Select
          className={className}
          id={id}
          value={state}
          onChange={handleOnChange}
          options={options}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isRequired={isRequired}
          placeholder={placeholder}
        />
      )}
    </>
  );
};

export default ReactSelect;
