import React, { useState } from 'react';
import ContrastField from '../../components/ContrastField';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { setFilterWord } from './todos';

const FilterField = () => {
  const [filterValue, setFilter] = useState('');
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    setFilter(e.target.value);
    dispatch(setFilterWord({ word: e.target.value }));
  };
  return (
    <ContrastField
      label="Filter"
      variant="filled"
      color="secondary"
      value={filterValue}
      onChange={handleFilter}
    />
  );
};

export default FilterField;
