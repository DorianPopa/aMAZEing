using System;
using System.Collections.Generic;
using System.Linq;
using aMAZEing.DTOs;
using aMAZEing.errors;
using aMAZEing.utils;

namespace aMAZEing.services
{
    public class BfsTwoWayService : IBfsTwoWayService
    {
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
                    endPoint.Value = 1;
                    matrix[p.I, p.J] = 1;
                }
                else if (p.Value == 3)
                {
                    matrix[p.I, p.J] = -1;
                }
            }

            try
            {
                return Solve(matrix, startPoint, endPoint, mazeFE.Width, mazeFE.Height);
            }
            catch (ApiException e)
            {
                throw e;
            }
        }

        private MazeVisualizerDTO Solve(int[,] matrix, Point startPoint, Point endPoint, int matrixWidth, int matrixHeight)
        {
            List<Point> visitedPointsStart = new List<Point>();
            List<Point> visitedPointsEnd = new List<Point>();

            int[] di = { -1, 0, 1, 0 };
            int[] dj = { 0, 1, 0, -1 };

            Queue<Point> queueStart = new Queue<Point>();
            queueStart.Enqueue(startPoint);
            Queue<Point> queueEnd = new Queue<Point>();
            queueEnd.Enqueue(endPoint);

            Boolean foundSolution = false;
            Point middlePoint = default;
            int middleValue = 0, distFromOrigin = 0;
            while (!foundSolution)
            {
                distFromOrigin += 1;

                while (queueStart.Count() != 0 && queueStart.Peek().Value == distFromOrigin)
                {
                    Point currPoint = queueStart.Dequeue();
                    for (int i = 0; i <= 3 && !foundSolution; ++i)
                    {
                        int next_i = currPoint.I + di[i];
                        int next_j = currPoint.J + dj[i];

                        if (next_i >= 0 && next_i < matrixHeight && next_j >= 0 && next_j < matrixWidth)
                        {
                            // simulate Contains
                            foreach (var point in visitedPointsEnd)
                            {
                                if (point.I == next_i && point.J == next_j)
                                {
                                    middlePoint = new Point(next_i, next_j, currPoint.Value + 1);
                                    middleValue = point.Value;
                                    foundSolution = true;
                                    break;
                                }
                            }

                            if (!foundSolution && matrix[next_i, next_j] == 0)
                            {
                                Point nextPoint = new Point(next_i, next_j, currPoint.Value + 1);

                                queueStart.Enqueue(nextPoint);
                                matrix[next_i, next_j] = matrix[currPoint.I, currPoint.J] + 1;
                                visitedPointsStart.Add(nextPoint);
                            }
                        }
                    }
                }

                while (!foundSolution && queueEnd.Count() != 0 && queueEnd.Peek().Value == distFromOrigin)
                {
                    Point currPoint = queueEnd.Dequeue();
                    for (int i = 0; i <= 3; ++i)
                    {
                        int next_i = currPoint.I + di[i];
                        int next_j = currPoint.J + dj[i];

                        if (next_i >= 0 && next_i < matrixHeight && next_j >= 0 && next_j < matrixWidth)
                        {
                            // simulate Contains
                            foreach (var point in visitedPointsStart)
                            {
                                if (point.I == next_i && point.J == next_j)
                                {
                                    middlePoint = new Point(next_i, next_j, currPoint.Value + 1);
                                    middleValue = point.Value;
                                    foundSolution = true;
                                    break;
                                }
                            }

                            if (!foundSolution && matrix[next_i, next_j] == 0)
                            {
                                Point nextPoint = new Point(next_i, next_j, currPoint.Value + 1);

                                queueEnd.Enqueue(nextPoint);
                                matrix[next_i, next_j] = matrix[currPoint.I, currPoint.J] + 1;
                                visitedPointsEnd.Add(nextPoint);
                            }
                        }
                    }
                }

                if (!queueStart.Any() && !queueEnd.Any())
                    break;
            }

            if (!foundSolution)
                throw new ApiException(400, "Invalid maze. No solution found");

            List<Point> solution = new List<Point>();

            Point curr = middlePoint;
            int distToOrigin = middlePoint.Value;
            while (distToOrigin > 2)
            {
                distToOrigin -= 1;

                bool added = false;
                for (int i = 0; i <= 3 && !added; ++i)
                {
                    int next_i = curr.I + di[i];
                    int next_j = curr.J + dj[i];

                    Point next = new Point(next_i, next_j, distToOrigin);

                    foreach (var point in visitedPointsStart)
                    {
                        if (point.I == next.I && point.J == next.J && point.Value == next.Value)
                        {
                            solution.Add(next);
                            added = true;

                            curr = next;
                            break;
                        }
                    }
                }
            }

            curr = middlePoint;
            distToOrigin = middlePoint.Value;
            while (distToOrigin > 2)
            {
                distToOrigin -= 1;

                bool added = false;
                for (int i = 0; i <= 3 && !added; ++i)
                {
                    int next_i = curr.I + di[i];
                    int next_j = curr.J + dj[i];

                    Point next = new Point(next_i, next_j, distToOrigin);

                    foreach (var point in visitedPointsEnd)
                    {
                        if (point.I == next.I && point.J == next.J && point.Value == next.Value)
                        { 
                            solution.Add(next);
                            added = true;

                            curr = next;
                            break;
                        }
                    }
                }
            }

            middlePoint.Value = middleValue;
            solution.Add(middlePoint);
            solution.Sort((p1, p2) => p1.Value.CompareTo(p2.Value));

            visitedPointsStart.AddRange(visitedPointsEnd);
            visitedPointsStart.Sort((p1, p2) => p1.Value.CompareTo(p2.Value));

            return new MazeVisualizerDTO(visitedPointsStart, solution);
        }
    }
}
