import React, { useState } from "react";

import { Layout } from "antd";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

import { NAV_LINKS } from "./constants";
import Logo from "./Logo";

const { Sider } = Layout;

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Sider
      collapsible
      className="mr-0.5 h-screen overflow-y-auto"
      collapsed={isCollapsed}
      collapsedWidth={60}
      theme="light"
      onCollapse={() => setIsCollapsed(prev => !prev)}
    >
      <div className="flex grow flex-col px-2 transition-all gap-y-5 bg-white pb-4">
        <div className="flex h-16 items-center">
          <Logo isExpanded={!isCollapsed} />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-1" role="list">
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
  );
};

export default Sidebar;
