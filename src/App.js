import React, { useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux/es/exports.js';
import { selectAllTodos, selectFilterWord } from './features/todos/todos.js';
import { Typography, Box, Stack, Divider, Pagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Grid from '@mui/material/Unstable_Grid2/Grid2.js';
import FilterField from './features/todos/FilterField.jsx';
import FullHeightPaper from './components/FullHeightPaper.jsx';
import NewTodoForm from './features/todos/NewTodoForm.jsx';
import Todo from './features/todos/Todo.jsx';
import ThemeSwitch from './components/ThemeSwitch.jsx';
import { getDesign } from './theme.js';

const PER_PAGE = 4;

function App() {
  const [mode, setMode] = useState('light');
  const todos = useSelector(selectAllTodos);

  const theme = useMemo(() => {
    return createTheme(getDesign(mode));
  }, [mode]);

  const toggleTheme = useCallback(() => {
    return setMode((last) => {
      return last === 'light' ? 'dark' : 'light';
    });
  }, []);

  const filterWord = useSelector(selectFilterWord);
  const filteredTodos = todos.filter((t) =>
    t.text.toLowerCase().includes(filterWord.toLowerCase())
  );

  const [page, setPage] = useState(1);
  const handlePageChange = (e, value) => {
    setPage(value);
  };
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
                <Stack p={2} spacing={2} divider={<Divider flexItem />}>
                  {filteredTodos
                    .slice((page - 1) * PER_PAGE, page * PER_PAGE)
                    .map((todo) => {
                      return <Todo key={todo.id} todo={todo} />;
                    })}
                  <Pagination
                    count={
                      filteredTodos.length < 1
                        ? 1
                        : Math.ceil(filteredTodos.length / PER_PAGE)
                    }
                    color="secondary"
                    page={page}
                    onChange={handlePageChange}
                    showFirstButton
                    showLastButton
                  ></Pagination>
                </Stack>
              </FullHeightPaper>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
