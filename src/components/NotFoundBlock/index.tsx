import React from 'react';
import classes from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={classes.root}>
      <h1>
        <span>😕</span>
        <br />
        Page is not Found
      </h1>
      <p className={classes.description}>
        Unfortunately, this page is not available in our store
      </p>
    </div>
  );
};

export default NotFoundBlock;
