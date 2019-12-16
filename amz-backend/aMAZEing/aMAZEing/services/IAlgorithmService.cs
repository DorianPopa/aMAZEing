using aMAZEing.utils;
using System;
using aMAZEing.DTOs;

namespace aMAZEing.services
{
    public interface IAlgorithmService
    {
        String ValidateMaze(MazeFE mazeFE);

        MazeVisualizerDTO Visualize(MazeFE mazeFE);
    }
}
