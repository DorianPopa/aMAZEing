using aMAZEing.DTOs;
using aMAZEing.utils;

namespace aMAZEing.services
{
    public interface IVisualizer
    {
        MazeVisualizerDTO Visualize(MazeFE mazeFE);
    }
}
