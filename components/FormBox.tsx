type FormBoxProps = {
  numbers: string[];
  loading: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleInputChange: (index: number, value: string) => void;
  handleClearButton: () => void;
};

const FormBox: React.FC<FormBoxProps> = ({
  numbers,
  loading,
  handleSubmit,
  handleInputChange,
  handleClearButton,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-[40rem]">
        {numbers.map((number, index) => (
          <input
            id={`input-${index}`}
            key={index}
            type="text"
            value={number}
            onChange={(event) => handleInputChange(index, event.target.value)}
            maxLength={1}
            pattern="[1-9]"
            required
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full max-w-[40rem]">
        <button type="submit" disabled={loading} className="bg-blue-400">
          {loading ? "Loading..." : "Solve"}
        </button>
        <button
          type="button"
          onClick={handleClearButton}
          className="bg-slate-400"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default FormBox;
