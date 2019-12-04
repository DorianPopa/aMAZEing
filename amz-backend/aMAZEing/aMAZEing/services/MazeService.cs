using System;
using System.Collections.Generic;
using System.Linq;
using aMAZEing.DTOs;
using aMAZEing.models;
using aMAZEing.repositories;
using aMAZEing.utils;
using Microsoft.Extensions.Logging;

namespace aMAZEing.services
{
    public class MazeService
    {
        private readonly ILogger<MazeService> _logger;
        private readonly IAlgorithmService _bfs_Service;

        private readonly UserRepository _userRepository;
        private readonly MazeRepository _mazeRepository;
        private readonly UserMazeRepository _userMazeRepository;

        public MazeService(ILogger<MazeService> logger, IAlgorithmService bfs_Service, UserRepository userRepository,
            MazeRepository mazeRepository, UserMazeRepository userMazeRepository)
        {
            _logger = logger;
            _bfs_Service = bfs_Service;

            _userRepository = userRepository;
            _mazeRepository = mazeRepository;
            _userMazeRepository = userMazeRepository;
        }

        public Maze CreateMaze(Maze maze)
        {
            Maze storedMaze = Maze.Create(maze.Name, maze.Width, maze.Height, maze.State, maze.Solution);
            Maze retMaze = _mazeRepository.Create(storedMaze);

            return retMaze;
        }

        public MazeDTO CreateMazeByUserId(Guid userId, MazeFE maze)
        {
            User user = _userRepository.FindById(userId);
            if (user == null)
            {
                _logger.LogError("User with id {0} not in database\n\n", userId.ToString());
                return null;
            }

            String solution = _bfs_Service.ValidateMaze(maze);
            if (String.IsNullOrEmpty(solution))
            {
                _logger.LogError("Invalid Solution\n\n");
                return null;
            }

            Maze mazeBE = BuildMazeFromMazeFE(maze, solution);
            Maze storedMaze = CreateMaze(mazeBE);

            UserMaze userMaze = UserMaze.Create(user, storedMaze);
            UserMaze retUserMaze = _userMazeRepository.Create(userMaze);

            return MazeDTO.Builder()
                .Id(storedMaze.MazeId)
                .Name(storedMaze.Name)
                .OwnerId(user.UserId)
                .Owner(user.Username)
                .PlayersCount(0)
                .Width(storedMaze.Width)
                .Height(storedMaze.Height)
                .State(storedMaze.State.DecompressString())
                .Solution(storedMaze.Solution.DecompressString())
                .CreationTime(storedMaze.CreationTime)
                .Build();
        }

        public List<Point> Visualize(MazeFE maze, String algorithm)
        {
            if (algorithm.ToUpper().Equals("BFS"))
                return _bfs_Service.Visualize(maze);
            else
            {
                // to be updated
                return _bfs_Service.Visualize(maze);
            }
        }

        private Maze BuildMazeFromMazeFE(MazeFE mazeFE, String solution)
        {
            String state = "";
            foreach (Point point in mazeFE.PointList)
            {
                state += point.Value;
            }

            Maze maze = Maze.Create(mazeFE.Name, mazeFE.Width, mazeFE.Height, state.CompressString(),
                solution.CompressString());
            return maze;
        }

        public List<MazeDTO> GetAllMazes()
        {
            return _mazeRepository.GetAll()
                .Select(BuildMazeDTOFromMaze)
                .ToList();
        }

        public MazeDTO GetMazeById(Guid id)
        {
            Maze retMaze = _mazeRepository.FindById(id);

            if (retMaze == null)
                return null;

            return BuildMazeDTOFromMaze(retMaze);
        }

        private MazeDTO BuildMazeDTOFromMaze(Maze maze)
        {
            int playersCount = _userMazeRepository.PlayersCountByMazeId(maze.MazeId);
            UserMaze userMaze = _userMazeRepository.FindOwnByMazeId(maze.MazeId);
            User user = _userRepository.FindById(userMaze.UserId);

            return MazeDTO.Builder()
                .Id(maze.MazeId)
                .Name(maze.Name)
                .OwnerId(user.UserId)
                .Owner(user.Username)
                .PlayersCount(playersCount)
                .Width(maze.Width)
                .Height(maze.Height)
                .State(maze.State.DecompressString())
                .Solution(maze.Solution.DecompressString())
                .CreationTime(maze.CreationTime)
                .Build();
        }
    }
}
