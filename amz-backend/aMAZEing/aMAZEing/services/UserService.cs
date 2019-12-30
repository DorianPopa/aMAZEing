using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using aMAZEing.DTOs;
using aMAZEing.errors;
using aMAZEing.models;
using aMAZEing.repositories;
using aMAZEing.utils;
using Microsoft.Extensions.Logging;

namespace aMAZEing.services
{
    public class UserService
    {
        private readonly ILogger<UserService> _logger;

        private readonly UserRepository _userRepository;
        private readonly MazeRepository _mazeRepository;
        private readonly UserMazeRepository _userMazeRepository;

        public UserService(ILogger<UserService> logger, UserRepository userRepository, MazeRepository mazeRepository, UserMazeRepository userMazeRepository)
        {
            _logger = logger;
            _userRepository = userRepository;
            _mazeRepository = mazeRepository;
            _userMazeRepository = userMazeRepository;
        }

        public UserDTO CreateUser(User user)
        {
            User storedUser = User.Create(user.Username, HashPassword(user.Password));

            if (_userRepository.FindByUsername(storedUser.Username) == null)
            {
                User retUser = _userRepository.Create(storedUser);

                if (retUser == null)
                    throw new ApiException(500, "Username could not be created");

                return UserDTO.Builder()
                    .Id(retUser.UserId)
                    .Username(retUser.Username)
                    .Build();
            }

            _logger.LogError("Username {0} already in database\n\n", storedUser.Username);
            throw new ApiException(400, "Username " + storedUser.Username + " already in database");
        }

        public List<UserDTO> GetAllUsers()
        {
            return _userRepository.GetAll()
                .Select(BuildUserDTOFromUser)
                .ToList();
        }

        public UserDTO GetUserById(Guid id)
        {
            User retUser = _userRepository.FindById(id);

            if (retUser == null)
                return null;

            return BuildUserDTOFromUser(retUser);
        }

        private UserDTO BuildUserDTOFromUser(User user)
        {
            user.UserMazes = _userMazeRepository.FindOwnMazesByUserId(user.UserId);
            List<MazeDTO> ownMazes = new List<MazeDTO>();

            foreach (UserMaze um in user.UserMazes)
            {
                Maze m = _mazeRepository.FindById(um.MazeId); 
                int playersCount = _userMazeRepository.PlayersCountByMazeId(m.MazeId);

                MazeDTO mDTO = MazeDTO.Builder()
                    .Id(m.MazeId)
                    .Name(m.Name)
                    .PlayersCount(playersCount)
                    .Width(m.Width)
                    .Height(m.Height)
                    .State(m.State.DecompressString())
                    .Solution(m.Solution.DecompressString())
                    .CreationTime(m.CreationTime)
                    .Build();

                ownMazes.Add(mDTO);
            }

            return UserDTO.Builder()
                .Id(user.UserId)
                .Username(user.Username)
                .OwnMazes(ownMazes)
                .Build();
        }

        private string HashPassword(string password)
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
