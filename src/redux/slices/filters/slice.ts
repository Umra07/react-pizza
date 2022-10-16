import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltersSliceState, Sort, SortPropertyEnum } from './types';

const initialState: FiltersSliceState = {
  categoryId: 0,
  sort: { name: 'popularity', sortProperty: SortPropertyEnum.RATING_DESC },
  searchValue: '',
  currentPage: 1,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FiltersSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSearchValue, setSortType, setCurrentPage, setFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;