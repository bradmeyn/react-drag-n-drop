import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Card } from "../../types/types";
import HomeCard from "./HomeCard";
import HomeNewCard from "./HomeNewCard";
import { useState } from "react";
interface PropTypes {
  list: string;
  cards: Card[];
  index: number;
}

export default function HomeList({ list, cards, index }: PropTypes) {
  const cardIds = cards.map((card) => card.id);

  const [isOverCard, setIsOverCard] = useState<boolean>(false);

  const { setNodeRef, isOver } = useDroppable({
    id: list,
    data: {
      type: "list",
      name: list,
    },
  });

  return (
    <SortableContext
      id={list}
      items={cardIds}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        style={{ animationFillMode: "forwards" }}
        className={`p-2 rounded w-full opacity-0 border-2 border-slate-700 ${
          isOver || isOverCard
            ? " border-violet-500 border-dashed"
            : "bg-slate-800"
        }
          ${
            index == 0
              ? "animate-[fade-in-up_0.6s_200ms]"
              : index === 1
              ? "animate-[fade-in-up_0.6s_400ms]"
              : "animate-[fade-in-up_0.6s_600ms]"
          }
        `}
      >
        <h2 className="p-3 font-bold underline-offset-1 text-slate-100 text-xl">
          {list}
        </h2>
        <ol>
          {cards.map((card) => (
            <HomeCard setIsOverCard={setIsOverCard} key={card.id} card={card} />
          ))}
        </ol>
        <HomeNewCard list={list} />
      </div>
    </SortableContext>
  );
}
