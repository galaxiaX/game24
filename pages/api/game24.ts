import { NextApiRequest, NextApiResponse } from "next";

const isValidNumber = (num: number): boolean => {
  return num >= 1 && num <= 9;
};

const getPermutations = (arr: number[]): number[][] => {
  const result: number[][] = [];

  const permute = (arr: number[], m: number[] = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(arr);
  return result;
};

const game24Handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { numbers } = req.body;

  if (!Array.isArray(numbers) || numbers.length !== 4) {
    res.status(400).json({ error: "Exactly 4 numbers are required." });
    return;
  }

  if (!numbers.every(isValidNumber)) {
    res.status(400).json({ error: "All numbers must be between 1 and 9." });
    return;
  }

  const permutations = getPermutations(numbers);

  let foundSolution = false;
  const solutions: string[] = [];
  for (const perm of permutations) {
    const [a, b, c, d] = perm;
    const ops = ["+", "-", "*", "/"];
    for (const op1 of ops) {
      for (const op2 of ops) {
        for (const op3 of ops) {
          const expr = `${a} ${op1} ${b} ${op2} ${c} ${op3} ${d}`;
          try {
            if (eval(expr) === 24) {
              foundSolution = true;
              solutions.push(expr);
            }
          } catch (error) {}
        }
      }
    }
  }

  if (foundSolution) {
    const uniqueSolutions = [...new Set(solutions)];
    res.status(200).json({
      result: `Found ${uniqueSolutions.length} solutions`,
      solutions: uniqueSolutions,
    });
  } else {
    res.status(200).json({ result: "No solution found" });
  }
};

export default game24Handler;
