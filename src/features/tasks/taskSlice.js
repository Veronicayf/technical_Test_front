import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:3000';

// Función para obtener el token actual desde localStorage
const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Fetch tasks
export const fetchTasks = createAsyncThunk('task/fetchTasks', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/task`, getAuthConfig());
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Crear una nueva tarea
export const addTask = createAsyncThunk('task/addTask', async (newTask, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/task`, newTask, getAuthConfig());
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Actualizar el estado de una tarea
export const updateTaskStatus = createAsyncThunk('tasks/updateTaskStatus', async ({ id, status }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/task/${id}`, { status }, getAuthConfig());
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Eliminar una tarea
export const deleteTask = createAsyncThunk('task/deleteTask', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/task/${id}`, getAuthConfig());
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Filtro por tarea completada
export const fetchCompletedTasks = createAsyncThunk('task/fetchCompletedTasks', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/task/completed`, getAuthConfig());
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
        completedTasks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch tasks
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch tasks.";
            })

            // Fetch completed tasks
            .addCase(fetchCompletedTasks.fulfilled, (state, action) => {
                state.completedTasks = action.payload;
            })
            .addCase(fetchCompletedTasks.rejected, (state, action) => {
                state.error = action.payload || "Failed to fetch completed tasks.";
            })

            // Agregar tarea
            .addCase(addTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to add task.";
            })

            // Actualizar status
            .addCase(updateTaskStatus.fulfilled, (state, action) => {
                const taskIndex = state.tasks.findIndex(task => task.id === action.payload.id);
                if (taskIndex >= 0) {
                    state.tasks[taskIndex].status = action.payload.status;
                }
            })
            .addCase(updateTaskStatus.rejected, (state, action) => {
                state.error = action.payload || "Failed to update task status.";
            })

            // Eliminar tarea
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.error = action.payload || "Failed to delete task.";
            });
    },
});

export default taskSlice.reducer;
