using System;
using System.Collections.Generic;
using System.Linq;
using aMAZEing.DTOs;
using aMAZEing.errors;
using aMAZEing.models;
using aMAZEing.repositories;
using aMAZEing.utils;
using Microsoft.Extensions.Logging;

namespace aMAZEing.services
{
    public class MazeService
    {
        private readonly ILogger<MazeService> _logger;

        private readonly IBfsService _bfsService;
        private readonly IAStarService _aStarService;
        private readonly IBfsTwoWayService _bfsTwoWayService;

        private readonly UserRepository _userRepository;
        private readonly MazeRepository _mazeRepository;
        private readonly UserMazeRepository _userMazeRepository;

        public MazeService(ILogger<MazeService> logger, IBfsService bfsService, IAStarService aStarService, IBfsTwoWayService bfsTwoWayService,
            UserRepository userRepository, MazeRepository mazeRepository, UserMazeRepository userMazeRepository)
        {
            _logger = logger;
            _bfsService = bfsService;
            _aStarService = aStarService;
            _bfsTwoWayService = bfsTwoWayService;

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
                _logger.LogError("User with id " + userId.ToString() + " not in database\n\n");
                throw new ApiException(404, "User with id " + userId.ToString() + " not in database");
            }

            string solution;
            try
            {
                solution = _bfsService.ValidateMaze(maze);
            }
            catch (ApiException e)
            {
                _logger.LogError(e.Message);
                throw e;
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
                .CreationTime(storedMaze.CreationTime)
                .Build();
        }

        public MazeVisualizerDTO Visualize(MazeFE maze, string algorithm)
        {
            try
            {
                if ("BFS".Equals(algorithm))
                    return _bfsService.Visualize(maze);
                
                if ("A-STAR".Equals(algorithm))
                    return _aStarService.Visualize(maze);
                
                if ("BIDIRECTIONAL-BFS".Equals(algorithm))
                    return _bfsTwoWayService.Visualize(maze);

                throw new ApiException(400, "No such algorithm available");
            }
            catch (ApiException e)
            {
                throw e;
            }
        }

        private Maze BuildMazeFromMazeFE(MazeFE mazeFE, string solution)
        {
            string state = "";
            foreach (Point point in mazeFE.PointList)
            {
                state += point.Value;
            }

            Maze maze = Maze.Create(mazeFE.Name, mazeFE.Width, mazeFE.Height, state.CompressString(), solution.CompressString());
            return maze;
        }

        public Score Submit(Guid mazeId, string userId, MazeFE userSolution)
        {
            Guid userGuid = new Guid(userId);
            User user = _userRepository.FindById(userGuid);

            if (_userMazeRepository.FindById(mazeId, userGuid) != null)
                throw new ApiException(403, "Already submitted solution for this maze");

            if (!ValidateUserSolution(userSolution))
                throw new ApiException(400, "Invalid solution");

            Maze maze = _mazeRepository.FindById(mazeId);
            int userSolutionSize = userSolution.PointList.Count(p => p.Value == 4);
            int deviation = Convert.ToInt32((userSolutionSize - maze.Solution.Length) * 100 / maze.Solution.Length);
            int accuracy = Math.Max(0, 100 - deviation);

            string userSolutionString = "";
            foreach (Point point in userSolution.PointList)
            {
                userSolutionString += point.Value;
            }

            UserMaze um = UserMaze.Create(user, maze, "LOCKED", true, accuracy, userSolutionString);
            _userMazeRepository.Create(um);

            return new Score(accuracy);
        }

        public List<MazeDTO> GetAllMazes(string userId)
        {
            Guid userGuid = new Guid(userId);

            return _mazeRepository.GetAll()
                .Select(maze => BuildMazeDTOFromMaze(maze, userGuid))
                .ToList();
        }

        public MazeDTO GetMazeById(Guid id)
        {
            Maze retMaze = _mazeRepository.FindById(id);

            if (retMaze == null)
                return null;

            return BuildMazeDTOFromMaze(retMaze);
        }

        public MazeSolution GetMazeSolution(Guid mazeId, string userId)
        {
            Maze maze = _mazeRepository.FindById(mazeId);

            Guid userGuid = new Guid(userId);
            User user = _userRepository.FindById(userGuid);

            UserMaze userMaze = _userMazeRepository.FindById(mazeId, userGuid);
            if (userMaze != null) 
            {
                _userMazeRepository.Update(maze.MazeId, user.UserId, "LOCKED", true);
            }
            else
            {
                userMaze = UserMaze.Create(user, maze, "LOCKED", true, 0, String.Empty);
                _userMazeRepository.Create(userMaze);
            }

            if (maze == null)
                return null;

            return new MazeSolution(maze.Solution.DecompressString(), maze.Width);
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
                .CreationTime(maze.CreationTime)
                .Build();
        }

        private MazeDTO BuildMazeDTOFromMaze(Maze maze, Guid userId)
        {
            int playersCount = _userMazeRepository.PlayersCountByMazeId(maze.MazeId);
            UserMaze userMaze = _userMazeRepository.FindOwnByMazeId(maze.MazeId);
            User user = _userRepository.FindById(userMaze.UserId);

            UserMaze userMazeSolved = _userMazeRepository.FindById(maze.MazeId, userId);
            bool solved = false;
            if (userMazeSolved != null)
                solved = userMazeSolved.Solved;

            return MazeDTO.Builder()
                .Id(maze.MazeId)
                .Name(maze.Name)
                .OwnerId(user.UserId)
                .Owner(user.Username)
                .PlayersCount(playersCount)
                .Width(maze.Width)
                .Height(maze.Height)
                .State(maze.State.DecompressString())
                .CreationTime(maze.CreationTime)
                .Solved(solved)
                .Build();
        }

        private bool ValidateUserSolution(MazeFE maze)
        {
            int[,] matrix = new int[maze.Height, maze.Width];
            Point startPoint = Point.Default;
            Point endPoint = Point.Default;

            foreach (Point p in maze.PointList)
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
                else if (p.Value == 4)
                {
                    matrix[p.I, p.J] = 4;
                }
            }

            int[] di = { -1, 0, 1, 0 };
            int[] dj = { 0, 1, 0, -1 };

            for (int i = 0; i < maze.Height; i++)
            {
                for (int j = 0; j < maze.Width; j++)
                {
                    if (matrix[i, j] == 4)
                    {
                        int solNeighbourCount = 0;
                        int startNeighbourCount = 0;
                        int endNeighbourCount = 0;

                        for (int k = 0; k <= 3; k++)
                        {
                            int nextPointValue = matrix[i + di[k], j + dj[k]];

                            if (nextPointValue == 4)        solNeighbourCount++;
                            else if (nextPointValue == 1)   startNeighbourCount++;
                            else if (nextPointValue == 2)   endNeighbourCount++;
                        }

                        if (solNeighbourCount == 2 && startNeighbourCount == 0 && endNeighbourCount == 0)   continue;
                        if (solNeighbourCount == 1 && ((startNeighbourCount ^ endNeighbourCount) == 1))     continue;
                        if (solNeighbourCount == 0 && ((startNeighbourCount + endNeighbourCount) == 2))     continue;

                        return false;
                    }
                }
            }

            return true;
        }
    }
}
