import React from 'react';
import { Box, Typography, Checkbox, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { priority } from './priority';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from './todos';

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const expired = (todo) => {
    return new Date() > new Date(todo.date);
  };
  const checkColor = (color) => {
    if (expired(todo)) {
      return 'error';
    }
    return color;
  };
  const checkTextColor = (color) => {
    if (expired(todo)) {
      return 'error.main';
    }
    if (color === 'primary') {
      return '';
    }
    return `${color}.main`;
  };

  const base = priority[todo.priority];
  const color = checkColor(base);
  const text = checkTextColor(color);

  return (
    <Box>
      <Typography variant="subtitle2">Deadline: {todo.date}</Typography>
      <Grid container>
        <Grid xs={0.7}>
          <Checkbox
            color={color}
            onClick={() => dispatch(toggleTodo({ id: todo.id }))}
          />
        </Grid>
        <Grid xs={11.3}>
          <Typography
            variant="body1"
            sx={{
              color: `${expired(todo) ? 'error.main' : 'text.primary'}`,
              textDecoration: `${todo.completed && 'line-through'}`,
              wordBreak: 'break-all',
              '&::first-letter': {
                textTransform: 'uppercase',
                fontSize: '1.4rem',
                color: text,
              },
            }}
          >
            {todo.text}
          </Typography>
        </Grid>
      </Grid>
      <Box textAlign="right">
        <IconButton
          color={color}
          onClick={() => {
            dispatch(deleteTodo({ id: todo.id }));
          }}
          aria-label="delete"
        >
          <DeleteForeverIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Todo;
