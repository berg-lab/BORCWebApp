import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            
            {/* <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link> */}
            {/* use the above commented code to replicated /reports */}
            <Link to="/reports" className="link">
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
            </Link>
            <Link to="/Temprature" className="link">
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Temprature
            </li>
            </Link>
            <Link to="/Temprature" className="link">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Battery Status
            </li>
            </Link>
            <Link to="/Temprature" className="link">
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Scheduling
            </li>
            </Link>
            <Link to="/Temprature" className="link">
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Statistics
            </li>
            </Link>
            <Link to="/Temprature" className="link">
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Settings
            </li>
            </Link>
            <Link to="/Temprature" className="link">
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Connectivity Status
            </li>
            </Link>
            
          </ul>
        </div>
       
        
      </div>
    </div>
  );
}
