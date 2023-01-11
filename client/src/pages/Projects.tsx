import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import NewProjectModal from '../components/Project/NewProjectModal';

import { useQuery, useMutation, useQueryClient } from 'react-query';
// import { getProjects } from '../api/projectApi';
import { Project } from '../types/Project';
import { testProject } from '../api/data';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([testProject]);

  return (
    <div className='text-start p-3 container mx-auto'>
      <h1 className='font-extrabold text-slate-50 text-2xl mb-3'>
        Your Projects
      </h1>
      <div className='flex flex-wrap gap-4 '>
        {projects?.map((project) => (
          <Link to={`/projects/${project.id}`}>
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

export default Projects;
