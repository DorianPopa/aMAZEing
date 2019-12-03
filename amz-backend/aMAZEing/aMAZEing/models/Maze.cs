using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace aMAZEing.models
{
    public class Maze
    {
        private Maze()
        {

        }

        public static Maze Create(String name, int width, int height, String state, String solution)
        {
            if (string.IsNullOrEmpty(name) || width == 0 || height == 0)
                throw new ArgumentException();

            return new Maze
            {
                MazeId = Guid.NewGuid(),
                Name = name,
                Width = width,
                Height = height,
                State = state,
                Solution = solution,
                CreationTime = DateTime.Now
            };
        }

        [Required]
        public Guid MazeId { get; set; }

        [Required]
        public String Name { get; set; }

        [Required]
        public int Width { get; set; }

        [Required]
        public int Height { get; set; }

        [Required]
        public String State { get; set; }

        [Required]
        public String Solution { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        public virtual ICollection<UserMaze> UserMazes { get; set; }
    }
}
