import FormBox from "@/components/FormBox";
import ResultBox from "@/components/ResultBox";
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

    const nextInput = document.getElementById(
      `input-${index + 1}`
    ) as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
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
    const input1 = document.getElementById("input-0") as HTMLInputElement;
    input1.focus();
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
          <FormBox
            numbers={numbers}
            loading={loading}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            handleClearButton={handleClearButton}
          />
          <ResultBox result={result} solutions={solutions} />
        </div>
      </main>
    </>
  );
};

export default Home;
