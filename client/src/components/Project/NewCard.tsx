import { useEffect, useRef, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus } from '@fortawesome/pro-regular-svg-icons';

const NewCard = () => {
  const [isActive, setIsActive] = useState(false);
  const newCard = useRef(null);
  const cardInput = useRef(null);

  const activate = (e) => {
    e.stopPropagation();
    setIsActive(true);
  };

  const deactivate = () => setIsActive(false);

  useOutsideClick(newCard, () => {
    if (isActive) {
      setIsActive(false);
    }
  });

  if (isActive) {
    return (
      <>
        <div ref={newCard}>
          <input
            className='text-slate-100 w-full text-start p-3 bg-slate-500 rounded shadow-sm flex justify-between items-center'
            placeholder='Enter a card title...'
            autoFocus
            onBlur={deactivate}
            ref={cardInput}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <button
        className='p-3 hover:bg-slate-300 hover:text-slate-600 w-full rounded text-start'
        onClick={activate}
      >
        <FontAwesomeIcon icon={faPlus} className='mr-2' />
        <span>Add task</span>
      </button>
    </>
  );
};

export default NewCard;
