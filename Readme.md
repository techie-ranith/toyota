# Vehicle and Part Management System

The **Vehicle and Part Management System** is a full-stack web application designed to streamline the tracking and management of vehicles and their associated parts. It enables administrators and service managers to register vehicles, maintain service records, track part inventories, and manage replacements efficiently. The system consists of a **Next.js** frontend for a modern, responsive user interface and an **Express.js** backend that handles data processing and serves as the API layer.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your development machine:

* Node.js (v16 or higher)
* npm
* Git

---

## 📁 Project Structure

```
vehicle-part-management-system/
├── server/           # Express.js API
├── client/          # Next.js frontend
├── README.md          # Project documentation
```

---

## 🔧 Backend (Express.js API)

### Setup Steps

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend root and configure your environment variables:

   ```env
   MONGO_URI=your_mongodb_connection_string (get the mongo db string from github variables)
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

5. The backend API will be available at `http://localhost:5000`

---

## 🌐 Frontend (Next.js)

### Setup Steps

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Next.js development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000` to access the frontend UI.

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
