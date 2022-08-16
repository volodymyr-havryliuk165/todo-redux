import React, { useState } from 'react';
import {
  Box,
  FormControl,
  Input,
  InputLabel,
  TextField,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2.js';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useDispatch } from 'react-redux';
import { addTodo } from './todos';
import { priority as priorityList } from './priority';

const NewTodoForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('');

  const submitTodo = (e) => {
    e.preventDefault();
    const future = date > new Date();
    if (future) {
      dispatch(addTodo(text, date, priority));
    }
  };

  return (
    <Box component="form" p={2} spacing={2} onSubmit={submitTodo}>
      <Grid container>
        <Grid xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="todo__text">What to do</InputLabel>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              id="todo__text"
              label="what to do"
              multiline
            />
          </FormControl>
        </Grid>
        <Grid xs={12} sm>
          <FormControl fullWidth>
            <DateTimePicker
              value={date}
              onChange={(date) => setDate(date)}
              label="Deadline"
              id="todo__deadline"
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
        </Grid>
        <Grid xs={12} sm>
          <FormControl fullWidth>
            <InputLabel id="todo__priority-name">Priority</InputLabel>
            <Select
              labelId="todo__priority-name"
              id="todo__priority"
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {Object.keys(priorityList).map((key) => {
                return (
                  <MenuItem value={key} key={key}>
                    {key}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={12} md>
          <FormControl sx={{ height: 1, justifyContent: 'center' }} fullWidth>
            <Button
              variant="outlined"
              type="submit"
              color="success"
              sx={{ height: 1 }}
            >
              Submit
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewTodoForm;
