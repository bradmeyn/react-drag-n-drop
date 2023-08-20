import { useState, createContext } from "react";
import { Card } from "../../types/types";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
} from "@dnd-kit/core";
import HomeList from "./HomeList";
import { testCards } from "../../api/data";
import { set } from "react-hook-form";

export const NewCardContext = createContext<{
  addNewCard: (card: Card) => void;
}>({
  addNewCard: () => {}, // noop function
});

type OverType = "list" | "card";

export default function HomeBoard() {
  const lists: string[] = ["To Do", "In Progress", "Completed"];
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [cards, setCards] = useState<Card[]>(testCards);
  const addNewCard = (card: Card) => {
    setCards([...cards, card]);
  };

  const handleDragStart = (e: DragStartEvent) => {
    setActiveCard(e.active.data.current?.card);
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!active || !over) return;

    const overType: OverType = over.data.current?.type;
    if (overType === "list") {
      const activeStatus: string = active.data.current?.card.status;
      const overStatus: string = over.data.current?.name;
      if (activeStatus !== overStatus) {
        return false;

        // Check if the active card is being dragged over itself
      } else if (active.id === over.id) {
        return false;
      }
    } else if (overType === "card") {
      const activeCardId: string = active.data.current?.card.id;
      const overCardId: string = over.data.current?.card.id;
      if (activeCardId === overCardId) {
        return false;
      }
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    if (!activeCard) return;
    setActiveCard(null);

    const { over } = e;
    if (!over) return;

    // Check what was dragged over
    const overType: OverType = over.data.current?.type;
    console.log("Over type:", overType); // Log the overType

    if (overType === "list") {
      const newStatus: string = over.data.current?.name;
      if (newStatus !== activeCard.status) {
        const updatedCards = listDrop(cards, activeCard, newStatus);
        setCards(updatedCards);
      }
    } else if (overType === "card" && over.id !== activeCard.id) {
      console.log("Dropped on card with ID:", over.id); // Log the card ID
      const updatedCards = cardDrop(
        cards,
        activeCard,
        over.data.current?.card.id
      );
      setCards(updatedCards);
    }
  };

  function listDrop(
    cards: Card[],
    activeCard: Card,
    newStatus: string
  ): Card[] {
    const updatedCards = cards.filter((card) => card.id !== activeCard.id);
    activeCard.status = newStatus;
    updatedCards.push(activeCard);
    return updatedCards;
  }

  function cardDrop(
    cards: Card[],
    activeCard: Card,
    targetCardId: string
  ): Card[] {
    const updatedCards = [...cards];
    const activeCardIndex = updatedCards.findIndex(
      (card) => card.id === activeCard.id
    );
    const targetCard = updatedCards.find((card) => card.id === targetCardId);
    const targetCardIndex = updatedCards.findIndex(
      (card) => card.id === targetCardId
    );

    if (!targetCard) {
      console.error("Target card not found!"); // Log an error if target card is not found
      return cards;
    }

    // If the target card exists and is in a different list, update the active card's status
    if (targetCard.status !== activeCard.status) {
      activeCard.status = targetCard.status;
      console.log("Active card status updated to:", activeCard.status); // Log the new status
    }

    // Remove the active card from its current position
    if (activeCardIndex !== -1) {
      updatedCards.splice(activeCardIndex, 1);
    }

    // Insert the active card at the target card's position
    if (targetCardIndex !== -1) {
      updatedCards.splice(targetCardIndex, 0, activeCard);
    } else {
      updatedCards.push(activeCard);
    }

    return updatedCards;
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      collisionDetection={closestCenter}
    >
      <NewCardContext.Provider value={{ addNewCard }}>
        <div className="container mx-auto p-4">
          <div className="flex flex-col gap-5 lg:flex-row md:gap-">
            {lists.map((list, i) => (
              <HomeList
                list={list}
                key={list}
                index={i}
                cards={cards.filter((card) => card.status === list)}
              />
            ))}
          </div>
        </div>
        <DragOverlay>
          {activeCard ? (
            <div className="text-slate-100 w-full text-start p-5 font-bold bg-violet-700 rounded ">
              {activeCard.title}
            </div>
          ) : null}
        </DragOverlay>
      </NewCardContext.Provider>
    </DndContext>
  );
}
