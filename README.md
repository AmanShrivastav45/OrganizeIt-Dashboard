# OrganizeIt 

OrganizeIt is a responsive task management application interface built with **ReactJS**, **Tailwind CSS**, and **Redux** for state management. This project is designed to help users organize and prioritize their tasks effectively with features like goal creation, editing, deletion, reordering, and filtering along with reminders.

## Features

- **Responsive Design**: Fully optimized for devices of all sizes, ensuring a seamless user experience.
- **Add, Edit, and Delete Goals**: Create new goals, modify existing ones, or remove goals as needed.
- **Reorder Goals**: Drag and drop functionality to rearrange tasks based on priority or preference.
- **Event Calendar**: Integrated calendar to visualize and manage tasks by date.
- **Reminders**: Set reminders to ensure important tasks are not missed.
- **Filter by Status**:
  - Upcoming
  - In Progress
  - Completed

## Tech Stack

- **Frontend**: ReactJS, Tailwind CSS
- **State Management**: Redux

## Installation and Setup

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/AmanShrivastav45/OrganizeIt-Dashboard.git
   ```

2. Navigate to the project directory:
   ```bash
   cd OrganizeIt-Dashboard
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:3000`.

## Folder Structure

```
OrganizeIt-Dashboard/
├── public/         # Static assets
├── src/            # Application source code
│   ├── components/ # Reusable components
│   ├── pages/      # Page components
│   ├── features/   # Redux setup for state management
│   ├── fonts/      # Custom fonts used
│   ├── styles/     # Tailwind CSS custom styles
│   ├── modals/     # Confirmation Modals
│   └── utils/      # Utility functions
├── package.json    # Project configuration and dependencies
└── README.md       # Project documentation
```

