using System;
using System.Collections.Generic;
using System.Linq;
using aMAZEing.models;
using Microsoft.Extensions.Logging;

namespace aMAZEing.repositories
{
    public class MazeRepository
    {
        private readonly ILogger<MazeRepository> _logger;
        private readonly DatabaseContext _context;

        public MazeRepository()
        {
        }

        public MazeRepository(ILogger<MazeRepository> logger, DatabaseContext context)
        {
            _logger = logger;
            _context = context;
        }

        public virtual Maze Create(Maze maze)
        {
            _context.Mazes.Add(maze);
            var result = _context.SaveChanges();

            // ensure maze saved to db
            if (result > 0)
            {
                _logger.LogInformation("Maze with Id {0} saved into database\n\n", maze.MazeId);
                return maze;
            }
            else
            {
                _logger.LogError("Server error! Maze with Id {0} not saved into database\n\n", maze.MazeId);
                return null;
            }
        }

        public virtual Maze FindById(Guid id)
        {
            return _context.Mazes.FirstOrDefault(m => m.MazeId == id);
        }

        public virtual List<Maze> GetAll()
        {
            return _context.Mazes.ToList();
        }

        public virtual void Delete(Guid id)
        {
            _context.Mazes.Remove(FindById(id));
            _context.SaveChanges();
        }
    }
}
