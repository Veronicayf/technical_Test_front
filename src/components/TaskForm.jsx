import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addTask } from '../features/tasks/taskSlice';
import { v4 as uuid } from 'uuid';

const TaskForm = () => {
    const [task, setTask] = useState({
        title: "",
        review: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const tasks = useSelector((state) => state.tasks);


    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (params.id) {
            dispatch(editTask({ ...task, id: params.id }));
        } else {
            dispatch(
                addTask({
                    ...task,
                    id: uuid(),
                })
            );
        }
        navigate('/task');
    };

    useEffect(() => {
        if (params.id) {
            const taskFound = tasks.find((tasks) => tasks.id === params.id);
            if (taskFound) {
                setTask(taskFound);
            }
        }
    }, [params.id, tasks]);

    return (
        <form onSubmit={handleSubmit} className='bg-white shadow-lg border-gray-200 border-2 max-w-sm p-6 rounded-lg mt-10 '>
            <label htmlFor="title" className='block text-lg font-bold mb-2 text-black'> Name task: </label>
            <input
                type="text"
                name="title"
                onChange={handleChange}
                value={task.title || ""}
                placeholder="Write a title"
                className='w-full p-2 rounded-md border border-gray-400 mb-4 bg-gray-100 focus:ring-2 focus:ring-indigo-500 text-black'
            />
            <label htmlFor="review" className='block text-lg font-bold mb-2 text-black'> Description: </label>
            <textarea
                name="review"
                onChange={handleChange}
                value={task.review || ""}
                placeholder="Write a description"
                className='w-full p-2 rounded-md border border-gray-400 bg-gray-100 mb-4 focus:ring-2 focus:ring-indigo-500 text-black'
            />
            <button className='w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700'>SAVE</button>
        </form>
    );
};

export default TaskForm;
