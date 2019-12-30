using aMAZEing.DTOs;
using aMAZEing.utils;

namespace aMAZEing.services
{
    public interface IAlgorithmService
    {
        MazeVisualizerDTO Visualize(MazeFE mazeFE);
    }
}