import { faCircleExclamation } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PropTypes {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  register: any;
  error?: string | null;
}

export default function FormInput({
  label,
  id,
  type,
  placeholder,
  register,
  error,
}: PropTypes) {
  return (
    <div className="mb-5">
      <label
        className="font-semibold text-slate-200 text-sm mb-1 block"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="text-slate-50 w-full text-start p-3 rounded flex justify-between bg-slate-800 items-center focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
        {...register}
      />
      {error && (
        <small className="text-sm mt-1 text-red-300 flex items-center gap-1">
          <FontAwesomeIcon icon={faCircleExclamation} />
          <span>{error}</span>
        </small>
      )}
    </div>
  );
}
