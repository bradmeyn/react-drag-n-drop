import { useState } from 'react';
import List from './List';
import { testProject } from '../../api/data';
import Navbar from './Navbar';
import Card from './Card';
import { Card as ICard } from '../../types/Card';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  rectIntersection,
} from '@dnd-kit/core';

const Project = () => {
  const [project, setProject] = useState(testProject);
  const categories = ['To Do', 'In Progress', 'Completed'];
  const [activeCard, setActiveCard] = useState<any>();

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    setActiveCard(active.data.current?.card);
  };

  //   const { over, active } = e;

  //   if (!over?.id) {
  //     return;
  //   }

  //   const activeContainer = active.data.current?.sortable.containerId;
  //   const overContainer = over.data.current?.sortable.containerId;
  //   if (
  //     !activeContainer ||
  //     !overContainer ||
  //     activeContainer === overContainer
  //   ) {
  //     return;
  //   }

  //   if (activeContainer !== overContainer) {
  //     let updatedCards: ICard[] = project.cards!.map((card) => {
  //       if (card.id === activeCard?.id) {
  //         card.status = overContainer.toString();
  //         return card;
  //       } else {
  //         return card;
  //       }
  //     });

  //     setProject({ ...project, cards: updatedCards });
  //   } else {
  //     console.log('Card over existing container');
  //   }
  // };

  const handleDragEnd = (e: DragEndEvent) => {
    let newStatus: any;

    //over column
    if (typeof e.over?.id === 'string') {
      newStatus = e.over?.id;

      //over card
    } else if (typeof e.over?.id === 'number') {
      newStatus = e.over?.data.current?.card.status;
    } else {
      newStatus = activeCard.status;
    }

    if (newStatus !== activeCard.status) {
      let updatedCards: ICard[] = project.cards!.map((card) => {
        if (card.id === activeCard.id) {
          card.status = newStatus?.toString();
          return card;
        } else {
          return card;
        }
      });

      setProject({ ...project, cards: updatedCards });
    }

    //card is going to new list

    //get OVER index

    //ACTIVE priority = OVER index + 1

    //Loop from OVER index up add +1 to each priority

    //card is moving to empty/end of list

    // card priority === list length +1

    // card is moving up current list

    //get OVER index

    //ACTIVE priority = OVER index + 1

    //Loop from OVER index up add +1 to each priority

    setActiveCard(null);
  };

  return (
    <>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        collisionDetection={rectIntersection}
      >
        <Navbar name={project.name} />
        <div className='container mx-auto p-4'>
          <div></div>
          <div className='flex gap-3'>
            {categories.map((listCategory) => (
              <List listCategory={listCategory} cards={project.cards!} />
            ))}
          </div>
        </div>
        <DragOverlay>
          {activeCard ? (
            <Card
              key={activeCard.id!}
              card={activeCard}
              listCategory={activeCard.status!}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default Project;
