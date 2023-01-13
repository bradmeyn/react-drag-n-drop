import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import NewProjectModal from '../components/Project/NewProjectModal';
import Navbar from '../components/Home/Navbar';

const Home = () => {
  return (
    <div className='text-start p-3 container mx-auto'>
      <Navbar />

      <div className='flex justify-center mt-8 '>
        <h1 className='p-3 text-6xl font-extrabold tracking-tight  sm:mt-5 sm:text-6xl lg:mt-6 xl:text-8xl text-center'>
          <div className='text-white'>Side projects</div>
          <div className='text-transparent bg-clip-text bg-gradient-to-r from-sky-500  to-purple-500'>
            under control.
          </div>
        </h1>
      </div>
    </div>
  );
};

export default Home;
