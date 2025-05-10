📝 Project Report: React + Spring Boot Todo List App
🔧 Technologies Used
  Frontend (React)
    ReactJS (Functional Components)
    React Router (react-router-dom) for page navigation
    CSS or styled components for design
    Icons from libraries like react-icons
    Fetch API for backend communication

Backend (Spring Boot)
Spring Boot
  Spring Data JPA for database access
  MySQL as the database
  RESTful APIs to handle CRUD operations
  Spring Security (optional) for authentication

🔐 User Authentication Flow
  Registration:
    Form collects username and password
    Sends POST request to backend
    Backend stores user in the MySQL database

Login:
    User submits credentials
    Backend verifies user
    On success, frontend stores user info (e.g., in localStorage or React state)
    Redirects to /todo route
✅ Todo Functionality
Create Todo:
  User enters task title & description
  Sends POST request to backend with user ID
  Backend saves it in the DB and returns updated list

View Todos:
  Fetches user's todos from backend using their ID
  Displays list with title, description, and status

Update Status:
  Checkbox or toggle to mark task as "completed"
  Sends PUT request to update task

Edit Todo:
  Fills form with existing task data
  Sends PUT request to backend

Delete Todo:
  Sends DELETE request with task ID

🧠 React Hooks Used
    useState – Manage form inputs, task list, etc.
    useEffect – Fetch tasks on load or update
    useNavigate – Redirect after login/register
    


