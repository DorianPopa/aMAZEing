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

        public static Maze Create(string name, int width, int height, string state, string solution)
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
                CreationTime = DateTime.UtcNow
            };
        }

        [Required]
        public Guid MazeId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Width { get; private set; }

        [Required]
        public int Height { get; private set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string Solution { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        public virtual ICollection<UserMaze> UserMazes { get; set; }

        public void SetHeight(int value)
        {
            if(value == 0)
                throw new ArgumentException(nameof(value));

            Height = value;
        }
    }
}
