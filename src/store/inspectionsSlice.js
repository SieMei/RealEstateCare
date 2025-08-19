import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchInspections } from '../services/api';
import { mapInspection } from '../models/inspectionModel';

// de asyncThunk handelt de API-call af en de verschillende statussen (pending, fulfilled, rejected).
export const loadInspections = createAsyncThunk('inspections/load', async () => {
  const data = await fetchInspections();
  // gebruik het model om de data te mappen en valideren.
  return data.map(mapInspection);
});

const inspectionsSlice = createSlice({
  name: 'inspections',
  initialState: {
    list: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  // extraReducers reageert op de acties van de createAsyncThunk.
  extraReducers: (builder) => {
    builder
      .addCase(loadInspections.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadInspections.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.sort((a, b) => b.date - a.date);
      })
      .addCase(loadInspections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default inspectionsSlice.reducer;