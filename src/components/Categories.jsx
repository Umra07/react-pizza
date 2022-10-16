import React from 'react';

const Categories = ({ index, changeCategoryHandler }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            key={i}
            onClick={() => {
              changeCategoryHandler(i);
            }}
            className={index === i ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
