using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace aMAZEing.models
{
    public class User
    {
        private User()
        {

        }

        public static User Create(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                throw new ArgumentException();

            return new User
            {
                UserId = Guid.NewGuid(),
                Username = username,
                Password = password
            };
        }

        [Required]
        public Guid UserId { get; set; }

        [Required]
        [Index(IsUnique = true)]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public virtual ICollection<UserMaze> UserMazes { get; set; }
    }
}
