using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace aMAZEing.models
{
    public class User
    {
        private User()
        {

        }

        public static User Create(String username, String password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                throw new ArgumentException();

            return new User
            {
                Id = Guid.NewGuid(),
                Username = username,
                Password = password
            };
        }

        [Required]
        public Guid Id { get; private set; }

        [Required]
        [Index(IsUnique = true)]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
