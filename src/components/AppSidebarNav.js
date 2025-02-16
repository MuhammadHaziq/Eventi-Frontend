import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
import { CBadge } from "@coreui/react";

export const AppSidebarNav = ({ items }) => {
  const location = useLocation();
  let permissions = [];
  if (localStorage.getItem("eventi")) {
    permissions = jwtDecode(localStorage.getItem("eventi"))?.user?.permissions;
  }

  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    );
  };
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component;
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) => {
          return (
            (permissions || []).filter(
              (ite) => ite.permission === item?.permission
            )?.length > 0 &&
            (item.items ? navGroup(item, index) : navItem(item, index))
          );
        })}
      </Component>
    );
  };

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => {
          return (
            (permissions || []).filter(
              (ite) => ite.permission === item?.permission
            )?.length > 0 &&
            (item.items ? navGroup(item, index) : navItem(item, index))
          );
        })}
    </React.Fragment>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
