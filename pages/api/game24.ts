import { NextApiRequest, NextApiResponse } from "next";

const isValidNumber = (num: number): boolean => {
  return num >= 1 && num <= 9;
};

const getPermutations = (arr: number[]): Set<number[]> => {
  const result: Set<number[]> = new Set();

  const permute = (arr: number[], m: number[] = []) => {
    if (arr.length === 0) {
      result.add(m);
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

// Backend API route handler for /api/game24
const game24Handler = (req: NextApiRequest, res: NextApiResponse) => {
  // Extract the input numbers from the request body
  const { numbers } = req.body;

  // Check if exactly 4 numbers are provided
  if (!Array.isArray(numbers) || numbers.length !== 4) {
    res.status(400).json({ error: "Exactly 4 numbers are required." });
    return;
  }

  // Check if all provided numbers are valid (between 1 and 9)
  if (!numbers.every(isValidNumber)) {
    res.status(400).json({ error: "All numbers must be between 1 and 9." });
    return;
  }

  // Calculate all possible permutations of the input numbers
  const permutations = getPermutations(numbers);

  // Loop through each permutation and try all possible combinations of arithmetic operations and brackets
  const solutions: Set<string> = new Set();
  for (const perm of permutations) {
    const [a, b, c, d] = perm;
    const ops = ["+", "-", "*", "/"];
    for (const op1 of ops) {
      for (const op2 of ops) {
        for (const op3 of ops) {
          // Try all possible combinations of operations
          const expressions = [
            `${a} ${op1} ${b} ${op2} ${c} ${op3} ${d}`,
            `${a} ${op1} ${b} ${op2} (${c} ${op3} ${d})`,
            `(${a} ${op1} ${b}) ${op2} ${c} ${op3} ${d}`,
            `${a} ${op1} (${b} ${op2} ${c}) ${op3} ${d}`,
            `${a} ${op1} ((${b} ${op2} ${c}) ${op3} ${d})`,
          ];
          for (const expr of expressions) {
            try {
              if (eval(expr) === 24) {
                solutions.add(expr);
              }
            } catch (error) {
              // Ignore errors due to invalid expressions
            }
          }
        }
      }
    }
  }

  // Return the response based on whether a solution was found or not
  if (solutions.size > 0) {
    res.status(200).json({
      result: `Found ${solutions.size} solutions`,
      solutions: Array.from(solutions),
    });
  } else {
    res.status(200).json({ result: "No solution found" });
  }
};

export default game24Handler;
