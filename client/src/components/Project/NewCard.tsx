import { MouseEventHandler, useEffect, useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/pro-regular-svg-icons";

export default function HomeNewCard() {
  const [isActive, setIsActive] = useState(false);
  const newCardRef = useRef(null);
  const cardInputRef = useRef(null);

  function activateForm(e: MouseEvent) {
    setIsActive(true);
  }

  const deactivate = () => setIsActive(false);

  useOutsideClick(newCardRef, () => {
    if (isActive) {
      setIsActive(false);
    }
  });

  if (isActive) {
    return (
      <>
        <div ref={newCardRef}>
          <input
            className="text-slate-100 w-full text-start p-3 bg-slate-500 rounded shadow-sm flex justify-between items-center"
            placeholder="Enter a card title..."
            autoFocus
            onBlur={deactivate}
            ref={cardInputRef}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <button
        className="p-3 text-slate-100 hover:bg-slate-300 hover:text-slate-600 w-full rounded text-start"
        onClick={activateForm}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        <span>Add task</span>
      </button>
    </>
  );
}
