import React from "react";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpIcon from "@material-ui/icons/Help";

import "./Header.css";
import { useStateValue } from "../../store/stateProvider";

const Header = () => {
  const [{ user }] = useStateValue();

  return (
    <div className="header">
      <div className="header-pull-left">
        {/* User Avatar */}
        <Avatar
          className="header-avatar"
          src={user?.photoURL}
          alt={user?.displayName}
        />
        <AccessTimeIcon alt="user avatar" src="" />
        {/* Clock icon */}
      </div>
      <div className="header-search-icon">
        {/* Search Icon with Input */}
        <input type="text" placeholder="Search...." />
        <SearchIcon />
      </div>
      <div className="header-pull-right">
        {/* Help Icon */}
        <HelpIcon />
      </div>
    </div>
  );
};

export default Header;
