using aMAZEing.utils;
using aMAZEing.DTOs;

namespace aMAZEing.services
{
    public interface IAlgorithmService
    {
        MazeVisualizerDTO Visualize(MazeFE mazeFE);
    }
}
