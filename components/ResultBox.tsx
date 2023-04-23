type ResultBoxProps = {
  result: string;
  solutions: string[];
};

const ResultBox: React.FC<ResultBoxProps> = ({ result, solutions }) => {
  return (
    <>
      {result ? (
        <div className="bg-blue-300 rounded-lg w-[90vw] sm:w-[40rem] p-2 my-2 mx-auto">
          <h2 className="font-semibold text-xl py-2">{result}</h2>
          {solutions.length > 0 ? (
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-2 sm:px-4 my-2">
              {solutions.map((solution, index) => (
                <li className="bg-blue-200 rounded-lg py-2" key={index}>
                  {solution}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default ResultBox;
