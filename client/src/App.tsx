import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Home from './pages/Home';
import Project from './components/Project/Project';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './pages/Projects';
import Ideas from './pages/Ideas';

function App() {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <main className=''>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/:id' element={<Project />} />
          <Route path='/ideas' element={<Ideas />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
