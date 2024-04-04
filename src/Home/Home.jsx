import { useContext, useEffect, useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import TaskCard from '../Components/TaskCard/TaskCard';
import { AuthContext } from '../Provider/AuthProviders';
import axiosInstance from '../Global/AxiosInstance';


const Home = () => {
    const [showForm, setShowForm] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');


    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 4;

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error.message))
    }

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    useEffect(() => {
        fetchTasks();
    }, [])

    const handleSubmitTask = async (event) => {
        event.preventDefault();
        const form = event.target;
        const task = form.task.value;
        const email = user?.email;
        const addedTask = { task, email }
        try {
            const response = await axiosInstance.post('/addTask', addedTask);
            fetchTasks();
            event.target.reset();
            toggleForm();
        } catch (error) {
            console.log('failed to add task', error.message);
        }
    }

    const fetchTasks = async () => {
        try {
            const response = await axiosInstance.get(`/myTasks/${user?.email}`);
            if (!response.data || response.data.length === 0) {
                // console.log('No tasks found');
                
                return;
            }
            setTasks(response.data);
        } catch (error) {
            console.log('Failed to fetch tasks', error.message);
        }
    };

    const handleDelete = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((tasks) => tasks.id !== taskId))
        fetchTasks();
    };

    const handleUpdate = async (updatedTask) => {
        try {
            await axiosInstance.put(`/updateTask/${updatedTask._id}`, updatedTask);
            fetchTasks();
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };


    // if (!tasks || tasks.length === 0) {
    //     return <div >No tasks available.</div>;
    // }

    // Calculate index of the last task on the current page
    const indexOfLastTask = currentPage * tasksPerPage;
    // Calculate index of the first task on the current page
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    // Slice the tasks array to get tasks for the current page
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    // Logic to handle page navigation
    const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
        <div className='h-screen bg-[#597a67] lg:pt-20 '>
            <div className='max-w-5xl h-full lg:h-[492px] relative mx-auto bg-[#35413c] '>
                <div className='flex justify-between items-center px-6 pt-6'>
                    <div className='flex space-x-4 items-center'>
                        <div>
                            <h1 className='text-base lg:text-lg font-bold text-slate-100'>{user?.displayName}</h1>
                            <button onClick={handleLogOut} className='border text-xl mt-2 px-5 py-1 rounded-md bg-slate-600 hover:bg-slate-700 text-white duration-300'><IoLogOutOutline /></button>
                        </div>
                    </div>
                    <div>
                        <button className='text-white text-5xl flex items-center' onClick={toggleForm}><CiCirclePlus />
                            <span className='text-lg uppercase hidden md:block font-semibold'>Add Task</span>
                        </button>
                    </div>
                </div>
                <hr className='border-1 mt-5' />
                {showForm && (
                    <div className="max-w-5xl absolute top-0 w-full mx-auto bg-[#35413c] p-6">
                        <h2 className="text-xl font-bold mb-4 text-white">Add Task</h2>
                        <form onSubmit={handleSubmitTask}>
                            <div className="mb-4">
                                <textarea id="description" name="task" className="resize-none mt-1 p-2 border text-white font-semibold w-full h-[582px] md:h-[866px] lg:h-[336px] bg-transparent"></textarea>
                            </div>
                            <button type="submit" className="bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded-md">Save</button>
                            <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md ml-2" onClick={toggleForm}>Cancel</button>
                        </form>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                )}

                {
                    tasks.length === 0 ?
                        <h1 className='text-center text-slate-200 text-2xl mt-5'>Task Not Available</h1>
                        :
                        <div className='mt-5 px-6 space-y-3'>
                            {currentTasks.map(task => (
                                <TaskCard fetchTasks={fetchTasks} key={task?._id} task={task} onDelete={handleDelete} onUpdate={handleUpdate} />
                            ))}
                        </div>

                }
                <div className="mt-5 flex justify-center">
                    {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (_, i) => (
                        <button
                            key={i}
                            className={`mx-1 px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-gray-500 text-slate-200' : 'bg-gray-200 hover:bg-gray-400'}`}
                            onClick={() => paginate(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
