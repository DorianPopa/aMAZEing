using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using aMAZEing.DTOs;
using aMAZEing.errors;
using aMAZEing.utils;

namespace aMAZEing.services
{
    public class BfsService : IBfsService
    {
        public string ValidateMaze(MazeFE mazeFE)
        {
            if (mazeFE.PointList.Count() != mazeFE.Width * mazeFE.Height)
                throw new ApiException(400, "Invalid maze. Width and height don't match the number of points given");

            if (mazeFE.PointList.Count(p => p.Value == 1) != 1)
                throw new ApiException(400, "Invalid maze. No start point given");

            if (mazeFE.PointList.Count(p => p.Value == 2) != 1)
                throw new ApiException(400, "Invalid maze. No end point given");

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

            if((startPoint.I == endPoint.I && Math.Abs(startPoint.J - endPoint.J) == 1) || 
               (startPoint.J == endPoint.J && Math.Abs(startPoint.I - endPoint.I) == 1))
            {
                throw new ApiException(400, "Invalid maze. Start point right next to end point");
            }

            int[,] res = Solve(matrix, startPoint, endPoint, mazeFE.Width, mazeFE.Height);

            if (matrix[endPoint.I, endPoint.J] == 0)
                throw new ApiException(400, "Invalid maze. No solution found");

            List<Point> solution = new List<Point>();

            int[] di = { -1, 0, 1, 0 };
            int[] dj = { 0, 1, 0, -1 };

            // parse solution
            Point currPoint = new Point(endPoint.I, endPoint.J, res[endPoint.I, endPoint.J]);
            while (true)
            {
                Point nextPoint = Point.Default;
                Point bestNextPoint = Point.Default;
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

            StringBuilder retSolution = new StringBuilder(new string('0', mazeFE.Width * mazeFE.Height));
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
                throw new ApiException(400, "Invalid maze. Width and height don't match the number of points given");

            if (mazeFE.PointList.Count(p => p.Value == 1) != 1)
                throw new ApiException(400, "Invalid maze. No start point given");

            if (mazeFE.PointList.Count(p => p.Value == 2) != 1)
                throw new ApiException(400, "Invalid maze. No end point given");

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

            if ((startPoint.I == endPoint.I && Math.Abs(startPoint.J - endPoint.J) == 1) ||
                (startPoint.J == endPoint.J && Math.Abs(startPoint.I - endPoint.I) == 1))
            {
                throw new ApiException(400, "Invalid maze. Start point right next to end point");
            }

            int[,] res = Solve(matrix, startPoint, endPoint, mazeFE.Width, mazeFE.Height);

            if (matrix[endPoint.I, endPoint.J] == 0)
                throw new ApiException(400, "Invalid maze. No solution found");
            
            endPoint.Value = matrix[endPoint.I, endPoint.J];

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
                Point nextPoint, bestNextPoint = Point.Default;
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

            solution.Sort((p1, p2) => p1.Value.CompareTo(p2.Value));
            return new MazeVisualizerDTO(visitedPoints, solution);
        }

        private int[,] Solve(int[,] matrix, Point startPoint, Point endPoint, int matrixWidth, int matrixHeight)
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

            return matrix;
        }
    }
}
