import React from 'react';
import List from '../components/List';

const cards = [{}];

const Board = () => {
  return (
    <div className='container mx-auto p-6'>
      <div>
        <h1 className='font-extrabold text-slate-50 text-2xl mb-3'>
          Project Name
        </h1>
      </div>
      <div className='flex gap-3'>
        <List title={'To Do'} />
        <List title={'In Progress'} />
        <List title={'Completed'} />
      </div>
    </div>
  );
};

export default Board;
