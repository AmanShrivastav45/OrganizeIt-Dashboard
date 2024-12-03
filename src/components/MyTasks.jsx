import React, { useState } from "react";
import "../fonts/stylesheet.css";
import { TbClipboardList } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { SlOptionsVertical } from "react-icons/sl";

import {
  addTask,
  editTask,
  deleteTask,
  toggleTaskCompletion,
} from "../features/taskSlice.js";

const MyTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) =>
    state.tasks.categories.flatMap((category) => category.tasks)
  );
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Low");

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      name: newTaskName,
      priority: newTaskPriority,
      completed: false,
    };
    dispatch(addTask(newTask));
    setNewTaskName("");
  };

  const handleEditTask = (taskId) => {
    const updatedTask = {
      id: taskId,
      name: "Updated Task",
      priority: "High",
    };
    dispatch(editTask(updatedTask));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleToggleCompletion = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  };

  return (
    <div className="md:min-h-84 h-auto w-full p-2 py-3 md:p-4 bg-white rounded-[10px] border-2 border-[#EDEDEE]">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center">
          <TbClipboardList className="text-blue-600" />
          <span className="ml-2 text-base">My Tasks</span>
        </div>
        <button
          className="text-sm text-blue-600 font-medium"
          onClick={handleAddTask}
        >
          + Add Task
        </button>
      </div>
      <div className="mt-1 space-y-2 px-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`w-full flex items-center p-2 border rounded-md ${
              task.completed ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <div className="w-[75%] md:w-[80%] flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleCompletion(task.id))}
                className="mr-2"
              />
              <span
                className={`text-xs md:text-sm truncate ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.name}
              </span>
            </div>
            <div className="w-[15%] md:w-[10%] text-xs flex items-center justify-center">
              <span
                className={`px-2 py-1 rounded-[5px] ${
                  task.priority === "High"
                    ? "bg-red-100 text-red-600 border border-red-700"
                    : task.priority === "Med"
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-500"
                    : "bg-green-100 text-green-600 border border-green-600"
                }`}
              >
                {task.priority}
              </span>
            </div>
            <div className="flex items-center justify-between cursor-pointer px-2 py-2 rounded-md">
              <div className="relative">
                <SlOptionsVertical
                  className="text-gray-500 cursor-pointer"
                  size={16}
                  onClick={() => setDropdownOpen(task.id)}
                />
                {dropdownOpen === task.id && (
                  <div className="absolute text-xs right-0 mt-1 bg-white border rounded-md shadow-lg z-10 w-24 space-y-2 p-2">
                    <button
                      onClick={() => handleEditTask(task.id)}
                      className="block w-full px-2 py-1 text-left text-gray-700 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="block w-full px-2 py-1 text-left text-gray-700 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleToggleCompletion(task.id)}
                      className="block w-full px-2 py-1 text-left text-gray-700 hover:bg-gray-100"
                    >
                      {task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
