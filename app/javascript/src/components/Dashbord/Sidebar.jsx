import React, { useState } from "react";

import { Layout, Button, Avatar, Dropdown } from "antd";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useLogout } from "reactQuery/useAuthApi";

import { NAV_LINKS } from "./constants";
import Logo from "./Logo";

const { Sider } = Layout;

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { t } = useTranslation();

  const { userDetails } = window;

  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const toggleMenu = () => setIsCollapsed(prev => !prev);

  return (
    <div className="relative">
      <Sider
        className="mr-0.5 h-screen overflow-y-auto"
        collapsed={isCollapsed}
        collapsedWidth={60}
        theme="light"
      >
        <div className="flex flex-col h-full px-2 pb-4 transition-all bg-white grow gap-y-5">
          <div className="flex items-center h-16">
            <Logo isExpanded={!isCollapsed} />
          </div>
          <ul className="flex flex-col h-full gap-y-1" role="list">
            {NAV_LINKS.map(({ Icon, label, path }) => (
              <li key={label}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    classNames(
                      "hover:bg-gray-50  hover:text-indigo-600 py-2 transition-all overflow-hidden group flex rounded-md text-sm leading-6 font-semibold",
                      {
                        "pl-3 pr-0": isCollapsed,
                        "px-2": !isCollapsed,
                        "text-gray-500": !isActive,
                        "bg-gray-50 text-indigo-600": isActive,
                      }
                    )
                  }
                >
                  <Icon className="flex flex-shrink-0 " size={20} />
                  <span
                    className={classNames("transition-all duration-300", {
                      "w-auto  pl-3": !isCollapsed,
                      "w-0 overflow-hidden": isCollapsed,
                    })}
                  >
                    {label}
                  </span>
                </NavLink>
              </li>
            ))}
            <li
              className={classNames(
                "py-2 transition-all mt-auto flex rounded-md text-sm leading-6 font-medium hover:bg-gray-50",
                { "pl-2 pr-0": isCollapsed, "px-2": !isCollapsed }
              )}
            >
              <Dropdown
                overlayClassName="w-32"
                placement="right"
                trigger="hover"
                menu={{
                  items: [
                    {
                      key: 1,
                      label: <>{t("account.logout")}</>,
                      onClick: logout,
                      disabled: isLoggingOut,
                    },
                  ],
                }}
              >
                <button className="flex items-center">
                  <Avatar>{userDetails.firstName.charAt(0)}</Avatar>
                  <span
                    className={classNames("transition-all duration-300", {
                      "w-auto  pl-3": !isCollapsed,
                      "w-0 overflow-hidden": isCollapsed,
                    })}
                  >
                    {t("account.account")}
                  </span>
                </button>
              </Dropdown>
            </li>
          </ul>
        </div>
      </Sider>
      <Button
        className="absolute z-10 border-none top-6 -right-12"
        icon={
          isCollapsed ? (
            <AiOutlineMenuUnfold size={18} />
          ) : (
            <AiOutlineMenuFold size={18} />
          )
        }
        onClick={toggleMenu}
      />
    </div>
  );
};

export default Sidebar;
