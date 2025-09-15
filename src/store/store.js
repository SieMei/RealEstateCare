import { configureStore } from "@reduxjs/toolkit";
import inspections from "./inspectionsSlice";
import knowledge from "./knowledgeSlice";

export const store = configureStore({
  reducer: { inspections, knowledge },
});