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
            _context.SaveChanges();

            // ensure UserMaze saved to db
            UserMaze retUserMaze = FindById(userMaze.MazeId, userMaze.UserId);
            if (new Guid(retUserMaze.UserId.ToString()) == userMaze.UserId && new Guid(retUserMaze.MazeId.ToString()) == userMaze.MazeId)
            {
                _logger.LogInformation("UserMaze with UserId {0} and MazeId {1} saved into database\n\n", userMaze.UserId, userMaze.MazeId);
                return retUserMaze;
            }

            _logger.LogError("Server error! UserMaze with UserId {0} and MazeId {1} not saved into database\n\n", userMaze.UserId, userMaze.MazeId);
            return null;
        }

        public virtual UserMaze FindById(Guid mazeId, Guid userId)
        {
            return _context.UserMazes.FirstOrDefault(um => (um.MazeId == mazeId && um.UserId == userId));
        }

        public virtual List<UserMaze> FindOwnMazesByUserId(Guid id)
        {
            return _context.UserMazes.Where(um => um.UserId == id && um.State.Equals("OWN")).ToList();
        }

        public virtual int PlayersCountByMazeId(Guid mazeId)
        {
            return _context.UserMazes.Where(um => um.MazeId == mazeId).ToList().Count() - 1; // exclude owner
        }
    }
}
