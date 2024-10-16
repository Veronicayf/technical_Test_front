import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import CompletedTaskList from './components/TaskListCompleted';

const App = () => {

  return (
    <div className='bg-white text-black'>
      <div className='flex item-center justify-center h-full'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<RegisterForm />} />
            <Route path='/login' element={<LoginForm />} />

            {/* Rutas protegidas */}
            <Route
              path='/task' element={
                <ProtectedRoute>
                  <TaskList />
                </ProtectedRoute>
              }
            />
            <Route
              path='/create-task'
              element={
                <ProtectedRoute>
                  <TaskForm />
                </ProtectedRoute>
              }
            />
            <Route
              path='/completed-tasks'
              element={
                <ProtectedRoute>
                  <CompletedTaskList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App