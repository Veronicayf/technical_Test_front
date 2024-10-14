import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addTask, editTask, fetchTasks } from '../features/tasks/taskSlice';
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
        navigate('/');
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
        <form onSubmit={handleSubmit} className='bg-zinc-800 max-w-sm p-4'>
            <label htmlFor="title" className='block text-sm font-bold mb-2'> Name task: </label>
            <input
                type="text"
                name="title"
                onChange={handleChange}
                value={task.title || ""}
                placeholder="Write a title"
                className='w-full p-2 rounded-md bg-zinc-600 mb-2'
            />
            <label htmlFor="review" className='block text-sm font-bold mb-2'> Description: </label>
            <textarea
                name="review"
                onChange={handleChange}
                value={task.review || ""}
                placeholder="Write a description"
                className='w-full p-2 rounded-md bg-zinc-600 mb-2'
            />
            <button className='bg-indigo-600 px-2 py-1'>SAVE</button>
        </form>
    );
};

export default TaskForm;
