using System.Collections.Generic;
using System.Linq;
using System.Text;
using aMAZEing.DTOs;
using aMAZEing.errors;
using aMAZEing.utils;

namespace aMAZEing.services
{
    public class AStarService : IAStarService
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

            if ((startPoint.I == endPoint.I && System.Math.Abs(startPoint.J - endPoint.J) == 1) ||
                (startPoint.J == endPoint.J && System.Math.Abs(startPoint.I - endPoint.I) == 1))
            {
                throw new ApiException(400, "Invalid maze. Start point right next to end point");
            }

            MazeVisualizerDTO solution = Solve(matrix, startPoint, endPoint, mazeFE.Width, mazeFE.Height);
            
            if(!solution.Solution.Any())
                throw new ApiException(400, "Invalid maze. No solution found");

            StringBuilder retSolution = new StringBuilder(new string('0', mazeFE.Width * mazeFE.Height));
            foreach (Point p in solution.Solution)
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

            if ((startPoint.I == endPoint.I && System.Math.Abs(startPoint.J - endPoint.J) == 1) ||
                (startPoint.J == endPoint.J && System.Math.Abs(startPoint.I - endPoint.I) == 1))
            {
                throw new ApiException(400, "Invalid maze. Start point right next to end point");
            }

            MazeVisualizerDTO solution = Solve(matrix, startPoint, endPoint, mazeFE.Width, mazeFE.Height);

            if (!solution.Solution.Any())
                throw new ApiException(400, "Invalid maze. No solution found");

            return solution;
        }

        private MazeVisualizerDTO Solve(int[,] matrix, Point startPoint, Point endPoint, int matrixWidth, int matrixHeight)
        {
            List<Point> visitedPoints = new List<Point>();
            List<Point> solution = new List<Point>();

            Dictionary<Point, Point> parentDict = new Dictionary<Point, Point>();

            PriorityQueue<double, Point> pQueue = new PriorityQueue<double, Point>(new PriorityQueue_MinComparer());
            Point current = startPoint;
            pQueue.Enqueue(current.DistanceTo(endPoint), current);

            while (!pQueue.IsEmpty)
            {
                current = pQueue.DequeueValue();

                if (current.DistanceTo(endPoint) <= 1.0) //exclude destination from solution
                {
                    solution = ParseSolution(current, parentDict, startPoint);
                    break;
                }

                int[] offsets = { 1, 0, 0, -1, -1, 0, 0, 1 };
                for (int i = 0; i < offsets.Length; i += 2)
                {
                    int next_i = current.I + offsets[i];
                    int next_j = current.J + offsets[i + 1];
                    Point tempPoint = new Point(next_i, next_j, current.Value + 1);
                    parentDict.TryAdd(tempPoint, current);

                    bool alreadyVisited = false;
                    foreach (Point p in visitedPoints)
                        if (p.I == tempPoint.I && p.J == tempPoint.J)
                            alreadyVisited = true;
                    if (next_i >= 0 && next_i < matrixHeight && next_j >= 0 && next_j < matrixWidth && matrix[next_i, next_j] != -1 && !alreadyVisited)
                    {
                        double distance = tempPoint.DistanceTo(endPoint);
                        pQueue.Enqueue(distance, tempPoint);
                        visitedPoints.Add(tempPoint);
                    }
                }
            }

            visitedPoints.Sort((p1, p2) => p1.Value.CompareTo(p2.Value));
            solution.Sort((p1, p2) => p1.Value.CompareTo(p2.Value));
            return new MazeVisualizerDTO(visitedPoints, solution);
        }

        private List<Point> ParseSolution(Point currentPoint, Dictionary<Point, Point> parentDict, Point startPoint)
        {
            List<Point> solution = new List<Point>();
            while (true)
            {
                if (currentPoint.I == startPoint.I && currentPoint.J == startPoint.J)
                    break;
                solution.Add(currentPoint);
                currentPoint = parentDict[currentPoint];
            }

            return solution;
        }
    }
}
