import React, { useContext } from 'react';
import { SearchContext } from '../../App';
import { useRef, useState, useCallback } from 'react';

import debounce from 'lodash.debounce';

import classes from './Search.module.scss';
import searchSvg from '../../assets/img/search-icon.svg';
import clearSvg from '../../assets/img/clear-icon.svg';

const Search = () => {
  const { setSearchValue } = useContext(SearchContext);
  const [value, setValue] = useState('');

  const inputRef = useRef();

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 300),
    [],
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onClickClear = () => {
    setValue('');
    inputRef.current.focus();
  };

  return (
    <div className={classes.root}>
      <img src={searchSvg} alt="Search icon" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Маргарита..."
        onChange={onChangeInput}
        value={value}
      />
      {value && <img onClick={onClickClear} src={clearSvg} alt="Clear input" />}
    </div>
  );
};

export default Search;
