import { configureStore } from "@reduxjs/toolkit";
import goalsReducer from "./features/goalsSlice";
import tasksReducer from "./features/taskSlice"

const store = configureStore({
  reducer: {
    goals: goalsReducer,
    tasks: tasksReducer,
  },
});

export default store;
