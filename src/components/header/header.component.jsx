import React from "react";
import "./header.styles.scss";
import SearchInput from "../search/search.component";
import Authentication from "../authentication/authentication.component";

function Header() {
  return (
    <div className="header__container">
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram Logo"
          className="app__headerImage"
        />
        <SearchInput />
        <Authentication />
      </div>
    </div>
  );
}

export default Header;
