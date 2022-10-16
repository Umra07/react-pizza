import React, { useCallback } from 'react';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filters/slice';
import { fetchPizzas } from '../redux/slices/pizza/slice';
import { useAppDispatch } from '../redux/store';
import { selectFilters } from '../redux/slices/filters/selectors';
import { selectPizza } from '../redux/slices/pizza/selectors';


import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import SortPopup from '../components/Sort';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilters);
  const { items, status } = useSelector(selectPizza);
  const sortType = sort.sortProperty;

  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const pageHandler = (p: number) => {
    dispatch(setCurrentPage(p));
  };

  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? searchValue : '';

    dispatch(fetchPizzas({ currentPage: String(currentPage), category, sortBy, order, search }));

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((_, i) => <Skeleton className="pizza-block" key={i} />);
  const pizzas = items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories index={categoryId} changeCategoryHandler={onClickCategory} />
        <SortPopup sort={sort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === 'error' ? (
        <div className="content__error">
          <h2>
            An error has occurred <span>😕</span>
          </h2>
          <p>Unfortunately, we were unable to find any pizzas. Try again in a little while.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      {status === 'error' ? (
        <div></div>
      ) : (
        <Pagination currentPage={currentPage} pageHandler={pageHandler} />
      )}
    </div>
  );
};

export default Home;
