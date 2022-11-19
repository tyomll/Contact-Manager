import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const NavLinks = ({ menu, open}) => {
  return (
    <Link to={menu.link} >
      <li
        className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${menu.gap ? "mt-9" : "mt-2"} `}
      >
        <FontAwesomeIcon icon={menu.icon}></FontAwesomeIcon>
        <span className={`${!open && "hidden"} origin-left duration-200`}>
          {menu.title}
        </span>
      </li>
    </Link>
  );
};

export default NavLinks;
