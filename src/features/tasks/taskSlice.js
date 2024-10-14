import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Usamos la variable de entorno para el backend
const API_URL = 'http://localhost:3000';

// Thunks para manejar peticiones a la API

// Obtener todas las tareas
export const fetchTasks = createAsyncThunk('task/fetchTasks', async () => {
    const response = await axios.get(`${API_URL}/task`);
    return response.data;
});

// Crear una nueva tarea
export const addTask = createAsyncThunk('task/addTask', async (newTask) => {
    const response = await axios.post(`${API_URL}/task`, newTask);
    return response.data;
});

// Editar una tarea
export const editTask = createAsyncThunk('task/editTask', async (updatedTask) => {
    const { id, title, review } = updatedTask;
    const response = await axios.put(`${API_URL}/task/${id}`, { title, review });
    return response.data;
});

// Eliminar una tarea
export const deleteTask = createAsyncThunk('task/deleteTask', async (id) => {
    await axios.delete(`${API_URL}/task/${id}`);
    return id;
});

const taskSlice = createSlice({
    name: 'task',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch tasks
            .addCase(fetchTasks.fulfilled, (state, action) => {
                return action.payload;  // Actualiza el estado con las tareas obtenidas del backend
            })
            // Add task
            .addCase(addTask.fulfilled, (state, action) => {
                state.push(action.payload);  // Añade la nueva tarea al estado
            })
            // Edit task
            .addCase(editTask.fulfilled, (state, action) => {
                const { id, title, review } = action.payload;
                const task = state.find(task => task.id === id);
                if (task) {
                    task.title = title;
                    task.review = review;
                }
            })
            // Delete task
            .addCase(deleteTask.fulfilled, (state, action) => {
                const taskIndex = state.findIndex(task => task.id === action.payload);
                if (taskIndex !== -1) {
                    state.splice(taskIndex, 1);  // Elimina la tarea del estado
                }
            });
    }
});

export default taskSlice.reducer;

