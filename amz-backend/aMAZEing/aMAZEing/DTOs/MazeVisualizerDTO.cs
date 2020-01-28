using System.Collections.Generic;
using aMAZEing.utils;

namespace aMAZEing.DTOs
{
    public class MazeVisualizerDTO
    {
        public List<Point> VisitedPoints { get; private set; }

        public List<Point> Solution { get; private set; }

        public MazeVisualizerDTO(List<Point> visitedPoints, List<Point> solution)
        {
            this.VisitedPoints = visitedPoints;
            this.Solution = solution;
        }

        public MazeVisualizerDTO()
        {
        }
    }
}
