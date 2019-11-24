using System;
using System.Security.Cryptography;
using System.Text;
using aMAZEing.models;
using aMAZEing.repositories;
using Microsoft.Extensions.Logging;

namespace aMAZEing.services
{
    public class UserService
    {
        private readonly ILogger<UserService> _logger;
        private readonly UserRepository _userRepository;

        public UserService(ILogger<UserService> logger, UserRepository userRepository)
        {
            _logger = logger;
            _userRepository = userRepository;
        }

        public Guid CreateUser(User user)
        {
            User storedUser = User.Create(user.Username, HashPassword(user.Password));

            if (_userRepository.FindByUsername(storedUser.Username) == null)
                return _userRepository.CreateUser(storedUser);

            _logger.LogError("Username {0} already in database\n\n", storedUser.Username);
            return Guid.Empty;
        }

        private String HashPassword(String password)
        {
            using (var sha256 = SHA256.Create())
            {
                // plain text to hash
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));

                // return the hashed string  
                return BitConverter.ToString(hashedBytes).Replace("-", "");
            }
        }
    }
}
