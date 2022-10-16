import React, { useContext } from 'react';
import { useEffect, useState, useRef } from 'react';

import axios from 'axios';
import qs from 'qs';

import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filtersSlice';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort, { sortList } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();

  const { categoryId, sort, currentPage } = useSelector((state) => state.filters);
  const sortType = sort.sortProperty;

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(SearchContext);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const pageHandler = (p) => {
    dispatch(setCurrentPage(p));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? searchValue : '';

    axios
      .get(
        `https://630e1e63109c16b9abf50e09.mockapi.io/pizzas?p=${currentPage}&l=4&${category}&sortBy=${sortBy}&order=${order}&search=${search}`,
      )
      .then((response) => {
        setItems((prevArr) => response.data);
        window.scrollTo(0, 0);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // if (isMounted.current) {
    //   const params = {
    //     categoryId,
    //     sortBy: sort.sortProperty,
    //     currentPage,
    //   };

    //   const queryString = qs.stringify(params);

    //   navigate(`/?${queryString}`);
    // }

    // const params = qs.parse(window.location.search.substring(1));
    // const sortObj = sortList.find((obj) => obj.sortProperty === params.sortBy);
    // dispatch(
    //   setFilters({
    //     searchValue: params.search,
    //     categoryId: Number(params.categoryId),
    //     currentPage: Number(params.currentPage),
    //     sort: sortObj,
    //   }),
    // );

    fetchPizzas();

    // isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.categoryId),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       }),
  //     );
  //   }
  //   isMounted.current = true;
  // }, []);

  const skeletons = [...new Array(4)].map((_, i) => <Skeleton className="pizza-block" key={i} />);
  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories index={categoryId} changeCategoryHandler={onClickCategory} />
        <Sort sortType={sortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} pageHandler={pageHandler} />
    </div>
  );
};

export default Home;
