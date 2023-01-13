import { useState } from 'react';
import List from './List';
import { testProject } from '../../api/data';
import Navbar from './Navbar';
import { DndContext, DragEndEvent, rectIntersection } from '@dnd-kit/core';
import { Card } from '../../types/Card';

const Project = () => {
  const [project, setProject] = useState(testProject);
  const categories = ['To Do', 'In Progress', 'Completed'];

  const handleDragEnd = (e: DragEndEvent) => {
    let newStatus = e.over?.id ?? '';
    let movedCard = e.active.data.current?.card;
    console.log(newStatus);
    let updatedCards: Card[] = project.cards!.map((card) => {
      if (card.id === movedCard.id && newStatus) {
        card.status = newStatus?.toString();
        return card;
      } else {
        return card;
      }
    });

    setProject({ ...project, cards: updatedCards });
  };

  return (
    <>
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={rectIntersection}
      >
        <Navbar name={project.name} />
        <div className='container mx-auto p-4'>
          <div></div>
          <div className='flex gap-3'>
            {categories.map((listCategory, i) => (
              <List
                key={i}
                index={i}
                listCategory={listCategory}
                cards={project.cards!}
              />
            ))}
          </div>
        </div>
      </DndContext>
    </>
  );
};

export default Project;
