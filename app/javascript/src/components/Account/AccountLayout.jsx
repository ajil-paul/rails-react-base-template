import React from "react";

import classnames from "classnames";

const AccountLayout = ({ children, title = "", className = "" }) => (
  <div
    className={classnames(
      "flex flex-col justify-center flex-1 py-8 sm:px-6 lg:px-8 bg-gray-50 dark:*: min-h-screen",
      className
    )}
  >
    <div className="mb-8 sm:mx-auto sm:w-full sm:max-w-md">
      <img
        className="w-auto h-10 mx-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      />
      <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
        {title}
      </h2>
    </div>
    {children}
  </div>
);

export default AccountLayout;
