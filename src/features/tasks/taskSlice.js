import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:3000';

export const fetchTasks = createAsyncThunk('task/fetchTasks', async () => {
    const response = await axios.get(`${API_URL}/task`);
    return response.data;
});

// Crear una nueva tarea
export const addTask = createAsyncThunk('task/addTask', async (newTask) => {
    const response = await axios.post(`${API_URL}/task`, newTask);
    return response.data;
});


// Actualizar el estado de una tarea
export const updateTaskStatus = createAsyncThunk(
    'tasks/updateTaskStatus',
    async ({ id, status }) => {
        const response = await axios.put(`${API_URL}/task/${id}`, { status });
        return response.data;
    }
);

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
            //update status
            .addCase(updateTaskStatus.fulfilled, (state, action) => {
                const taskIndex = state.findIndex(task => task.id === action.payload.id);
                if (taskIndex >= 0) {
                    state[taskIndex].status = action.payload.status;
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

