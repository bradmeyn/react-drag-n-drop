import { MouseEvent, useEffect, useRef, useState, useContext } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/pro-light-svg-icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card as CardType } from "../../types/types";
import ActiveCard from "./ActiveCard";

interface PropTypes {
  card: CardType;
  setIsOverCard: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HomeCard({ card, setIsOverCard }: PropTypes) {
  const [isActive, setIsActive] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id: card.id,
    data: {
      card,
      type: "card",
    },
  });

  useEffect(() => {
    isOver ? setIsOverCard(true) : setIsOverCard(false);
  }, [isOver]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsActive(true);
  };

  const dismissCard = () => setIsActive(false);

  return (
    <>
      <div
        className="mb-3"
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        style={style}
        onClick={handleClick}
      >
        {isDragging ? (
          <div className="text-transparent w-full text-start p-5 font-bold bg-transparent rounded shadow-sm flex justify-between items-center border-dashed border-2 border-purple-700">
            <span>{card.title}</span>
            <FontAwesomeIcon icon={faPencil} className="" />
          </div>
        ) : (
          <button className="text-slate-100 w-full border-transparent text-start p-5 font-bold bg-slate-700 rounded shadow-sm hover:bg-sky-700 flex justify-between items-center group">
            <span>{card.title}</span>
            <FontAwesomeIcon
              icon={faPencil}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
          </button>
        )}
      </div>
      <ActiveCard card={card} isActive={isActive} dismissCard={dismissCard} />
    </>
  );
}
