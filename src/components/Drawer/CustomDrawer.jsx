import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import StarRateIcon from '@mui/icons-material/StarRate';
import { purple } from '@mui/material/colors';

const CustomDrawer = ({ drawerWidth }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <List>

        <ListItemButton>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Preferences" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <StarRateIcon />
          </ListItemIcon>
          <ListItemText primary="Recommendations" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
