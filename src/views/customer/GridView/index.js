import React from "react";
import { CCard, CCardBody,CButton } from "@coreui/react";
import AppSwiperthumbs from "src/components/AppSwiperthumbs";

const GridView = () => {
  return (
    <div class="row" >
      <div class="col-sm-4" style={{ background: "#fff",borderRadius: "10px 0px 0px 10px ",border: "none" }}>
        <CCard className="mb-4">
          <CCardBody
            style={{
              width: "100%",
              height: "350px",
            }}
          >
            <AppSwiperthumbs />
          </CCardBody>
        </CCard>
      </div>
      <div class="col-sm-8" style={{ background: "#fff",padding: "11px" ,borderRadius: "0px 10px 10px 0px "  }}>
        <h4 style={{}}>
        Party Event text here
        </h4>
        <br></br>
        <h6><u>Event Detail :</u></h6>
        <p>The delivery timelines will be clearly indicated for each product on the main product detail page and again on the checkout page. It depends on your city and your selected product.
          The delivery timelines will be clearly indicated for each product on the main product detail page and again on the checkout page. It depends on your city and your selected product.
          The delivery timelines will be clearly indicated for each product on the main product detail page and again on the checkout page. It depends on your city and your selected product.
          The delivery timelines will be clearly indicated for each product on the main product detail page and again on the checkout page. It depends on your city and your selected product.
        </p>
        <CButton href="#">Request to join Event</CButton>
      </div>
    </div>
  );
};

export default GridView;
