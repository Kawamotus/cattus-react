import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Login from "./Login";
import AnimalList from './Pages/AnimalList';


const App = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path='/' />
        <Route path='login' element={<Login />}/>
        <Route path='animalList' element={<AnimalList />} />
        <Route path='animalRegister' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
