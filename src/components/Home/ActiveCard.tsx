import React, { useState, useEffect, useContext } from "react";
import { HomeDispatchContext } from "../../context/homeContext";
import Modal from "../shared/Modal";
import { Card as CardType } from "../../types";

interface PropTypes {
  card: CardType;
  isActive: boolean;
  dismissCard: () => void;
}

export default function ActiveCard({ card, isActive, dismissCard }: PropTypes) {
  // React state to hold the new card title and details
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDetail, setNewCardDetail] = useState("");
  const dispatch = useContext(HomeDispatchContext)!;

  // Initialize the form values with the existing card's title and details
  useEffect(() => {
    setNewCardTitle(card.title ?? "");
    setNewCardDetail(card.detail ?? ""); // Assume "detail" is a property of CardType
  }, [card]);

  // Function to handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  // Function to handle updating the card
  const handleUpdateCard = () => {
    // Your logic for updating a card goes here
    const updatedCard = { ...card, title: newCardTitle, detail: newCardDetail };
    dispatch({ type: "UPDATE_CARD", payload: updatedCard });
    dismissCard();
  };

  const handleDeleteCard = () => {
    dispatch({ type: "REMOVE_CARD", payload: card.id });
    dismissCard();
  };

  return (
    <Modal title={"Task"} isModalActive={isActive} dismissModal={dismissCard}>
      <div className="">
        <div className="mb-4">
          <label htmlFor="" className="text-white mb-2 font-bold">
            Summary
          </label>
          <input
            className="text-slate-50 w-full text-start p-3 rounded bg-slate-800 items-center border-slate-500 border-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="Enter a card title..."
            autoFocus
            value={newCardTitle}
            onChange={(e) => handleChange(e, setNewCardTitle)}
          />
        </div>
        <div className="mb-4">
          <label className="text-white mb-2 font-bold">Details</label>
          <textarea
            className="text-slate-50 w-full text-start p-3 rounded bg-slate-800 border-slate-500 border-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="Enter card details..."
            value={newCardDetail}
            rows={8}
            onChange={(e) => handleChange(e, setNewCardDetail)}
          />
        </div>
        <div className="flex items-center justify-between mt-3 gap-2">
          <button
            onClick={handleUpdateCard}
            className="bg-sky-700 text-white rounded py-2 px-4 mt-2 hover:bg-sky-800 font-semibold text-lg"
          >
            Update task
          </button>

          <button
            className=" text-white rounded py-2 px-4 mt-2 font-semibold text-lg hover:bg-red-500"
            onClick={handleDeleteCard}
          ></button>
        </div>
      </div>
    </Modal>
  );
}
