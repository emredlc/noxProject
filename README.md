# NOX Project

GitHub Repository Link: https://github.com/ardaeray/NoxProject

NOX Project is a frontend-focused web application developed as part of a Web Programming course.  
It represents a modern e-commerce / product ecosystem demo built using React and related technologies.

The project demonstrates component-based architecture, client-side routing, global state management, and integration with a mock backend service.

---

## Tech Stack
- React (Vite)
- React Router
- Context API
- Tailwind CSS
- JSON Server (Mock REST API)
- LocalStorage (client-side persistence)

---

## Project Overview
The application includes:
- Product category pages
- Product detail pages
- User authentication (login / logout)
- Cart and favourites functionality
- Persistent state using LocalStorage

All backend functionality is simulated using JSON Server for development purposes.

---

## Instructions for Using This Repo

Navigate into the project directory:

cd NoxProject

IMPORTANT NOTE:  
If you do not see a package.json file in this directory, the React project is likely located inside a subfolder.

In that case, navigate into the subfolder:

cd noxProject

Make sure you are now in the directory that contains package.json before continuing.

---

Install Dependencies

Once you are inside the directory that contains package.json, run:

npm install

---

Run the Frontend Application (Vite)

Start the development server by running:

npm run dev

If successful, Vite will output something similar to:

Local: http://localhost:5173

Open the application in your browser using the following URL:

http://localhost:5173

---

Run the Mock Backend (JSON Server)

While the frontend is running, open a second terminal window.

From the project root directory (or the directory where dataServer.json is located), run:

npx json-server --watch dataServer.json --port 3001

This starts the mock REST API used by the application.

API Base URL:
http://localhost:3001

Example endpoint:
http://localhost:3001/users

IMPORTANT:
- The frontend and JSON Server must be run in separate terminal windows
- Both services must be running at the same time for the application to work correctly

---

Running State Summary

For the application to function correctly:

Terminal 1 (Frontend – Vite):
npm run dev

Terminal 2 (Mock Backend – JSON Server):
npx json-server --watch dataServer.json --port 3001

---

## Notes
- Authentication and application state are managed using Context API and persisted via LocalStorage.
- JSON Server is used strictly for development and demonstration purposes.
- If port 3001 is already in use, you may start JSON Server on another port, but you must update the API URLs in the frontend accordingly.

---

## License
MIT