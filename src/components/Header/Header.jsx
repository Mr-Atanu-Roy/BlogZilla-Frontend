import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ModalLoginForm, HeaderPopover, Logo, SearchBar } from "../index";


function Header() {
  //check if user is logged in
  const authStatus = useSelector((state) => state.auth.status)

  const navLinks = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Latest Posts",
      link: "post/latest/",
    },
    {
      title: "Write",
      link: "post/write",
    },
    {
      title: "Pricing",
      link: "pricing/",
    }
   
  ];

  return (
    <header className="bg-white flex sticky top-0 left-0 mb-4 w-full items-center justify-between px-6 py-3 shadow-md z-[49]">
      <div className="flex items-center">
        <Link to='/'>
          <Logo/>
        </Link>
        <SearchBar className="ml-2"/>
      </div>

      <div className="flex relative -left-24">
        {navLinks.map((component) => (
            <Link to={component.link} className="block select-none font-medium space-y-1 rounded-md p-3 mx-1 cursor-pointer leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" key={component.title}>
              {component.title}
            </Link>
        ))}
      </div>

      <div className="mr-1" >
        {
          authStatus == false ? <ModalLoginForm/> : <HeaderPopover/>
        }
      </div>     
    </header>
  );
}

export default Header;
