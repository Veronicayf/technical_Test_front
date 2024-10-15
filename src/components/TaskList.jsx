import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, fetchTasks, updateTaskStatus } from '../features/tasks/taskSlice';
import { Link } from 'react-router-dom';

const TaskList = () => {

    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    };

    const handleStatusToggle = (id, currentStatus) => {
        dispatch(updateTaskStatus({ id, status: !currentStatus }))
    }

    //     return (
    //         <div className='w-4/6'>

    //             <header className='flex justify-between items-center py-4'>
    //                 <h1>Tasks ({tasks.length})</h1>
    //                 <Link to={'/create-task'} className='bg-indigo-600 px-2 py-1 rounded-sm text-sm'>
    //                     Create Task
    //                 </Link>
    //             </header>

    //             {tasks.length === 0 ? (
    //                 <p className="text-center">No tasks available.</p>
    //             ) : (
    //                 <div className='grid grid-cols-3 gap-4'>
    //                     {tasks.map(task => (
    //                         <div key={task.id} className='bg-neutral-800 p-4 rounded-md'>
    //                             <header className='flex justify-between'>
    //                                 <h3>{task.title}</h3>
    //                                 <div className='flex gap-x-2'>
    //                                     <input
    //                                         type="checkbox"
    //                                         checked={task.status} // Mostramos el estado actual
    //                                         onChange={() => handleStatusToggle(task.id, task.status)}
    //                                     />
    //                                     <button
    //                                         onClick={() => handleDelete(task.id)}
    //                                         className='bg-red-500 px-2 py-1 text-xs rounded-md'>
    //                                         Delete
    //                                     </button>
    //                                 </div>
    //                             </header>
    //                             <p>{task.review}</p>
    //                         </div>
    //                     ))}
    //                 </div>
    //             )}
    //         </div>
    //     );
    // };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-6">
            <header className="w-full max-w-4xl mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Task Management</h1>
                <div className="flex justify-between items-center">
                    {/* <h2 className="text-xl text-gray-600">Tasks ({tasks.length})</h2> */}
                    <Link to={'/create-task'} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                        Create Task
                    </Link>
                </div>
            </header>

            {tasks.length === 0 ? (
                <p className="text-gray-600 text-center">No tasks available.</p>
            ) : (
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map(task => (
                        <div key={task.id} className="bg-white shadow-lg rounded-lg p-6">
                            <header className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                                <input
                                    type="checkbox"
                                    checked={task.status} // Mostrar estado actual
                                    onChange={() => handleStatusToggle(task.id, task.status)}
                                    className="form-checkbox h-6 w-6 text-indigo-600"
                                />
                            </header>
                            <p className="text-gray-600 mb-4">{task.review}</p>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
