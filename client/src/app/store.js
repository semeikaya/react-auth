import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import applicationSlice from "../features/application/applicationSlice";

export const store = configureStore({
  reducer: { todosReducer, applicationSlice },
});
