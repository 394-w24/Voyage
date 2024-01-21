import { useNavigate, useLocation } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import StarRateIcon from "@mui/icons-material/StarRate";
import Filter from "../Filter/Filter";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div className="sidebar">
      <List>
        <ListItem button onClick={() => handleNavigation("/home")}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="HOME" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/recommendation")}>
          <ListItemIcon>
            <StarRateIcon />
          </ListItemIcon>
          <ListItemText primary="WISHLIST" />
        </ListItem>
        {location.pathname === "/home" && <Filter />}
      </List>
    </div>
  );
};

export default Sidebar;
