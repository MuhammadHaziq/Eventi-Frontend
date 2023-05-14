import React, { useState } from 'react'
import {
    CButton,
    CCardBody,
    CFormSelect,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormFeedback,
    CInputGroup,
    CFormLabel,
    CFormSwitch
} from '@coreui/react'

const CustomerRegister = () => {
    const [validated, setValidated] = useState(false)
    const [state, setState] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        business_name: "",
        address: "",
        date_of_birth: "",
        gender: "",
        phone_number: "",
        age_verification: false
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget
        console.log(form.checkValidity(), "form.checkValidity()")
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault()
            event.stopPropagation()
            console.log(state, event, "state")
        }

        setValidated(true)
    }
    return (
        <CCardBody className='p-4'>
            <CForm
                className="row g-2 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <h1>Customer Register</h1>
                <CCol md={6}>
                    <CFormInput
                        type="text"
                        id="validationFirstName"
                        floatingClassName="mb-3"
                        floatingLabel="First Name"
                        placeholder="First Name"
                        name="first_name"
                        defaultValue={state.first_name}
                        onChange={handleOnChange}
                        required
                    />
                    <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                    <CFormInput
                        type="text"
                        id="validationLastName"
                        floatingClassName="mb-3"
                        floatingLabel="Last Name"
                        placeholder="Last Name"
                        name="last_name"
                        defaultValue={state.last_name}
                        onChange={handleOnChange}
                        required
                    />
                    <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                    <CFormInput
                        type="email"
                        id="validationEmailAddress"
                        floatingClassName="mb-3"
                        floatingLabel="Email Address"
                        placeholder="Email Address"
                        name="email"
                        defaultValue={state.email}
                        autoComplete={''}
                        onChange={handleOnChange}
                        required
                    />
                    <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                    <CFormInput
                        type="password"
                        id="validationPassword"
                        floatingClassName="mb-3"
                        floatingLabel="Password"
                        placeholder="Passwors"
                        autoComplete=''
                        name="password"
                        defaultValue={state.password}
                        onChange={handleOnChange}
                        required
                    />
                    <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                    <CFormInput
                        type="text"
                        id="validationBusinessName"
                        floatingClassName="mb-3"
                        floatingLabel="Optional Business Name"
                        placeholder="Optional Business Name"
                        name="business_name"
                        defaultValue={state.business_name}
                        onChange={handleOnChange}
                    />
                    <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                    <CInputGroup>
                        <CFormInput
                            type="number"
                            id="validationContactNumber"
                            floatingClassName="mb-3"
                            floatingLabel="Contact Number"
                            placeholder="Contact Number"
                            defaultValue={state.phone_number}
                            name="phone_number"
                            onChange={handleOnChange}
                            required
                        />
                        <CFormFeedback invalid>Please enter contact number.</CFormFeedback>
                    </CInputGroup>
                </CCol>
                <CCol md={6}>
                    <CInputGroup>
                        <CFormInput
                            type="string"
                            id="validationAddress"
                            floatingClassName="mb-3"
                            floatingLabel="Address"
                            placeholder="Address"
                            name="address"
                            defaultValue={state.address}
                            onChange={handleOnChange}
                            required
                        />
                        <CFormFeedback invalid>Please enter address.</CFormFeedback>
                    </CInputGroup>
                </CCol>
                <CCol md={6}>
                    <CInputGroup>
                        <CFormInput
                            type="date"
                            id="validationDateOfBirth"
                            floatingClassName="mb-3"
                            floatingLabel="Date Of Birth"
                            placeholder="Date Of Birth"
                            name="date_of_birth"
                            defaultValue={state.date_of_birth}
                            onChange={handleOnChange}
                            required
                        />
                        <CFormFeedback invalid>Please enter date of birth.</CFormFeedback>
                    </CInputGroup>
                </CCol>
                <CCol md={6}>
                    <CFormSelect size="sm" aria-label="select example" id="validationGender"
                        floatingClassName="mb-3"
                        floatingLabel="Gender"
                        placeholder="Gender"
                        name="gender"
                        defaultValue={state.gender}
                        onChange={handleOnChange}
                        required>
                        <option></option>
                        <option value="Men">Men</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </CFormSelect>
                    <CFormFeedback invalid>Please provide a valid gender.</CFormFeedback>
                </CCol>
                <CCol xs={12}>
                    <CFormLabel>Age Verification</CFormLabel>
                    <CFormSwitch label="Are you over 18+ years old?" id="age_verification" checked={state.age_verification} onChange={(e) => setState({ ...state, age_verification: !state.age_verification })} />
                </CCol>
                <CCol xs={12}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label="Agree to terms and conditions"
                        required
                    />
                    <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                </CCol>
                <CCol xs={12}>
                    <CButton color="primary" type="submit">
                        Sign Up
                    </CButton>
                </CCol>
            </CForm>
        </CCardBody>
    )
}

export default CustomerRegister
