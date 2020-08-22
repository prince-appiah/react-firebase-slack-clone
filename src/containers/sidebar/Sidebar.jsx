import React, { useState, useEffect } from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";

import SidebarOption from "../../components/sidebarOption/SidebarOption";
import db from "../../firebase/firebase";
import "./Sidebar.css";
import { useStateValue } from "../../store/stateProvider";

const Sidebar = () => {
  const [{ user }] = useStateValue();

  const [channels, setChannels] = useState([]);

  useEffect(() => {
    // runs once when sidebar option component loads
    db.collection("rooms").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name }))
      );
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-info">
          <h2>Slack User</h2>
          <h3>
            <FiberManualRecordIcon /> {user?.displayName}
          </h3>
        </div>
        <CreateIcon />
      </div>
      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & People" />
      <SidebarOption Icon={DraftsIcon} title="Saved Items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channels" />
      <SidebarOption Icon={PeopleAltIcon} title="People & User Groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File Browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      <SidebarOption Icon={AddIcon} title="Channels" addChannelOption />

      {/* Connect to database and list all channels using SidebarOption --> mapping */}
      {channels.map((channel) => (
        <SidebarOption title={channel.name} id={channel.id} key={channel.id} />
      ))}
    </div>
  );
};

export default Sidebar;
