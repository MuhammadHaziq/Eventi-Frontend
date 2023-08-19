import React from "react";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import avatar8 from "./../../assets/images/avatars/8.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "src/context/AppContext";
import Points from "../../views/customer/CustomerModal/points";
import "../style.scss";

const AppHeaderDropdown = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppState();
  const [pointsVisible, setPointsVisible] = React.useState(false);

  const toggleModel = () => {
    setPointsVisible(!pointsVisible);
  };

  return (
    <>
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <CAvatar src={avatar8} size="md" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">
            Account
          </CDropdownHeader>
          <CDropdownItem
            onClick={() => {
              navigate(`/account/profile/${currentUser?.data?._id}`);
            }}
            className="pointer-cursor"
          >
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
          <CDropdownItem
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="pointer-cursor"
          >
            <CIcon icon={cilLockLocked} className="me-2" />
            Logout
          </CDropdownItem>
          {currentUser?.data?.user_type === "admin" ? (
            <>
              <CDropdownHeader className="bg-light fw-semibold py-2">
                Settings
              </CDropdownHeader>

              <CDropdownItem onClick={toggleModel} className="cursor-pointer">
                <CIcon icon={cilFile} className="me-2" />
                Add Points
              </CDropdownItem>
            </>
          ) : (
            ""
          )}
        </CDropdownMenu>
      </CDropdown>
      {pointsVisible && (
        <Points setVisible={toggleModel} visible={pointsVisible} />
      )}
    </>
  );
};

export default AppHeaderDropdown;
