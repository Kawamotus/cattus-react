import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from './Components/Sidebar';
import Login from "./Pages/Login";
import PetRegistration from './Pages/PetRegistration';
import Home from './Pages/Home';
import EmployeeRegister from './Pages/EmployeeRegister';
import PetList from './Pages/PetList';
import EmployeeList from './Pages/EmployeeList';


const App = () => {

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='login' element={<Login />}/>
          <Route path='petList' element={<PetList />} />
          <Route path='petRegister' element={<PetRegistration />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path='employeeRegister' element={<EmployeeRegister />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
