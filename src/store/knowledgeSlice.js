import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchKnowledge as apiFetchKnowledge } from "../services/api";

export const fetchKnowledge = createAsyncThunk("knowledge/fetchAll", async () => {
  return await apiFetchKnowledge();
});

const knowledgeSlice = createSlice({
  name: "knowledge",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKnowledge.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchKnowledge.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload || [];
      })
      .addCase(fetchKnowledge.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Laden mislukt";
      });
  },
});

export default knowledgeSlice.reducer;

export const selectKnowledgeItems = (s) => s.knowledge.items;
export const selectKnowledgeStatus = (s) => s.knowledge.status;
export const selectKnowledgeError  = (s) => s.knowledge.error;