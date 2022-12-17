import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Home from './pages/Home';
import Board from './pages/Board';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <main className=''>
        <Routes>
          <Route path='/' />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route path='/boards' element={<Home />} />
          <Route path='/boards/:id' element={<Board />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
