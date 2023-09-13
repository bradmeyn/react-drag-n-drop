import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-duotone-svg-icons";
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
    <FontAwesomeIcon icon={faPlus} className="mr-2" />
    <span>Add Project</span>
  </button>
);
