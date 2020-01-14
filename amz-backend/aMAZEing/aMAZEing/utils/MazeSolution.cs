using System.Collections.Generic;

namespace aMAZEing.utils
{
    public class MazeSolution
    {
        public List<Point> Solution { get; set; }
        public int SolutionSize { get; set; }

        public MazeSolution(string solution, int width, char solutionCharacter)
        {
            Solution = new List<Point>();

            for (int i = 0; i < solution.Length; ++i)
            {
                if (solution[i] == solutionCharacter)
                {
                    int next_i = i / width;
                    int next_j = i % width;

                    Point p = new Point(next_i, next_j, solution[i] - '0');
                    Solution.Add(p);

                    SolutionSize += 1;
                }
            }
        }
    }
}
