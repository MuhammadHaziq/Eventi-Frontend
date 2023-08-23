
 const amount = event_detail?.amount;
  console.log(userData?.data?.user_type

{userData?.data?.user_type == "customer" ? (
            <CRow className="mt-4">
              <CCol md="12">
                <strong>Customer Register Members List</strong>
                <AddTricketMembers
                  CustID={userData?.data?._id}
                  amount={amount}
                />
              </CCol>
            </CRow>
          ) : (
            ""
          )}