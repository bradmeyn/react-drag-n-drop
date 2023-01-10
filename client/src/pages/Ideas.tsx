import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import NewProjectModal from '../components/Project/NewProjectModal';

const Ideas = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
    { id: 3, name: 'Project 3' },
  ]);

  return (
    <div className='text-start p-3 container mx-auto'>
      <h1 className='font-extrabold text-slate-50 text-2xl mb-3'>
        Your Projects
      </h1>
      <div className='flex flex-wrap gap-4 '>
        {projects.map((project) => (
          <Link to={`/boards/${project.id}`}>
            <div className='p-3 rounded h-24 w-52 bg-sky-600 hover:bg-sky-600/80'>
              <h2 className='text-white font-bold'>{project.name}</h2>
            </div>
          </Link>
        ))}
        <NewProjectModal />
      </div>
    </div>
  );
};

export default Ideas;
