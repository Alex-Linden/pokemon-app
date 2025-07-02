# 🧢 Pokémon Trainer Hub

A full-stack Pokémon app demo built with React, Vite, Node, Express, and PostgreSQL to showcase key concepts like authentication, middleware, API communication, protected routes, and Material UI.

---

## ✨ Features

### 🔓 Public Users
- Browse all Pokémon without logging in
- View landing page with call-to-action

### 🔐 Registered Users
- Sign up / log in with email and password
- Catch Pokémon and add them to personal collection
- View profile with caught Pokémon
- Edit profile information (name, email)
- Logout and switch accounts

---

## 🧱 Tech Stack

| Frontend
    React + Vite
    React Router v6
    Context API for auth state
    Axios for HTTP requests
    Material UI (MUI)


| Backend
    Node.js + Express
    Prisma ORM
    PostgreSQL
    JWT for authentication
    bcrypt for password hashing

---

## 🖥️ Frontend Setup (`pokemon-ui`)

### 📁 Folder Structure Highlights

src/
├── components/ # Reusable UI elements
├── pages/ # Route views (Landing, Browse, Profile, etc.)
├── context/ # Auth context
├── services/ # Axios API layers
├── layouts/ # App layout wrapper
├── App.jsx # Routes entry
├── router.jsx # React Router config
├── main.jsx # Vite bootstrap

`### 🚀 Getting Started

```bash
cd pokemon-ui
npm install
npm run dev
```


