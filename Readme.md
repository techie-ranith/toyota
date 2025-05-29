# Vehicle and Part Management System

The **Vehicle and Part Management System** is a full-stack web application designed to streamline the tracking and management of vehicles and their associated parts. It enables administrators and service managers to register vehicles, maintain service records, track part inventories, and manage replacements efficiently. The system consists of a **Next.js** frontend for a modern, responsive user interface and an **Express.js** backend that handles data processing and serves as the API layer.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your development machine:

* Node.js (v16 or higher)
* npm or yarn
* Git

---

## 📁 Project Structure

```
vehicle-part-management-system/
├── backend/           # Express.js API
├── frontend/          # Next.js frontend
├── README.md          # Project documentation
```

---

## 🔧 Backend (Express.js API)

### Setup Steps

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the backend root and configure your environment variables:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string (get the mongo db string from github variables)
   ```

4. Start the server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. The backend API will be available at `http://localhost:5000`

---

## 🌐 Frontend (Next.js)

### Setup Steps

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the frontend root and configure API URL:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   ```

4. Start the Next.js development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and visit `http://localhost:3000` to access the frontend UI.

---

## 🛠 Features

* Vehicle Registration and Details
* Parts Inventory Management
* Service and Replacement Records
* Search and Filter Capabilities
* Responsive Admin Dashboard UI

---

## 📬 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.
