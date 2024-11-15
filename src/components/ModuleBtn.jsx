import React from "react";
import { Link } from "react-router-dom";

const ModuleBtn = ({ name, icon, url }) => {
  return (
    <Link
      to={url}
      className="flex h-full flex-col items-center bg-blue-600 text-white p-5 gap-3 rounded-lg"
    >
      {icon}
      {name}
    </Link>
  );
};

export default ModuleBtn;