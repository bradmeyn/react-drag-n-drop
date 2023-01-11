import { useState } from 'react';
import List from './List';
import { testProject } from '../../api/data';
import Navbar from './Navbar';

const Project = () => {
  const [project, setProject] = useState(testProject);
  const lists = ['To Do', 'In Progress', 'Completed'];
  return (
    <>
      <Navbar name={project.name} />
      <div className='container mx-auto p-4'>
        <div></div>
        <div className='flex gap-3'>
          {lists.map((title) => (
            <List title={title} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Project;
