import { MouseEvent, useEffect, useRef, useState, useContext } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/pro-regular-svg-icons";
import { nanoid } from "nanoid";
import { HomeDispatchContext } from "../../context/homeContext";

export default function NewCard({ list }: { list: string }) {
  const dispatch = useContext(HomeDispatchContext)!;
  const [isActive, setIsActive] = useState(false);
  const newCardRef = useRef(null);
  const cardInputRef = useRef(null);
  const addBtnRef = useRef(null);

  const [newCard, setNewCard] = useState({
    id: nanoid(),
    title: "",
    status: list,
    priority: 100,
  });

  const deactivate = (e: MouseEvent) => {
    e.stopPropagation();
    setIsActive(false);
  };
  const activateForm = (e: MouseEvent) => {
    e.stopPropagation();
    setIsActive(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewCard({ ...newCard, title: e.target.value });

  const handleAddCard = () => {
    dispatch({ type: "ADD_CARD", payload: newCard });
    setNewCard({
      id: nanoid(),
      title: "",
      status: list,
      priority: 100,
    });

    setIsActive(false);
  };

  useOutsideClick([newCardRef], () => {
    if (isActive) {
      setIsActive(false);
    }
  });

  return isActive ? (
    <>
      <div ref={newCardRef}>
        <input
          className="text-slate-50 w-full text-start p-3 rounded flex justify-between bg-slate-800 items-center  focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
          placeholder="Enter a card title..."
          autoFocus
          value={newCard.title}
          onChange={handleChange}
          ref={cardInputRef}
        />
        <div className="flex items-center mt-3 gap-2">
          <button
            onClick={handleAddCard}
            className="bg-sky-700 text-white rounded py-2 px-4"
          >
            Add task
          </button>
          <button
            onClick={deactivate}
            className="p-2 text-white flex items-center justify-center text-xl"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </>
  ) : (
    <button
      className="p-3 text-slate-100 hover:bg-slate-300 hover:text-slate-600 w-full rounded text-start"
      onClick={activateForm}
      ref={addBtnRef}
    >
      <FontAwesomeIcon icon={faPlus} className="mr-2" />
      <span>Add task</span>
    </button>
  );
}
