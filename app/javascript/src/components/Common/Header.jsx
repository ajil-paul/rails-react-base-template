import routes from "constants/routes";

import React from "react";

import { Breadcrumb, Layout, Typography } from "antd";
import { RiHome3Line } from "react-icons/ri";

import Search from "./Search";

const { Header: AntdHeader } = Layout;

const HOME_BREADCRUMB = [
  {
    title: <RiHome3Line className="pt-0.5" size={18} />,
    path: routes.home,
  },
];

const Header = ({ title = "", breadcrumbs = [], leftAction, rightAction }) => {
  const breadcrumbList = HOME_BREADCRUMB.concat(breadcrumbs);

  return (
    <AntdHeader className="bg-white mb-0.5 px-6 py-2 h-auto">
      {breadcrumbList.length > 1 && <Breadcrumb items={breadcrumbList} />}
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-x-2">
          <Typography.Title className="p-0 m-0" level={3}>
            {title}
          </Typography.Title>
          {leftAction}
        </div>
        <div className="flex items-center gap-x-2">
          <Search />
          {rightAction}
        </div>
      </div>
    </AntdHeader>
  );
};

export default Header;
