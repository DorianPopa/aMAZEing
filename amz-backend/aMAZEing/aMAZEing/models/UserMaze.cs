using System;
using System.ComponentModel.DataAnnotations;

namespace aMAZEing.models
{
    public class UserMaze
    {
        private UserMaze()
        {
        }

        public static UserMaze Create(User user, Maze maze)
        {
            return new UserMaze
            {
                UserId = user.UserId,
                MazeId = maze.MazeId,
                State = "OWN",
                Solved = false,
                Accuracy = null,
                UserSolution = String.Empty
            };
        }

        public static UserMaze Create(User user, Maze maze, string state, bool solved, int accuracy, string userSolution)
        {
            return new UserMaze
            {
                UserId = user.UserId,
                MazeId = maze.MazeId,
                State = state,
                Solved = solved,
                Accuracy = accuracy,
                UserSolution = userSolution
            };
        }

        public Guid UserId { get; set; }

        public Guid MazeId { get; set; }

        public virtual User User { get; set; }
        public virtual Maze Maze { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public bool Solved { get; set; }

        public int? Accuracy { get; set; }

        public string UserSolution { get; set; }
    }
}
