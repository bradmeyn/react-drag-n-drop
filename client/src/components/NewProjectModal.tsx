import { useEffect, useRef, useState } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus } from '@fortawesome/pro-regular-svg-icons';

const NewProjectModal = () => {
  const [modalActive, setModalActive] = useState(false);
  const modal = useRef(null);
  const searchInput = useRef(null);

  const openModal = (e) => {
    e.stopPropagation();
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  useOutsideClick(modal, () => {
    if (modalActive) {
      console.log('modal closed');
      setModalActive(false);
    }
  });

  //   const focusInput = () => {
  //     searchInput.current.focus();
  //   };

  if (modalActive) {
    return (
      <>
        <div className='fixed p-0 top-0 left-0 h-full w-full z-50 backdrop-blur-sm  bg-slate-900/30  '>
          <div
            ref={modal}
            className='	 bg-slate-700 md:max-w-md md:mx-auto m-20 p-5 rounded'
          >
            <div className='flex justify-between items-center'>
              <div className='text-center w-full text-slate-200 text-xl'>
                New Project
              </div>
              <button
                className='text-slate-400 hover:text-slate-100'
                onClick={closeModal}
              >
                <FontAwesomeIcon icon={faXmark} className='text-3xl' />
              </button>
            </div>
            <div className='form-control text-start mb-3'>
              <label className='text-slate-200 mb-1'>Title</label>
              <input
                autoFocus
                ref={searchInput}
                placeholder='Project Title'
                className='px-3 py-2 bg-slate-600 outline-0 font-normal rounded'
                //   onChange={handleChange}
                //   onFocus={handleFocus}
              />
            </div>
            <button className='p-3 w-full bg-sky-600 hover:bg-sky-600/80 text-slate-100 rounded font-bold'>
              Create
            </button>
          </div>
        </div>
        <button
          className='p-3 rounded h-24 w-52 bg-slate-300 hover:bg-slate-300/80 text-slate-600 font-bold'
          onClick={openModal}
        >
          <FontAwesomeIcon icon={faPlus} className='text-4xl' />
        </button>
      </>
    );
  }

  return (
    <button
      className='p-3 rounded h-24 w-52 bg-slate-300 hover:bg-slate-300/80 text-slate-600 font-bold'
      onClick={openModal}
    >
      <FontAwesomeIcon icon={faPlus} className='text-4xl' />
    </button>
  );
};

export default NewProjectModal;
