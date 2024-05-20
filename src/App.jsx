import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';


const App = () => {
  return (

    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path='/' />
        <Route path='/registerAnimal' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
