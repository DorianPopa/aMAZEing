using aMAZEing.utils;
using System;
using System.Collections.Generic;

namespace aMAZEing.services
{
    public interface IAlgorithmService
    {
        String ValidateMaze(MazeFE mazeFE);

        List<Point> Visualize(MazeFE mazeFE);
    }
}
