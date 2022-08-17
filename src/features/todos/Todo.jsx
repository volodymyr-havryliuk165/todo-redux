import React, { useCallback } from 'react';
import { Box, Typography, Checkbox, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { priority } from './priority';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from './todos';

const Todo = ({ todo }) => {
  const dispatch = useDispatch();

  const handleToggle = useCallback(() => {
    dispatch(toggleTodo({ id: todo.id }));
  }, [todo.id, dispatch]);

  const handleDelete = useCallback(() => {
    dispatch(deleteTodo({ id: todo.id }));
  }, [todo.id, dispatch]);

  const base = priority[todo.priority];
  const firstLetter = base === 'primary' ? '' : `${base}.main`;

  return (
    <Box>
      <Typography variant="subtitle2">Deadline: {todo.date}</Typography>
      <Grid container>
        <Grid xs={0.7}>
          <Checkbox color={base} onClick={handleToggle} />
        </Grid>
        <Grid xs={11.3}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              textDecoration: `${todo.completed && 'line-through'}`,
              wordBreak: 'break-all',
              '&::first-letter': {
                textTransform: 'uppercase',
                fontSize: '1.4rem',
                color: firstLetter,
              },
            }}
          >
            {todo.text}
          </Typography>
        </Grid>
      </Grid>
      <Box textAlign="right">
        <IconButton color={base} onClick={handleDelete} aria-label="delete">
          <DeleteForeverIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default React.memo(Todo);
