import React from "react";
import "./search.styles.scss";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchInput() {
  return (
    <form className="search__input">
      <SearchIcon className="search__icon" />
      <InputBase
        className="input"
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
      />
    </form>
  );
}
