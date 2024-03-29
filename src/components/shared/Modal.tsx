import React, { useRef } from "react";

import useOutsideClick from "../../hooks/useOutsideClick";
import ReactDOM from "react-dom"; // Make sure to import ReactDOM correctly
import { XMarkIcon } from "@heroicons/react/24/solid";

interface PropTypes {
  title: string;
  children: React.ReactNode;
  isModalActive: boolean;
  dismissModal: () => void;
}

export default function Modal({
  title,
  children,
  isModalActive,
  dismissModal,
}: PropTypes) {
  const modalRef = useRef(null);

  // Close modal when clicked outside
  useOutsideClick([modalRef], () => {
    dismissModal();
  });

  return isModalActive
    ? ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 bg-slate-900 bg-opacity-30 backdrop-blur-md">
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 w-full sm:min-w-[20rem] sm:max-w-[40rem] md:w-1/2 lg:w-1/2 shadow-xl rounded p-2 md:p-4 lg:p-6  overflow-auto"
            ref={modalRef}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="text-white font-bold text-3xl">{title}</div>
              <span className="">
                <button
                  onClick={dismissModal}
                  className="text-white hover:bg-slate-700 p-2 rounded text-xl"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </span>
            </div>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
}
