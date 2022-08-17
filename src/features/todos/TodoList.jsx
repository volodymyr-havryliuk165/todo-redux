import React, { useMemo, useState } from 'react';
import { Stack, Divider, Pagination } from '@mui/material';
import Todo from './Todo';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectAllTodos, selectFilterWord } from './todos';

const PER_PAGE = 5;

const TodoList = () => {
  const [page, setPage] = useState(1);
  const handlePageChange = (e, value) => {
    setPage(value);
  };
  const todos = useSelector(selectAllTodos);
  const filterWord = useSelector(selectFilterWord);
  const filteredTodos = useMemo(() => {
    return todos.filter((t) =>
      t.text.toLowerCase().includes(filterWord.toLowerCase())
    );
  }, [filterWord, todos]);
  return (
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
  );
};

export default TodoList;
