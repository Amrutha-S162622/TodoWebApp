import { useState, useEffect } from "react";
import './TodoPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';

function TodoPage() {
    const [tasks, setTasks] = useState([]);  
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState(null);  
    const [editingTask,setEditingTask] = useState(null);
    const [isEditFormVisible,setIsEditFormVisible] = useState(false);
    const [selectedTodoStatus, setSelectedTodoStatus] = useState("All");

    const userId = localStorage.getItem('userId'); 
    console.log('User ID:', userId);  

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }
    const handleDescription = (event) => {
        setDescription(event.target.value);
    }
    const handleStatusChange = async (taskId, selectedValue) => {
        const updatedStatus = selectedValue === 'true' ? 'completed' : 'pending';
    
        try {
            const response = await fetch(`http://localhost:8080/todos/${taskId}?status=${updatedStatus}`, {
                method: 'PUT',
            });
    
            if (!response.ok) {
                throw new Error('Failed to update status');
            }
    
            const updatedTask = await response.json();
    
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? { ...task, status: updatedTask.status } : task
                )
            );
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };


    const handleDelete = async (taskId) => {
        try{
              const deletetodo = await  fetch(`http://localhost:8080/delete/${taskId}`, {
                    method: 'DELETE'
                })
                if (!deletetodo.ok) {
                    throw new Error('Failed to delete task');
                }
                setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        }catch(error){
            console.error("Error deleting task:", error);
        };
    };
    useEffect(() => {
        const fetchTodos = async () => {    
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8080/list/${userId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch tasks: ${response.status}`);
                }
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTodos();
    }, []);
    
    

    const handleAdd = async () => {
        let error = true;
        if(error){
            const newTask = {
                title,
                description,
                status: 'pending', 
            };
            if (!userId) {
                setError('User ID is not available. Please log in again.');
                return;
            }
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8080/todos/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTask),
                });
        
                if (!response.ok) {
                    throw new Error('Failed to add task');
                }
        
                const data = await response.json();
        
                setTasks(prevTasks => [...prevTasks, data]);
                setTitle('');
                setDescription('');
            } catch (error) {
                setError('Error adding task.');
                console.error("Error adding task:", error);
            } 
        }else{
            setTasks(null);
        }
    };    
    const handleSaveEdit = async () => {
        try {
            const update = await fetch(`http://localhost:8080/edit/${editingTask.id}`,{
                method: 'PUT',
                headers : {
                    'content-Type' : 'application/json',
                },
                body: JSON.stringify({title: title,description: description}),
            });
            setEditingTask(null);
            setIsEditFormVisible(false);
            setTitle('');
            setDescription('');

        }catch(error){
            setError(error.message);
        }
    };
    const handleEdit = (task) => {
        setEditingTask(task);
        setTitle(task.title);
        setDescription(task.description);
        setIsEditFormVisible(true);
    }
    const handleCancelEdit = () => {
        setEditingTask(null);
        setIsEditFormVisible(false);
        setTitle('');
        setDescription('');
    };

    const statusCat = ['All','completed','pending'];
    const filterTodo = selectedTodoStatus === "All"
    ? tasks
    : tasks.filter((task) => task.status === selectedTodoStatus);
    const handleLogout = () => {
        localStorage.removeItem('userId'); 
        window.location.href = '/'; 
    };

    return (
        <div className="todo-container">
            <h1>My Tasks</h1>
            <div className="logout-container">
                <button className="logout-btn" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />Logout
                </button>
            </div>
            <div className="input-area">
                <input
                    id="title-input" 
                    type="text"
                    value={title}
                    onChange={handleTitle}
                    placeholder="Your Task Title"
                />
                <textarea
                    value={description}
                    onChange={handleDescription}
                    placeholder="Task description"
                />
               {!isEditFormVisible && (
                    <button onClick={handleAdd} type="button" className="addbtn">Add</button>
                )}
                {isEditFormVisible && editingTask && (
                        <div className="edit-buttons">
                            <button onClick={handleSaveEdit} className="delbtn">
                            <FontAwesomeIcon icon={faPen} />  Update
                            </button>
                            <button onClick={handleCancelEdit} className="canbtn">
                            <FontAwesomeIcon icon={faTimes} />  Cancel
                            </button>
                      </div>
                )}
            </div>

            <div className="table-container">
                <h2>To-Do List</h2>
                <div className="filter-container">
                    <label htmlFor="tdodStatus">Filter By Status</label>
                    <select 
                        value={selectedTodoStatus} 
                        onChange={(e) => setSelectedTodoStatus(e.target.value)}
                    >
                        {statusCat.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                {filterTodo.length === 0 ? (<p id="nop">No task found</p>) : (
                    <table border={1} className="task-table">
                        <tr>
                            <th>Task</th>
                            <th>Status Changer</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {filterTodo.map((task) => (
                            <tr key={task.id}  className={task.status === 'completed' ? 'completed-row' : 'pending-row'}>
                                <td>{task.title}</td>
                                <td>
                                    <select value={task.status === 'completed' ? 'true' : 'false'} onChange={(e) => handleStatusChange(task.id, e.target.value)} className="status-select">
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                    </select>
                                </td>
                                <td>{task.description}</td>
                                <td>{task.status}</td>
                                <td>
                                    <button className="icon-button"  type="button" onClick={() => handleDelete(task.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                    <button className="icon-button pen" onClick={() => handleEdit(task)}><FontAwesomeIcon icon={faPen}/></button>
                                </td>
                            </tr>
                        ))}
                    </table>
                )}
            </div>
        </div>
    );
}

export default TodoPage;
