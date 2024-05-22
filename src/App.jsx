import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Login from "./Login";


const App = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path='/' />
        <Route path='login' element={<Login />}/>

        <Route path='/registerAnimal' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
