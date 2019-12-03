using System;
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

        public MazeService(ILogger<MazeService> logger, IAlgorithmService bfs_Service, UserRepository userRepository, MazeRepository mazeRepository, UserMazeRepository userMazeRepository)
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

        // TODO return MazeDTO
        public UserMaze CreateMazeByUserId(Guid userId, MazeFE maze)
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
            return _userMazeRepository.Create(userMaze);
        }

        private Maze BuildMazeFromMazeFE(MazeFE mazeFE, String solution)
        {
            String state = "";
            foreach (Point point in mazeFE.PointList)
            {
                state += point.Value;
            }
            
            Maze maze = Maze.Create(mazeFE.Name, mazeFE.Width, mazeFE.Height, state.CompressString(), solution.CompressString());
            return maze;
        }
    }
}
