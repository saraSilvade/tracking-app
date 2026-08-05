# Habit Tracker

This is a front-end web application that turns daily task management into an interactive experience. Earn XP, level up, collect gold, and build long-term routines through positive visual feedback.

![app Preview]()

---

## Features

- **Dynamic Stat Tracking:** Real-time visual progress bars for HP, XP, and Gold.
- **Triple-Category Workflow:**
  - **Habits:** Flexible positive/negative habit counters.
  - **Dailies:** Recurring daily challenges.
  - **To-Dos:** One-off high-reward tasks.
- **Leveling Engine:** Automatic level calculations and modal rewards upon reaching 100 XP.
- **In-Game Reward Shop:** Spend gold earned from tasks on items and badges.
- **Persistent Progress:** Automatic browser state persistence via `localStorage`.

---

##  Tech Stack

- **Framework:** [React.js](https://react.dev/) (via Vite)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** React Context API + Custom `localStorage` Hooks
- **Icons:** 

---

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone (https://github.com/saraSilvade/tracking-app.git)
   cd track-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the dev server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

##  Key Architecture & Technical Insights

- **State Persistence:** Implemented custom React synchronization hooks that wrap `localStorage`, ensuring instant UI reactivity alongside cross-session safety.
- **Atomic Progress Logic:** Centralized state management via Context API ensures that task completions trigger synchronized state updates across character stats, level math, and shop inventory simultaneously.