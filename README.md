# SO_Mint
# 🧩 Linux Mint Web Simulation — V2

A fully interactive simulation of a Linux Mint desktop environment built with **HTML, CSS, JavaScript (frontend)** and **Node.js (backend)**.

This is **Version 2 (V2)**, a major update with a new login screen, dynamic backend-based authentication, windowed applications, task management, and session simulation.

---

## 🚀 Features

### ✅ General
- Desktop-style interface (Linux Mint inspired)
- Draggable and resizable windows
- Start menu with animated buttons and app launchers
- Taskbar with open app indicators
- Clock and date display

### 🔐 Login System
- Random 12h clock display on login screen
- Full-screen background image (`assets/background.jpg`)
- User profile avatar (`assets/ahh.jpg`)
- Custom password and user fields
- Backend-authenticated login using `/auth/users.json`
- Animated loading screen before entering the desktop
- Fake shutdown, restart, and logout buttons from the Start Menu

### 🧠 Applications (Inside `apps/`)
- **Terminal** (basic simulation of `ping`, `neofetch`, `apt-get`, etc.)
- **Notepad** with Node.js file saving (real `.txt` files)
- **Music Player** with dynamic playlist support
- **Task Manager** showing simulated RAM/CPU usage and active apps
- **File Manager** integrated with local storage (via Node.js backend)

### 💾 Backend (Node.js)
- Authentication using `auth/users.json`
- File saving, listing and deletion in `/archivos/`
- Fully working `server.js` with Express API routes:
  - `POST /login`
  - `POST /guardar`
  - `GET /listar`
  - `DELETE /eliminar/:nombre`

---

## 🛠 Setup Instructions

1. **Clone the project**:

```bash
git clone https://github.com/your-username/linux-mint-sim.git
cd linux-mint-sim
