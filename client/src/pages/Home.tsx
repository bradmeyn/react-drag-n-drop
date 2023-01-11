import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import NewProjectModal from '../components/Project/NewProjectModal';

const Home = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
    { id: 3, name: 'Project 3' },
  ]);

  return (
    <div className='text-start p-3 container mx-auto'>
      <div className='flex flex-wrap gap-4 justify-center '></div>
    </div>
  );
};

export default Home;
