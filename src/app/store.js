import { configureStore } from "@reduxjs/toolkit";
import taskReducer from '../features/tasks/taskSlice'
import authReducer from '../features/auth/authSlice'

const store = configureStore({
    reducer: {

        tasks: taskReducer,
        auth: authReducer
    }
})

export default store