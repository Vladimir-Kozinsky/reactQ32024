import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersoneType } from '../../types/types.tsx';

export interface IPeopleState {
  choosedPeople: PersoneType[];
}

const initialState: IPeopleState = {
  choosedPeople: [] as PersoneType[],
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    addPersone: (state, action: PayloadAction<PersoneType>) => {
      const persone = state.choosedPeople.find(
        (per: PersoneType) => per.name === action.payload.name,
      );
      if (!persone) state.choosedPeople.push(action.payload);
    },
    removePersone: (state, action: PayloadAction<string>) => {
      const people = state.choosedPeople.filter(
        (persone: PersoneType) => persone.name !== action.payload,
      );
      // eslint-disable-next-line no-param-reassign
      state.choosedPeople = people;
    },
    unSellectAll: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.choosedPeople = [];
    },
  },
});

export const { addPersone, removePersone, unSellectAll } = peopleSlice.actions;

export default peopleSlice.reducer;
