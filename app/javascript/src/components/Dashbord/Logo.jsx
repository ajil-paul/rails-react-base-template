import React from "react";

const Logo = ({ isExpanded }) => (
  <img
    alt="Logo"
    className="h-8 w-auto"
    src={
      isExpanded
        ? "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        : "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=700"
    }
  />
);

export default Logo;
