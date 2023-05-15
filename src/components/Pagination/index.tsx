import React from 'react';
import classes from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  pageHandler: (p: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, pageHandler }) => {
  const allPages = [1, 2, 3];

  const nextPageHandler = () => {
    currentPage < 3 ? pageHandler(currentPage + 1) : pageHandler(1);
  };

  const previousPageHandler = () => {
    currentPage > 1 ? pageHandler(currentPage - 1) : pageHandler(3);
  };

  return (
    <div className={classes.root}>
      <svg
        className={`${classes.arrow} ${classes.left}`}
        onClick={previousPageHandler}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg">
        <title />
        <g data-name="1" id="_1">
          <path d="M353,450a15,15,0,0,1-10.61-4.39L157.5,260.71a15,15,0,0,1,0-21.21L342.39,54.6a15,15,0,1,1,21.22,21.21L189.32,250.1,363.61,424.39A15,15,0,0,1,353,450Z" />
        </g>
      </svg>
      <ul>
        {allPages.map((page) => (
          <li
            key={page}
            onClick={() => pageHandler(page)}
            className={page === currentPage ? classes.active : ''}>
            {page}
          </li>
        ))}
      </ul>
      <svg
        className={`${classes.arrow} ${classes.right}`}
        onClick={nextPageHandler}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg">
        <title />
        <g data-name="1" id="_1">
          <path d="M202.1,450a15,15,0,0,1-10.6-25.61L365.79,250.1,191.5,75.81A15,15,0,0,1,212.71,54.6l184.9,184.9a15,15,0,0,1,0,21.21l-184.9,184.9A15,15,0,0,1,202.1,450Z" />
        </g>
      </svg>
    </div>
  );
};

export default Pagination;
