import React from "react";

const PageLoader = () => (
  <div className="flex items-center justify-center w-full bg-white">
    <div className="text-gray-500 spinner">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} />
      ))}
    </div>
  </div>
);

export default PageLoader;
