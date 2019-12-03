using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using aMAZEing.utils;

namespace aMAZEing.services
{
    public class BFS_Service : IAlgorithmService
    {
        public String ValidateMaze(MazeFE mazeFE)
        {
            Point startPoint = new Point();
            Point endPoint = new Point();

            // generate matrix from mazeFE
            int[,] matrix = new int[mazeFE.Height, mazeFE.Width];
            foreach (Point p in mazeFE.PointList)
            {
                matrix[p.I, p.J] = 0;

                if (p.Value == 1)
                {
                    startPoint.I = p.I; 
                    startPoint.J = p.J;
                    startPoint.Value = 1;
                    matrix[p.I, p.J] = 1;
                } else if (p.Value == 2)
                {
                    endPoint.I = p.I;
                    endPoint.J = p.J;
                } else if (p.Value == 3)
                {
                    matrix[p.I, p.J] = -1;
                }
            }

            int[,] res = solve(matrix, startPoint, endPoint, mazeFE.Width, mazeFE.Height);
            List<Point> solution = new List<Point>();

            int[] di = { -1, 0, 1, 0 };
            int[] dj = { 0, 1, 0, -1 };

            if (endPoint.Value == 0)
                return null;

            // parse solution
            Point currPoint = endPoint;
            while (!(currPoint.I == startPoint.I && currPoint.J == startPoint.J))
            {
                Point nextPoint;
                for (int i = 0; i <= 3; ++i)
                {
                    int next_i = currPoint.I + di[i];
                    int next_j = currPoint.J + dj[i];

                    if (next_i >= 0 && next_i < mazeFE.Height && next_j >= 0 && next_j < mazeFE.Width)
                    {
                        nextPoint = new Point(next_i, next_j, res[next_i, next_j]);

                        if (nextPoint.Value > 0 && nextPoint.Value < currPoint.Value)
                            currPoint = nextPoint;
                    }
                }

                solution.Add(currPoint);
            }

            StringBuilder retSolution = new StringBuilder(new String('0', mazeFE.Width * mazeFE.Height));
            foreach (Point p in solution)
            {
                if (p.I == startPoint.I && p.J == startPoint.J)
                    continue;

                retSolution.Remove(p.I * mazeFE.Width + p.J, 1);
                retSolution.Insert(p.I * mazeFE.Width + p.J, '1');
            }

            return retSolution.ToString();
        }

        public List<Point> Visualize(MazeFE mazeFE)
        {
            throw new NotImplementedException();
        }

        private int[,] solve(int[,] matrix, Point startPoint, Point endPoint, int matrixWidth, int matrixHeight)
        {
            int[] di = { -1, 0, 1, 0 };
            int[] dj = { 0, 1, 0, -1 };

            Queue<Point> queue = new Queue<Point>();
            queue.Enqueue(startPoint);
            while (queue.Count() != 0 && matrix[endPoint.I, endPoint.J] == 0)
            {
                Point currPoint = queue.Dequeue();
                
                for (int i = 0; i <= 3; ++i)
                {
                    int next_i = currPoint.I + di[i];
                    int next_j = currPoint.J + dj[i];

                    if (next_i >= 0 && next_i < matrixHeight && next_j >= 0 && next_j < matrixWidth)
                    {
                        if (matrix[next_i, next_j] == 0)
                        {
                            queue.Enqueue(new Point(next_i, next_j, currPoint.Value + 1));
                            matrix[next_i, next_j] = currPoint.Value + 1;
                        }

                    }
                }
            }

            if (matrix[endPoint.I, endPoint.J] != 0)
                endPoint.Value = matrix[endPoint.I, endPoint.J];

            return matrix;
        }
    }
}
