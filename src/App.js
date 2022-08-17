import React, { useState, useMemo, useCallback } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Grid from '@mui/material/Unstable_Grid2/Grid2.js';
import FilterField from './features/todos/FilterField.jsx';
import FullHeightPaper from './components/FullHeightPaper.jsx';
import NewTodoForm from './features/todos/NewTodoForm.jsx';
import TodoList from './features/todos/TodoList.jsx';
import ThemeSwitch from './components/ThemeSwitch.jsx';
import { getDesign } from './theme.js';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => {
    return createTheme(getDesign(mode));
  }, [mode]);

  const toggleTheme = useCallback(() => {
    return setMode((last) => {
      return last === 'light' ? 'dark' : 'light';
    });
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            minHeight: '100vh',
          }}
          bgcolor="background.default"
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-around"
            alignItems="center"
            component="header"
            p={3}
            spacing={2}
            bgcolor="primary.dark"
            color="primary.contrastText"
          >
            <Box display="flex">
              <Typography variant="h2" component="h2" textAlign="center">
                Todo List
              </Typography>
              <ThemeSwitch mode={mode} toggle={toggleTheme} />
            </Box>
            <FilterField />
          </Stack>
          <Grid
            component="main"
            container
            xs={12}
            py={4}
            px={{ xs: 4, md: 12 }}
            spacing={4}
          >
            <Grid xs={12} lg={6}>
              <FullHeightPaper elevation={4}>
                <NewTodoForm />
              </FullHeightPaper>
            </Grid>
            <Grid xs={12} lg={6}>
              <FullHeightPaper elevation={4}>
                <TodoList />
              </FullHeightPaper>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
