import './App.css';
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CompletedTaskList from './components/TaskListCompleted';

const App = () => {

  return (
    <div className='bg-white text-white'>
      <div className='flex item-center justify-center h-full'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<TaskList />} />
            <Route path='/create-task' element={<TaskForm />} />
            <Route path='/edit-task/:id' element={<TaskForm />} />
            <Route path='/completed-tasks' element={<CompletedTaskList />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App