import Head from "next/head";
import { useState } from "react";

const Home = () => {
  const [numbers, setNumbers] = useState(["", "", "", ""]);
  const [result, setResult] = useState("");
  const [solutions, setSolutions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    const newValue = value.replace(/[^1-9]/g, "");

    setNumbers((prevNumbers) => {
      const newNumbers = [...prevNumbers];
      newNumbers[index] = newValue;
      return newNumbers;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/game24", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numbers }),
    });
    const data = await response.json();

    setResult(data.result);
    setSolutions(data.solutions || []);
    setLoading(false);
  };

  function handleClearButton() {
    setNumbers(["", "", "", ""]);
    setResult("");
    setSolutions([]);
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Game24</title>
      </Head>
      <main className="min-h-screen w-full overflow-hidden flex justify-center pt-10">
        <div className="w-[30rem] sm:w-[50rem] text-center">
          <h1 className="text-[2.5rem] sm:text-7xl font-bold mb-2">
            Game 24 Solver
          </h1>
          <p className="text-sm sm:text-[18px] inline-block w-[90vw] text-start sm:text-center sm:w-auto">
            Enter 4 numbers below, then click &quot;Solve&quot; to see every
            solution that equals 24.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 p-2 my-4 w-[90vw] sm:w-auto mx-auto"
          >
            <div className="grid grid-cols-4 gap-4 w-full max-w-[40rem]">
              {numbers.map((number, index) => (
                <input
                  className="aspect-square text-5xl sm:text-8xl text-center rounded-lg bg-blue-300"
                  key={index}
                  type="text"
                  value={number}
                  onChange={(event) =>
                    handleInputChange(index, event.target.value)
                  }
                  maxLength={1}
                  pattern="[1-9]"
                  required
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-[40rem]">
              <button
                type="submit"
                disabled={loading}
                className="py-4 text-2xl text-white font-semibold rounded-lg bg-blue-500 hover:bg-opacity-90"
              >
                {loading ? "Loading..." : "Solve"}
              </button>
              <button
                type="button"
                onClick={handleClearButton}
                className="py-4 text-2xl text-white font-semibold rounded-lg bg-slate-400 hover:bg-opacity-90"
              >
                Clear
              </button>
            </div>
          </form>
          {result ? (
            <div className="bg-blue-300 rounded-lg w-[90vw] sm:w-[40rem] p-2 my-4 mx-auto">
              <h2 className="font-semibold text-xl py-2">{result}</h2>
              {solutions.length > 0 && (
                <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-x-8 px-2 sm:px-12 my-4">
                  {solutions.map((solution, index) => (
                    <li className="bg-blue-200 rounded-lg py-2" key={index}>
                      {solution}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
};

export default Home;
