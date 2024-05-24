import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from './Components/Sidebar';
import Login from "./Pages/Login";
import AnimalList from './Pages/AnimalList';
import PetRegistration from './Pages/PetRegistration';


const App = () => {

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <Routes>
          <Route path='/' />
          <Route path='login' element={<Login />}/>
          <Route path='animalList' element={<AnimalList />} />
          <Route path='animalRegister' element={<PetRegistration />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
