import React, { useState } from "react";
import { Link} from "react-router-dom";

import {
  faHome,
  faGear,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import NavLinks from "./NavLinks/NavLinks";
const Navigation = () => {
  const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Home", icon: faHome, link: "/" },
    { title: "Settings", icon: faGear, link: "/settings" },
    { title: "About Us", icon: faPeopleGroup, link: "/about", gap: true },
  ];
  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-dark-purple h-screen p-5 pt-8 relative duration-300 `}
    >
      <img
        src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <Link to={"/"}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/1024px-Google_Contacts_icon.svg.png"
            className={` w-10 cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Contact Manager
          </h1>
        </Link>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <NavLinks menu={Menu} open={open} key={index}/>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
