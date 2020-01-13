using System;
using System.Collections.Generic;
using System.Linq;
using aMAZEing.models;
using Microsoft.Extensions.Logging;

namespace aMAZEing.repositories
{
    public class UserMazeRepository
    {
        private readonly ILogger<UserMazeRepository> _logger;
        private readonly DatabaseContext _context;

        public UserMazeRepository()
        {
        }

        public UserMazeRepository(ILogger<UserMazeRepository> logger, DatabaseContext context)
        {
            _logger = logger;
            _context = context;
        }

        public virtual UserMaze Create(UserMaze userMaze)
        {
            _context.UserMazes.Add(userMaze);
            var result = _context.SaveChanges();

            // ensure UserMaze saved to db
            if (result > 0) 
            {
                _logger.LogInformation("UserMaze with UserId {0} and MazeId {1} saved into database\n\n", userMaze.UserId, userMaze.MazeId);
                return userMaze;
            }
            else
            {
                _logger.LogError("Server error! UserMaze with UserId {0} and MazeId {1} not saved into database\n\n", userMaze.UserId, userMaze.MazeId);
                return null;
            }
        }

        public virtual UserMaze Update(Guid mazeId, Guid userId, string state, bool solved, int accuracy)
        {
            UserMaze userMaze = FindById(mazeId, userId);
            userMaze.State = state;
            userMaze.Solved = solved;
            userMaze.Accuracy = accuracy;
            _context.SaveChanges();

            return userMaze;
        }

        public virtual UserMaze Update(Guid mazeId, Guid userId, string state, bool solved)
        {
            UserMaze userMaze = FindById(mazeId, userId);
            userMaze.State = state;
            userMaze.Solved = solved;
            _context.SaveChanges();

            return userMaze;
        }

        public virtual UserMaze FindById(Guid mazeId, Guid userId)
        {
            return _context.UserMazes.FirstOrDefault(um => (um.MazeId == mazeId && um.UserId == userId));
        }

        public virtual UserMaze FindOwnByMazeId(Guid mazeId)
        {
            return _context.UserMazes.FirstOrDefault(um => (um.MazeId == mazeId && um.State.Equals("OWN")));
        }

        public virtual List<UserMaze> FindOwnMazesByUserId(Guid id)
        {
            return _context.UserMazes.Where(um => um.UserId == id && um.State.Equals("OWN")).ToList();
        }

        public virtual List<UserMaze> FindLockedMazesByUserId(Guid id)
        {
            return _context.UserMazes.Where(um => um.UserId == id && um.State.Equals("LOCKED")).ToList();
        }

        public virtual int PlayersCountByMazeId(Guid mazeId)
        {
            return _context.UserMazes.Where(um => um.MazeId == mazeId).ToList().Count() - 1; // exclude owner
        }
    }
}
