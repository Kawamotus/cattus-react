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
import CameraList from './Pages/CameraList';
import PetDetail from './Pages/PetDetail';
import CameraDetail from './Pages/CameraDetail';
import Error404 from './Pages/Error404';
import Supplies from './Pages/Supplies';
import Activities from './Pages/Activities';
import PetAlert from './Pages/PetAlert';
import EmployeeDetail from './Pages/EmployeeDetail';


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
          <Route path='employeeDetail/:id' element={<EmployeeDetail />} />
          <Route path='camera' element={<CameraList />} />
          <Route path='petDetail/:id' element={<PetDetail />} />
          <Route path='cameraDetail/:id' element={<CameraDetail />} />
          <Route path='supplies' element={<Supplies />} />
          <Route path='activities' element={<Activities />} />
          <Route path='petAlert' element={<PetAlert />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
