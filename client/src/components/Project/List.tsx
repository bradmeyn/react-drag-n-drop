import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import NewCard from './NewCard';

import type { Card as CardType } from '../../types/Card';

import { useDroppable } from '@dnd-kit/core';

interface ListProps {
  listCategory: string;
  index: number;
  cards: CardType[];
}

const List = ({ listCategory, cards, index }: ListProps) => {
  const { setNodeRef } = useDroppable({
    id: listCategory,
  });

  const listCards = cards.filter((card) => card.status === listCategory);

  return (
    <div
      className='p-2 rounded w-full  border-2  border-slate-700'
      ref={setNodeRef}
    >
      <h2 className='p-3 font-bold underline-offset-1 text-slate-100 '>
        {listCategory}
      </h2>
      <ol>
        {listCards.map((card, index) => (
          <Card card={card} index={index} listCategory={listCategory} />
        ))}
      </ol>
      <NewCard />
    </div>
  );
};

export default List;
