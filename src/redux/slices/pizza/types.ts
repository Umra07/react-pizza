export type Pizza = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[]; 
  types: number[];
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}