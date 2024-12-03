import React, { useState, useEffect } from "react";
import "../fonts/stylesheet.css";
import { AiFillMacCommand } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { LuCalendarDays } from "react-icons/lu";
import { TbClipboardList } from "react-icons/tb";
import { PiTimerBold } from "react-icons/pi";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { LuBellRing } from "react-icons/lu";
import { ImSearch } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoGoal } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { SlOptionsVertical } from "react-icons/sl";
import { StarFour } from "phosphor-react";
import { WiStars } from "react-icons/wi";
import {
  addTask,
  editTask,
  deleteTask,
  toggleTaskCompletion,
} from "../features/taskSlice.js";
import {
  addGoal,
  toggleCompletion,
  deleteGoal,
  editGoal,
} from "../features/goalsSlice.js";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineCheck } from "react-icons/ai";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  eachDayOfInterval,
  startOfWeek,
  addDays,
  subDays,
  isToday,
} from "date-fns";
import MyTasks from "../components/MyTasks.jsx";

const Dashboard = () => {
  const userName = "Aman";
  const currentDateStatic = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  }).format(currentDateStatic);
  const [currentDate, setCurrentDate] = useState(new Date());
  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({
    start: startOfCurrentMonth,
    end: endOfCurrentMonth,
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [searchTerm, setSearchTerm] = useState("");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedMonth = format(currentDateStatic, "MMMM yyyy");
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const toggleCategory = (id) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, isOpen: !cat.isOpen } : cat))
    );
  };
  const [reminders, setReminders] = useState([
    { id: 1, title: "Assess any new risks identified in the morning meeting." },
    { id: 2, title: "Prepare presentation slides for team briefing." },
  ]);

  const removeReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const startOfCurrentWeek = startOfWeek(currentDate);
  const daysInWeek = Array.from({ length: 7 }, (_, index) =>
    addDays(startOfCurrentWeek, index)
  );
  useEffect(() => {
    setSelectedMonth(currentDate.getMonth());
  }, [currentDate]);

  const handlePrevWeek = () => {
    const newDate = subDays(currentDate, 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = addDays(currentDate, 7);
    setCurrentDate(newDate);
  };

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    const newDate = new Date(currentDate);
    newDate.setMonth(newMonth);
    newDate.setDate(1);
    setCurrentDate(newDate);
  };

  const goals = useSelector((state) => state.goals);
  const dispatch = useDispatch();
  const [newGoal, setNewGoal] = useState("");
  const tasks = useSelector((state) =>
    state.tasks.categories.flatMap((category) => category.tasks)
  );
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [dropdownOpenT, setDropdownOpenT] = useState(null);
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
    setNewTaskName(""); // Clear input
  };

  const handleToggleCompletion = () => {
    dispatch(toggleTaskCompletion(taskId));
  };
  const handleAddGoal = () => {
    if (newGoal.trim() !== "") {
      dispatch(
        addGoal({
          id: goals.length + 1,
          goal: newGoal,
          priority: "Med",
          completed: false,
        })
      );
      setNewGoal("");
    }
  };

  const handleEditGoal = (id) => {
    const updatedGoal = prompt(
      "Edit your goal:",
      goals.find((goal) => goal.id === id)?.goal
    );
    if (updatedGoal !== null && updatedGoal.trim() !== "") {
      dispatch(editGoal({ id, updatedGoal }));
    }
  };
  const handleToggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };
  const handleToggleDropdownT = (id) => {
    setDropdownOpenT(dropdownOpenT === id ? null : id);
  };
  return (
    <div className="Geist bg-grid-pattern overflow-y-auto h-screen bg-[#f5f5fc]  w-full flex flex-col items-start justify-start">
      <Sidebar />
      <main className="md:pl-[270px] p-4 w-full">
        <div className="w-full flex md:flex-row flex-col justify-between items-center">
          <p className="text-gray-600 text-xs md:text-base font-medium w-full">
            {formattedDate}
          </p>
          <div className="Geist hidden sm:w-[220px] outline-none pl-2 md:w-[280px] lg:w-[340px] xl:w-[420px] border border-[#d7d7d7] caret-gray-600 placeholder:text-[#68686F] bg-white focus:border-gray-500 h-10 text-sm text-gray-500 rounded-[7px] md:flex items-center justify-center">
            <ImSearch className="flex text-[#68686F] items-center justify-center ml-2" />
            <input
              maxLength={30}
              type="text"
              placeholder="Search for tasks..."
              className="h-full w-full px-3 outline-none bg-white focus:border-gray-500 flex items-center justify-center rounded-[7px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <h1 className="mt-2 text-2xl md:text-3xl font-semibold">
          Hello, {userName}
        </h1>
        <h1 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 via-cyan-500 to-purple-500 SF-black font-medium">
          How can I help you today?
          <WiStars
            className="inline-block text-cyan-600 mb-3 ml-1"
            size={36}
            weight="fill"
          />
        </h1>
        <div className="Geist w-full md:hidden outline-none pl-2 md:w-[280px] lg:w-[340px] xl:w-[420px] border border-[#d7d7d7] caret-gray-600 placeholder:text-[#68686F] bg-white focus:border-gray-500 h-10 text-sm text-gray-500 rounded-[7px] flex items-center justify-center">
          <ImSearch className="flex text-[#68686F] items-center justify-center ml-2" />
          <input
            maxLength={30}
            type="text"
            placeholder="Search for tasks..."
            className="h-full w-full px-3 outline-none bg-white focus:border-gray-500 flex items-center justify-center rounded-[7px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full flex-col lg:flex-row lg:flex items-start mt-4 gap-4">
          <div className="w-full flex flex-col lg:w-[55%]">
            <MyTasks/>
            <div className="min-h-64 md:h-auto p-2 py-3 md:p-4 mt-4 w-full bg-white rounded-[10px] border-2 border-[#EDEDEE]">
              {/* Header */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center">
                  <GoGoal className="text-blue-600" />
                  <span className="ml-2 text-base">Today's Top 3 Goals</span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => alert("Add Goal functionality")}
                    className="text-sm text-blue-600 font-medium"
                  >
                    + Add Goal
                  </button>
                </div>
              </div>
              <div className="mt-4 px-2 mb-1 w-full flex text-[9px] sm:text-xs text-gray-500">
                <span className="w-[75%] md:w-[80%] ml-1">Task</span>
                <span className="w-[15%] md:w-[10%]">Priority</span>
                <span className="w-[10%] text-right mr-1">Actions</span>
              </div>
              <div className="mt-1 space-y-2 px-2">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`w-full flex items-center p-2 border rounded-md ${
                      goal.completed
                        ? "bg-gray-200"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <div className="w-[75%] md:w-[80%] flex items-center">
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() => dispatch(toggleCompletion(goal.id))}
                        className="mr-2"
                      />
                      <span
                        className={`text-xs md:text-sm truncate ${
                          goal.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {goal.goal}
                      </span>
                    </div>
                    <div className="w-[15%] md:w-[10%] text-xs flex items-center justify-center">
                      <span
                        className={`px-2 py-1 rounded-[5px] ${
                          goal.priority === "High"
                            ? "bg-red-100 text-red-600 border border-red-700"
                            : goal.priority === "Med"
                            ? "bg-yellow-100 text-yellow-700 border border-yellow-500"
                            : "bg-green-100 text-green-600 border border-green-600"
                        }`}
                      >
                        {goal.priority}
                      </span>
                    </div>
                    <div className="w-[10%] text-right flex justify-end items-center">
                      <div className="relative">
                        <SlOptionsVertical
                          className="text-gray-500 cursor-pointer"
                          size={16}
                          onClick={() => handleToggleDropdown(goal.id)}
                        />
                        {dropdownOpen === goal.id && (
                          <div className="absolute text-xs right-0 mt-1 bg-white border rounded-md shadow-lg z-10 w-24 space-y-2 p-2">
                            <button
                              onClick={() => {
                                handleEditGoal(goal.id);
                                setDropdownOpen(null);
                              }}
                              className="block w-full px-2 py-1 text-left text-gray-700 hover:bg-gray-100"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                dispatch(deleteGoal(goal.id));
                                setDropdownOpen(null);
                              }}
                              className="block w-full px-2 py-1 text-left text-gray-700 hover:bg-gray-100"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => {
                                dispatch(toggleCompletion(goal.id));
                                setDropdownOpen(null);
                              }}
                              className="block w-full px-2 py-1 text-left text-gray-700 hover:bg-gray-100"
                            >
                              Complete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[45%] mt-4 lg:mt-0">
            <div className="h-auto p-4 w-full bg-white rounded-[10px] border-2 border-[#EDEDEE]">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <PiTimerBold className="text-blue-600" size={24} />
                  <span className="ml-2 text-base">Reminders</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-center">
                  <span className="text-xs">Today</span>
                  <span className="text-gray-400 text-xs ml-1">
                    • {reminders.length}
                  </span>
                </div>
                <ul className="mt-2 space-y-2">
                  {reminders.map((reminder) => (
                    <li
                      key={reminder.id}
                      className="flex items-center justify-between p-3 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      <span className="truncate text-xs md:text-sm">
                        {reminder.title}
                      </span>
                      <div className="flex text-xs items-center space-x-2">
                        <LuBellRing className="text-blue-500 text-xs hover:text-gray-700 cursor-pointer" />
                        <RiDeleteBin6Line
                          className="text-red-600 text-xs hover:text-red-700 cursor-pointer"
                          onClick={() => removeReminder(reminder.id)}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="h-60 mt-4 p-4 w-full bg-white rounded-[10px] border-2 border-[#EDEDEE]">
              <div className="flex items-center justify-between ml-1">
                <div className="flex items-center mr-4">
                  <LuCalendarDays className="text-blue-600" />
                  <span className="ml-2 text-base">Calendar</span>
                </div>
                <div className="flex items-center">
                  <select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="outline-none text-sm w-[100px]"
                  >
                    {months.map((month, index) => (
                      <option key={index} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex h-16 mt-2 items-center justify-between">
                <button
                  onClick={handlePrevWeek}
                  className="text-blue-600 h-10 font-semibold px-2 py-1 mr-2 border border-gray-300 rounded-md"
                >
                  {"<"}
                </button>
                <div className="flex flex-wrap overflow-hidden gap-1 text-xs ">
                  {daysInWeek.map((day) => (
                    <div
                      key={day}
                      className={`text-center text-xs p h-9 sm:h-9 md:h-10 w-8 sm:w-9 md:w-10 flex flex-col items-center justify-center 2xl:w-[55px] border border-gray-200 rounded-md hover:bg-blue-100 cursor-pointer ${
                        isToday(day)
                          ? "bg-blue-500 hover:bg-blue-500 text-white"
                          : ""
                      }`}
                    >
                      <span>{format(day, "E")}</span>
                      <span className="font-medium">{format(day, "dd")}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleNextWeek}
                  className="text-blue-600 h-10 font-semibold px-2 py-1 ml-2 border border-gray-300 rounded-md"
                >
                  {">"}
                </button>
              </div>

              {/* Event Section */}
              <div className="mt-4 bg-gray-100 p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Meeting with VP</span>
                  <span className="text-gray-500">10:00 - 11:00 am</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm">
                    Google Meet
                  </span>
                  <span className="ml-2 text-gray-500">+2</span>
                  <div className="ml-2 flex space-x-1">
                    <img
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                      className="w-6 h-6 rounded-full"
                      alt="user"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/men/2.jpg"
                      className="w-6 h-6 rounded-full"
                      alt="user"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-48 mt-4 w-full bg-white rounded-[10px] border-2 border-[#EDEDEE]"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
