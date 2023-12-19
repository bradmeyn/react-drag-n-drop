import { XMarkIcon } from "@heroicons/react/24/solid";

interface PropTypes {
  type: "error" | "success" | "info";
  message: string;
  isShowing: boolean;
  setIsActive: (isShowing: boolean) => void;
}

export default function Alert({
  message,
  type = "error",
  isShowing,
  setIsActive,
}: PropTypes) {
  return isShowing ? (
    <div className="fixed inset-x-0 top-20 flex items-center justify-center z-50 animate-fade-down">
      <div
        className={`p-3 flex flex-grow justify-between shadow-xl font-bold items-center leading-normal rounded max-w-md text-lg ${
          type === "error"
            ? "bg-red-300 text-red-800"
            : type === "success"
            ? "bg-green-200 text-green-800 b"
            : "bg-violet-200 text-violet-800 bo"
        }`}
      >
        <span className="">{message}</span>
        <button
          onClick={() => setIsActive(false)}
          type="button"
          aria-label="Close alert"
          className="ml-5 text-xl"
        >
          <XMarkIcon />
        </button>
      </div>
    </div>
  ) : null;
}
