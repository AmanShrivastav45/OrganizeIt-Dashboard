// src/features/tasks/tasksSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {
      id: 1,
      category: "IN PROGRESS",
      count: 2,
      isOpen: true,
      tasks: [
        {
          id: 1,
          name: "One-on-One Meeting",
          priority: "High",
          dueDate: "Today",
        },
        {
          id: 2,
          name: "Send a summary email to stakeholders",
          priority: "Low",
          dueDate: "3 days left",
        },
      ],
    },
    {
      id: 2,
      category: "TO DO",
      count: 1,
      isOpen: false,
      tasks: [
        {
          id: 3,
          name: "Prepare project report",
          priority: "Med",
          dueDate: "5 days left",
        },
      ],
    },
    {
      id: 3,
      category: "UPCOMING",
      count: 1,
      isOpen: false,
      tasks: [
        {
          id: 4,
          name: "Plan quarterly team meeting",
          priority: "Low",
          dueDate: "Next week",
        },
      ],
    },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { categoryId, task } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.tasks.push(task);
        category.count++;
      }
    },
    editTask: (state, action) => {
      const { taskId, updatedTask } = action.payload;
      for (const category of state.categories) {
        const taskIndex = category.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          category.tasks[taskIndex] = { ...category.tasks[taskIndex], ...updatedTask };
          break;
        }
      }
    },
    deleteTask: (state, action) => {
      const { taskId } = action.payload;
      for (const category of state.categories) {
        const taskIndex = category.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          category.tasks.splice(taskIndex, 1);
          category.count--;
          break;
        }
      }
    },
    toggleTaskCompletion: (state, action) => {
      const { taskId } = action.payload;
      for (const category of state.categories) {
        const task = category.tasks.find(task => task.id === taskId);
        if (task) {
          task.completed = !task.completed;
          break;
        }
      }
    },
    toggleCategoryOpen: (state, action) => {
      const { categoryId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.isOpen = !category.isOpen;
      }
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleTaskCompletion,
  toggleCategoryOpen,
} = tasksSlice.actions;

export default tasksSlice.reducer;
