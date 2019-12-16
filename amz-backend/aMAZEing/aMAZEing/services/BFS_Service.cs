using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using aMAZEing.DTOs;
using aMAZEing.utils;

namespace aMAZEing.services
{
    public class BFS_Service : IAlgorithmService
    {
        public String ValidateMaze(MazeFE mazeFE)
        {
            if (mazeFE.PointList.Count() != mazeFE.Width * mazeFE.Height)
                return null;

            if (mazeFE.PointList.Count(p => p.Value == 1) != 1 || mazeFE.PointList.Count(p => p.Value == 2) != 1)
                return null;

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

            if (matrix[endPoint.I, endPoint.J] == 0)
                return null; // sol not found

            List<Point> solution = new List<Point>();

            int[] di = { -1, 0, 1, 0 };
            int[] dj = { 0, 1, 0, -1 };

            // parse solution
            Point currPoint = endPoint;
            while (true)
            {
                Point nextPoint, bestNextPoint = null;
                for (int i = 0; i <= 3; ++i)
                {
                    int next_i = currPoint.I + di[i];
                    int next_j = currPoint.J + dj[i];

                    if (next_i >= 0 && next_i < mazeFE.Height && next_j >= 0 && next_j < mazeFE.Width)
                    {
                        nextPoint = new Point(next_i, next_j, res[next_i, next_j]);

                        if (nextPoint.Value > 0 && nextPoint.Value < currPoint.Value)
                            bestNextPoint = nextPoint;
                    }
                }

                currPoint = bestNextPoint;
                if (currPoint.I == startPoint.I && currPoint.J == startPoint.J)
                    break;

                solution.Add(currPoint);
            }

            StringBuilder retSolution = new StringBuilder(new String('0', mazeFE.Width * mazeFE.Height));
            foreach (Point p in solution)
            {
                retSolution.Remove(p.I * mazeFE.Width + p.J, 1);
                retSolution.Insert(p.I * mazeFE.Width + p.J, '1');
            }

            return retSolution.ToString();
        }

        public MazeVisualizerDTO Visualize(MazeFE mazeFE)
        {
            if (mazeFE.PointList.Count() != mazeFE.Width * mazeFE.Height)
                return null;

            if (mazeFE.PointList.Count(p => p.Value == 1) != 1 || mazeFE.PointList.Count(p => p.Value == 2) != 1)
                return null;

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
                }
                else if (p.Value == 2)
                {
                    endPoint.I = p.I;
                    endPoint.J = p.J;
                }
                else if (p.Value == 3)
                {
                    matrix[p.I, p.J] = -1;
                }
            }

            int[,] res = solve(matrix, startPoint, endPoint, mazeFE.Width, mazeFE.Height);

            if (matrix[endPoint.I, endPoint.J] == 0)
                return null; // sol not found

            List<Point> visitedPoints = new List<Point>();
            List<Point> solution = new List<Point>();

            int[] di = { -1, 0, 1, 0 };
            int[] dj = { 0, 1, 0, -1 };

            // build visited points list
            for (int i = 0; i < mazeFE.Height; ++i)
            for (int j = 0; j < mazeFE.Width; ++j)
                if (res[i, j] > 1 && !(i == endPoint.I && j == endPoint.J))
                    visitedPoints.Add(new Point(i, j, res[i, j]));

            visitedPoints.Sort((p1, p2) => p1.Value.CompareTo(p2.Value));

            // parse solution
            Point currPoint = endPoint;
            while (true)
            {
                Point nextPoint, bestNextPoint = null;
                for (int i = 0; i <= 3; ++i)
                {
                    int next_i = currPoint.I + di[i];
                    int next_j = currPoint.J + dj[i];

                    if (next_i >= 0 && next_i < mazeFE.Height && next_j >= 0 && next_j < mazeFE.Width)
                    {
                        nextPoint = new Point(next_i, next_j, res[next_i, next_j]);

                        if (nextPoint.Value > 0 && nextPoint.Value < currPoint.Value)
                            bestNextPoint = nextPoint;
                    }
                }

                currPoint = bestNextPoint;
                if (currPoint.I == startPoint.I && currPoint.J == startPoint.J)
                    break;

                solution.Add(currPoint);
            }

            return new MazeVisualizerDTO(visitedPoints, solution);
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
                            matrix[next_i, next_j] = matrix[currPoint.I, currPoint.J] + 1;
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
