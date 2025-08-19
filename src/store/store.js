import { configureStore } from '@reduxjs/toolkit';
import inspectionsReducer from './inspectionsSlice';

export const store = configureStore({
  reducer: {
   // voeg de inspectionsReducer toe aan de store, zodat de inspecties beheerd kunnen worden.
    inspections: inspectionsReducer,
  },
});