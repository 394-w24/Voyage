import { AppBar, Toolbar, Typography } from '@mui/material';

const CustomAppBar = ({ drawerWidth }) => {
  return (
    <AppBar position="fixed" 
            sx={{ 
              width: `calc(100% - ${drawerWidth}px)`, 
              ml: `${drawerWidth}px`,
              zIndex: (theme) => theme.zIndex.drawer + 1
            }}>
      <Toolbar>
        <Typography 
          variant="h6"
          noWrap
          sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}
        >
          Voyage
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;