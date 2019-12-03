using System;
using System.Collections.Generic;
using aMAZEing.DTOs;
using aMAZEing.models;
using aMAZEing.services;
using aMAZEing.utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace aMAZEing.controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly UserService _userService;
        private readonly MazeService _mazeService;

        public UserController(ILogger<UserController> logger, UserService userService, MazeService mazeService)
        {
            _logger = logger;
            _userService = userService;
            _mazeService = mazeService;
        }

        [HttpPost]
        public ActionResult<UserDTO> CreateUser([FromBody] User user)
        {
            _logger.LogInformation("POST request for saving user with Username {0}\n\n", user.Username);
            UserDTO retUserDto = _userService.CreateUser(user);

            if (retUserDto != null)
                return Created("User created", retUserDto);

            return BadRequest("Username already in database");
        }

        [HttpGet]
        public ActionResult<List<UserDTO>> GetAllUsers()
        {
            _logger.LogInformation("GET request for users list\n\n");
            List<UserDTO> retListUserDto = _userService.GetAllUsers();

            return Ok(retListUserDto);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<UserDTO> GetUserById(Guid id)
        {
            _logger.LogInformation("GET request for user with Id {0}\n\n", id);
            UserDTO retUserDto = _userService.GetUserById(id);

            if (retUserDto != null)
                return Ok(retUserDto);

            return BadRequest("Id not in database");
        }

        [HttpPost]
        [Route("{userId}/build/save")]
        // TODO return MazeDTO
        public ActionResult<UserMaze> CreateMaze(Guid userId, [FromBody] MazeFE maze)
        {
            _logger.LogInformation("POST request for saving maze from user with id {0}\n\n", userId.ToString());
            UserMaze retUserMaze = _mazeService.CreateMazeByUserId(userId, maze);
            if(retUserMaze != null)
                return Created("Maze created", maze);
            
            return BadRequest("Invalid maze or userId");
        }
    }
}
