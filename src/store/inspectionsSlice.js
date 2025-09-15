
import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {
  fetchInspections as apiFetchInspections,
  fetchInspectionById as apiFetchInspectionById,
  patchInspection as apiPatchInspection,
} from "../services/api";

// statussen
export const STATUS = {
  TOEGEWEZEN: "toegewezen",
  IN_UITVOERING: "in uitvoering",
  INGEDIEND: "ingediend",
  AFGEROND: "afgerond",
  GEARCHIVEERD: "gearchiveerd",
};

// thunks
export const fetchInspections = createAsyncThunk("inspections/fetchAll", async () => {
  return await apiFetchInspections();
});

export const fetchInspectionById = createAsyncThunk("inspections/fetchById", async (id) => {
  return await apiFetchInspectionById(id);
});

// indienen van een inspectie + status naar “ingediend”
export const submitInspection = createAsyncThunk(
  "inspections/submit",
  async ({ id }) => await apiPatchInspection(id, { status: STATUS.INGEDIEND, updatedAt: new Date().toISOString() })
);

// tussentijds opslaan van een concept (draft) + status naar “in uitvoering”
export const saveInspectionDraft = createAsyncThunk(
  "inspections/saveDraft",
  async ({ id, draft }) => {
    return await apiPatchInspection(id, {
      draft,
      status: STATUS.IN_UITVOERING,
      updatedAt: new Date().toISOString(),
    });
  }
);

// entity adapter
const inspectionsAdapter = createEntityAdapter({
  selectId: (i) => i.id,
  sortComparer: (a, b) => (a.updatedAt || "").localeCompare(b.updatedAt || ""),
});

const inspectionsSlice = createSlice({
  name: "inspections",
  initialState: inspectionsAdapter.getInitialState({
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LIST
      .addCase(fetchInspections.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchInspections.fulfilled, (state, action) => {
        state.status = "succeeded";
        inspectionsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchInspections.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Laden mislukt";
      })
      // DETAIL
      .addCase(fetchInspectionById.fulfilled, (state, action) => {
        inspectionsAdapter.upsertOne(state, action.payload);
      })
      // SUBMIT
      .addCase(submitInspection.fulfilled, (state, action) => {
        inspectionsAdapter.upsertOne(state, action.payload);
      })
      // 🆕 DRAFT opgeslagen
      .addCase(saveInspectionDraft.fulfilled, (state, action) => {
        inspectionsAdapter.upsertOne(state, action.payload);
      });
  },
});

export default inspectionsSlice.reducer;

// Selectors
export const {
  selectAll: selectAllInspections,
  selectById: selectInspectionById,
  selectIds: selectInspectionIds,
} = inspectionsAdapter.getSelectors((state) => state.inspections);