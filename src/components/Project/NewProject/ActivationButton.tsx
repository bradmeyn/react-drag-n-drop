import { PlusIcon } from "@heroicons/react/24/solid";
import { MouseEvent, useRef } from "react";

interface ActivationButtonProps {
  activateForm: (e: MouseEvent) => void;
}

export const ActivationButton: React.FC<ActivationButtonProps> = ({
  activateForm,
}) => (
  <button
    className="p-10 text-slate-100 font-bold bg-slate-700 hover:bg-sky-700 rounded text-start text-xl"
    onClick={activateForm}
  >
    <PlusIcon />
    <span>Add Project</span>
  </button>
);
