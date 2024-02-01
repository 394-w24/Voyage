import "./Header.css";
import MenuIcon from '@mui/icons-material/Menu';
import SortIcon from '@mui/icons-material/Sort';

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="header">
      <button className="toggle-button" onClick={toggleSidebar}>
        {isSidebarOpen ? <SortIcon /> : <MenuIcon />}
      </button>
      <p className="header-title">Voyage</p>
    </div>
  );
};

export default Header;
