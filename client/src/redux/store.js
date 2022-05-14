import { configureStore, } from '@reduxjs/toolkit';
import gameSlice from '../redux/game/gameSlice';

export const store = configureStore({
  reducer: {
    game: gameSlice,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});