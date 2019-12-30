using System;
using System.Collections.Generic;
using aMAZEing.DTOs;
using aMAZEing.models;
using aMAZEing.utils;

namespace aMAZEing.services
{
    public interface IMazeService
    {
        Maze CreateMaze(Maze maze);
        MazeDTO CreateMazeByUserId(Guid userId, MazeFE maze);
        List<MazeDTO> GetAllMazes();
        MazeDTO GetMazeById(Guid id);
        MazeVisualizerDTO Visualize(MazeFE maze, string algorithm);
    }
}