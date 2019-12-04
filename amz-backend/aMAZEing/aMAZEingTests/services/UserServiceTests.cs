using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using aMAZEing.DTOs;
using aMAZEing.models;
using aMAZEing.repositories;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Moq;

namespace aMAZEing.services.Tests
{
    [TestClass()]
    public class UserServiceTests
    {
        private static UserService _sutUserService;

        private static ILogger<UserService> GetUserServiceLogger()
        {
            var serviceProvider = new ServiceCollection()
                .AddLogging()
                .BuildServiceProvider();

            var factory = serviceProvider.GetService<ILoggerFactory>();

            var logger = factory.CreateLogger<UserService>();
            return logger;
        }

        

        [TestMethod()]
        public void CreateUser_ShouldReturnNull_WhenUsernameAlreadyInDatabase()
        {
            //Arrange
            User user = User.Create("user.in.db", "my_Pass");
            User storedUser = User.Create("user.in.db", "8F59105B5953EF266DD8E1429C9EA5EDC8BCD0B4BECB4404C15A606EE5373520");
            storedUser.UserId = user.UserId;

            var userRepositoryMock = new Mock<UserRepository>();
            userRepositoryMock.Setup(repo => repo.FindByUsername("already.in.db")).Returns(storedUser);

            var mazeRepositoryMock = new Mock<MazeRepository>();
            var userMazeRepositoryMock = new Mock<UserMazeRepository>();
            _sutUserService = new UserService(GetUserServiceLogger(), userRepositoryMock.Object, mazeRepositoryMock.Object, userMazeRepositoryMock.Object);

            //Act
            var retUserDto = _sutUserService.CreateUser(user);

            //Assert
            Assert.AreEqual(null, retUserDto);
        }

        [TestMethod()]
        public void CreateUser_ShouldReturnNull_WhenUsernameNotInDatabaseButAddingToDatabaseFails()
        {
            //Arrange
            User userNotSavedIntoDb = User.Create("server.error", "my_Pass");

            var userRepositoryMock = new Mock<UserRepository>();
            userRepositoryMock.Setup(repo => repo.FindByUsername("server.error")).Returns((User) null);
            userRepositoryMock.Setup(repo => repo.Create(It.IsAny<User>())).Returns((User) null);

            var mazeRepositoryMock = new Mock<MazeRepository>();
            var userMazeRepositoryMock = new Mock<UserMazeRepository>();
            _sutUserService = new UserService(GetUserServiceLogger(), userRepositoryMock.Object, mazeRepositoryMock.Object, userMazeRepositoryMock.Object);

            //Act
            var retUserDTO = _sutUserService.CreateUser(userNotSavedIntoDb);

            //Assert
            Assert.AreEqual(null, retUserDTO);
        }

        [TestMethod()]
        public void CreateUser_ShouldReturnUserDTO_WhenUsernameNotInDatabaseAndAddingToDatabaseSucceeds()
        {
            //Arrange
            User user = User.Create("not.in.db", "my_Pass");
            User storedUser = User.Create("not.in.db", "8F59105B5953EF266DD8E1429C9EA5EDC8BCD0B4BECB4404C15A606EE5373520");
            storedUser.UserId = user.UserId;

            var userRepositoryMock = new Mock<UserRepository>();
            userRepositoryMock.Setup(repo => repo.FindByUsername("not.in.db")).Returns((User)null);
            userRepositoryMock.Setup(repo => repo.Create(It.IsAny<User>())).Returns(storedUser);

            var mazeRepositoryMock = new Mock<MazeRepository>();
            var userMazeRepositoryMock = new Mock<UserMazeRepository>();
            _sutUserService = new UserService(GetUserServiceLogger(), userRepositoryMock.Object, mazeRepositoryMock.Object, userMazeRepositoryMock.Object);

            UserDTO expectUserDto = UserDTO.Builder()
                .Id(user.UserId)
                .Username(user.Username)
                .Build();

            //Act
            var retUserDto = _sutUserService.CreateUser(user);

            //Assert
            Assert.AreEqual(expectUserDto.ToString(), retUserDto.ToString());
        }

        [TestMethod()]
        public void GetUserById_ShouldReturnNull_WhenIdNotDatabase()
        {
            //Arrange
            User storedUser = User.Create("not.in.db", "8F59105B5953EF266DD8E1429C9EA5EDC8BCD0B4BECB4404C15A606EE5373520");

            var userRepositoryMock = new Mock<UserRepository>();
            userRepositoryMock.Setup(repo => repo.FindById(storedUser.UserId)).Returns((User)null);

            var mazeRepositoryMock = new Mock<MazeRepository>();
            var userMazeRepositoryMock = new Mock<UserMazeRepository>();
            _sutUserService = new UserService(GetUserServiceLogger(), userRepositoryMock.Object, mazeRepositoryMock.Object, userMazeRepositoryMock.Object);

            //Act
            var retUserDto = _sutUserService.GetUserById(storedUser.UserId);

            //Assert
            Assert.AreEqual(null, retUserDto);
        }

        [TestMethod()]
        public void GetUserById_ShouldReturnUserDTO_WhenIdInDatabase()
        {
            //Arrange
            User storedUser = User.Create("user.in.db", "8F59105B5953EF266DD8E1429C9EA5EDC8BCD0B4BECB4404C15A606EE5373520");

            var userRepositoryMock = new Mock<UserRepository>();
            userRepositoryMock.Setup(repo => repo.FindById(storedUser.UserId)).Returns(storedUser);

            var mazeRepositoryMock = new Mock<MazeRepository>();
            var userMazeRepositoryMock = new Mock<UserMazeRepository>();
            userMazeRepositoryMock.Setup(repo => repo.FindOwnMazesByUserId(It.IsAny<Guid>())).Returns(new List<UserMaze>());
            _sutUserService = new UserService(GetUserServiceLogger(), userRepositoryMock.Object, mazeRepositoryMock.Object, userMazeRepositoryMock.Object);

            UserDTO expectUserDto = UserDTO.Builder()
                .Id(storedUser.UserId)
                .Username(storedUser.Username)
                .OwnMazes(new List<MazeDTO>())
                .Build();

            //Act
            var retUserDto = _sutUserService.GetUserById(storedUser.UserId);

            //Assert
            Assert.AreEqual(expectUserDto.ToString(), retUserDto.ToString());
        }
    }
}