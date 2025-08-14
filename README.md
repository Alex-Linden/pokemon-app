# Pokémon Trainer App

A full-stack Pokémon-catching game built with **Node.js/Express**, **Prisma**, **PostgreSQL**, and **React** + **Material UI**.
Users can register/login, browse a Pokémon library, attempt to catch Pokémon with a gamified capture system, view their profile and caught Pokémon, and release Pokémon.

---

## 📜 Overview

This app combines backend authentication, database persistence, and an interactive frontend to create a fun and dynamic experience for Pokémon fans. The capture mechanic is chance-based, influenced by each Pokémon’s **capture rate** (and in the future, the trainer’s experience level).

**Key Features:**
- **Authentication**: Secure JWT-based login & registration.
- **Pokémon Library**: Browse all available Pokémon.
- **Catch Mechanic**: Chance-based capture with animations.
- **Profile Page**: View and manage caught Pokémon.
- **Release Pokémon**: Option to remove Pokémon from your collection.
- **Gamified UI**: Animated catch attempts and real-time updates.

---

## 📂 Project Structure

```

pokemon-app/
│
├── pokemon-api/          # Backend (Node.js/Express + Prisma + PostgreSQL)
│   ├── prisma/           # Prisma schema & migrations
│   ├── src/              # API routes, controllers, services, middleware
│   ├── package.json
│   └── ...
│
├── pokemon-ui/           # Frontend (React + Material UI)
│   ├── src/
│   │   ├── components/   # Reusable UI components (cards, modal, animations)
│   │   ├── context/      # Auth context
│   │   ├── pages/        # Main app pages
│   │   └── services/     # API calls
│   ├── package.json
│   └── ...
│
└── README.md

````

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd pokemon-app
````

---

### 2️⃣ Backend Setup (`pokemon-api`)

```bash
cd pokemon-api
npm install
```

**Configure Environment Variables**
Create a `.env` file:

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/pokemon_trainer_db?schema=public"
JWT_SECRET="your-secret-key"
PORT=3000
```

**Run Database Migrations:**

```bash
npx prisma migrate dev
```

**Seed Database (Optional):**

```bash
npx prisma db seed
```

**Start Backend:**

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup (`pokemon-ui`)

```bash
cd ../pokemon-ui
npm install
```

**Configure Environment Variables**
Create a `.env` file:

```env
VITE_API_URL="http://localhost:3000/api"
```

**Start Frontend:**

```bash
npm run dev
```

---

### 4️⃣ Run Both Together

At the root of the project, you can use [concurrently](https://www.npmjs.com/package/concurrently) to start both:

```bash
npm install concurrently --save-dev
```

In the **root `package.json`**:

```json
"scripts": {
  "dev": "concurrently \"npm run dev --prefix pokemon-api\" \"npm run dev --prefix pokemon-ui\""
}
```

Run:

```bash
npm run dev
```

---

## 🎮 Usage

1. **Register/Login** to create an account.
2. **Browse Pokémon** in the library.
3. **Click a Pokémon Card** to open details in a modal.
4. **Attempt to Catch** — watch the animation and see if you succeed!
5. **View Caught Pokémon** in your profile.
6. **Release Pokémon** from your profile when desired.

---

## 🚀 Future Improvements

* Add trainer stats to influence catch chance.
* Implement item usage (Poké Balls with different bonuses).
* Leaderboard for most Pokémon caught.
* Mobile-friendly layout improvements.

```

