interface FormButtonProps {
  loading: boolean;
  text: string;
}

export default function FormButton({ loading, text }: FormButtonProps) {
  return (
    <button
      disabled={loading}
      className="btn h-10 disabled:bg-neutral-400 disabled:text-neutral-200 disabled:cursor-not-allowed"
    >
      {loading ? "Loading..." : text}
    </button>
  );
}