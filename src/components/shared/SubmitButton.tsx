import Spinner from "./Spinner";

interface PropTypes {
  isSubmitting: boolean;
  isDisabled: boolean;
  text: string;
}

export default function SubmitButton({
  isSubmitting,
  isDisabled,
  text,
}: PropTypes) {
  return (
    <button
      type="submit"
      className="p-3 w-full bg-sky-600 hover:bg-sky-600/80 text-white rounded font-bold mt-6"
      disabled={isDisabled}
    >
      {isSubmitting ? (
        <div className="flex justify-center">
          <Spinner />
          Submitting...
        </div>
      ) : (
        text
      )}
    </button>
  );
}
