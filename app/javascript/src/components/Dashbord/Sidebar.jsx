import React, { useState } from "react";

import { Layout, Button } from "antd";
import classNames from "classnames";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { NavLink } from "react-router-dom";

import { NAV_LINKS } from "./constants";
import Logo from "./Logo";

const { Sider } = Layout;

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleMenu = () => setIsCollapsed(prev => !prev);

  return (
    <div className="relative">
      <Sider
        className="mr-0.5 h-screen overflow-y-auto"
        collapsed={isCollapsed}
        collapsedWidth={60}
        theme="light"
      >
        <div className="flex flex-col px-2 pb-4 transition-all bg-white grow gap-y-5">
          <div className="flex items-center h-16">
            <Logo isExpanded={!isCollapsed} />
          </div>
          <nav className="flex flex-col flex-1">
            <ul className="flex flex-col flex-1 gap-y-1" role="list">
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
            </ul>
          </nav>
        </div>
      </Sider>
      <Button
        className="absolute z-10 border-none top-6 -right-12"
        icon={
          isCollapsed ? (
            <AiOutlineMenuUnfold size={24} />
          ) : (
            <AiOutlineMenuFold size={24} />
          )
        }
        onClick={toggleMenu}
      />
    </div>
  );
};

export default Sidebar;
