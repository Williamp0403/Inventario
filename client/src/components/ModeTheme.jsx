import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import { useThemeContext } from '../context/ThemeContext.jsx';

const ITEM_HEIGHT = 48;
const themeOptions = {
  Light: "light",
  Dark: "dark"
};

export default function ModeTheme() {
  const { setThemeMode } = useThemeContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState(localStorage.getItem("theme") || themeOptions.Dark);

  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", selectedOption === themeOptions.Dark);
    localStorage.setItem("theme", selectedOption);
  }, [selectedOption]);

  const handleMenuItemClick = (option) => {
    setSelectedOption(option);
    setThemeMode(option); // Actualizar el contexto
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="theme-selector"
        onClick={handleClick}
      >
        {selectedOption === themeOptions.Light ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {Object.entries(themeOptions).map(([key, value]) => (
          <MenuItem key={key} selected={selectedOption === value} onClick={() => handleMenuItemClick(value)}>
            {key}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
