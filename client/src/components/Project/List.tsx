import Card from "./Card";
import NewCard from "./NewCard";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { Card as CardType } from "../../types/types";

import { useDroppable } from "@dnd-kit/core";

interface PropTypes {
  listCategory: string;
  cards: CardType[];
}

export default function List({ listCategory, cards }: PropTypes) {
  const { setNodeRef } = useDroppable({
    id: listCategory,
  });

  const listCards: any[] = cards
    .filter((card) => card.status === listCategory)
    .sort((a, b) => a.priority - b.priority);

  return (
    <SortableContext
      id={listCategory}
      items={listCards}
      strategy={verticalListSortingStrategy}
    >
      <div
        className="p-2 rounded w-full  border-2 border-slate-700"
        ref={setNodeRef}
      >
        <h2 className="p-3 font-bold underline-offset-1 text-slate-100 ">
          {listCategory}
        </h2>
        <ol>
          {listCards.map((card) => (
            <Card key={card.id!} card={card} listCategory={listCategory} />
          ))}
        </ol>
        <NewCard />
      </div>
    </SortableContext>
  );
}
