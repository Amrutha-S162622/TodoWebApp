Report on the React To-Do List Project

1. Project Overview:

   This is a React-based To-Do List application designed to allow users to manage their tasks.

   The application supports basic CRUD (Create, Read, Update, Delete) operations, and allows users to filter tasks by their status (completed or pending).

   The front-end is built using React, while the back-end is powered by a Spring Boot API.

2. Key Features:

   Task Management:

        Users can add new tasks with a title and description.
        
        Tasks can be marked as completed or pending using a checkbox.

            Checking the box marks the task as completed.
            
            Unchecking the box marks it as pending.
        
        Tasks can be edited and updated.
        
        Tasks can be deleted.
   
   Task Filtering
   
       Users can filter tasks based on their status (completed or pending).
   
   User Authentication:
   
       Users can log in and register to create and manage their personal to-do list.
   
   Backend Integration:
   
        The backend is built with Spring Boot, which handles task creation, updates, deletion, and fetching tasks for each user.
        
        The app connects to the backend using fetch API calls for data retrieval and updates.
      
3. Front-End (React) Implementation:

    Components:

        TodoPage.js: The main component displaying the to-do list, with functionality to add, edit, update, delete, and filter tasks.
        
        LoginPage.js: Handles user login functionality.
        
        RegistrationPage.js: Handles user registration functionality.
        
        Home.js: Acts as the main landing page for navigation to the login and registration pages.
    
    State Management:
  
        The application uses React's useState and useEffect hooks to manage state.
      
        useState is used to store and manage task data, user data, form inputs, and other UI elements.
      
        useEffect is used to fetch the list of tasks from the backend API when the component mounts.
      
    Task Management:
  
        Tasks are displayed in a table, with each task showing the title, description, status, and available actions (edit, delete, change status).
      
        The status of each task can be updated to "completed" or "pending" using a checkbox:

            ✅ Checked → Completed
            
            ⬜ Unchecked → Pending
      
    Editing and Deleting Tasks:
  
        Users can edit tasks by clicking the edit button, which pre-fills a form with the task's current details.
      
        Tasks can be deleted using a trash icon button.
      
4. Back-End (Spring Boot) Implementation:
    API Endpoints:

          POST /todos/{userId}: Creates a new to-do task for a specific user.
          
          GET /list/{userId}: Fetches the list of tasks for a specific user.
          
          PUT /todos/{taskId}: Updates the status of a task.
          
          PUT /edit/{taskId}: Edits an existing task (title and description).
          
          DELETE /delete/{taskId}: Deletes a task.
   Database:

        The backend uses MySQL as the database to store user data and tasks.

5. UI/UX Design:
   
        The app uses a clean and simple UI with input fields for task title and description.
        
        Tasks are displayed in a table with action buttons for editing, deleting, and changing task status.
        
        The filter section allows users to filter tasks by their status (All, Completed, Pending).
        
        The "Logout" button is placed at the top-right corner for easy access.
6. Conclusion:
   
        This project demonstrates the ability to create a dynamic and interactive to-do list application using React for the front-end and Spring Boot for the back-end.
        
        It covers essential web development skills, including CRUD operations, state management, API integration, and user authentication.
