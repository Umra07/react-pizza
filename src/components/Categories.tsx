import React from 'react';

type CategoriesProps = {
  index: number,
  changeCategoryHandler: (i: number) => void
}

const Categories: React.FC<CategoriesProps> = React.memo(({ index, changeCategoryHandler }) => {
  const categories: string[] = ['All', 'Meat', 'Vegeterian', 'Grill', 'Spicy'];

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
});

export default Categories;
