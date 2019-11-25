using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using aMAZEing.DTOs;
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

        public UserDTO CreateUser(User user)
        {
            User storedUser = User.Create(user.Username, HashPassword(user.Password));

            if (_userRepository.FindByUsername(storedUser.Username) == null)
            {
                User retUser = _userRepository.Create(storedUser);

                if (retUser == null)
                    return null;

                return UserDTO.Builder()
                    .Id(retUser.Id)
                    .Username(retUser.Username)
                    .Build();
            }

            _logger.LogError("Username {0} already in database\n\n", storedUser.Username);
            return null;
        }

        public List<UserDTO> GetAllUsers()
        {
            return _userRepository.GetAll()
                .Select(user => UserDTO.Builder()
                    .Id(user.Id)
                    .Username(user.Username)
                    .Build())
                .ToList();
        }

        public UserDTO GetUserById(Guid id)
        {
            User retUser = _userRepository.FindById(id);

            if (retUser == null)
                return null;

            return UserDTO.Builder()
                .Id(retUser.Id)
                .Username(retUser.Username)
                .Build();
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
