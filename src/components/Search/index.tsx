import React from 'react';
import { useRef, useState, useCallback } from 'react';

import debounce from 'lodash.debounce';

import classes from './Search.module.scss';
import searchSvg from '../../assets/img/search-icon.svg';
import clearSvg from '../../assets/img/clear-icon.svg';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filters/slice';

const Search = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 300),
    [],
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onClickClear = () => {
    setValue('');
    inputRef.current?.focus(); 
  };

  return (
    <div className={classes.root}>
      <img src={searchSvg} alt="Search icon" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Margherita..."
        onChange={onChangeInput}
        value={value}
      />
      {value && <img onClick={onClickClear} src={clearSvg} alt="Clear input" />}
    </div>
  );
};

export default Search;
