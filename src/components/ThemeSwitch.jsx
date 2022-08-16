import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import ContrastIcon from '@mui/icons-material/Contrast';
const ThemeSwitch = ({ mode, toggle }) => {
  return (
    <FormControlLabel
      control={<Switch color="secondary" onChange={toggle} />}
      label={
        <ContrastIcon
          color={mode === 'dark' ? 'secondary' : ''}
          aria-label="dark mode switch"
          sx={{ transform: 'translateY(4px)' }}
        />
      }
      labelPlacement="start"
    />
  );
};

export default ThemeSwitch;
