import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">M_S</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Vendors</span>
            </li>
          </Link>
          <Link
            to="/products"
            style={{ textDecoration: "none", visibility: "hidden" }}
          >
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <li style={{ visibility: "hidden" }}>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <li style={{ visibility: "hidden" }}>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p style={{ visibility: "hidden" }} className="title">
            USEFUL
          </p>
          <li style={{ visibility: "hidden" }}>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li style={{ visibility: "hidden" }}>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p style={{ visibility: "hidden" }} className="title">
            SERVICE
          </p>
          <li style={{ visibility: "hidden" }}>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li style={{ visibility: "hidden" }}>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li style={{ visibility: "hidden" }}>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p style={{ visibility: "hidden" }} className="title">
            USER
          </p>
          <li style={{ visibility: "hidden" }}>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li style={{ visibility: "hidden" }}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
