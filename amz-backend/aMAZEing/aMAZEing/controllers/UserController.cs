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
            List<UserDTO> retListUserDTO = _userService.GetAllUsers();

            return Ok(retListUserDTO);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<UserDTO> GetUserById(Guid id)
        {
            _logger.LogInformation("GET request for user with Id {0}\n\n", id);
            UserDTO retUserDTO = _userService.GetUserById(id);

            if (retUserDTO != null)
                return Ok(retUserDTO);

            return BadRequest("Id not in database");
        }

        [HttpPost]
        [Route("{userId}/build/save")]
        public ActionResult<MazeDTO> CreateMaze(Guid userId, [FromBody] MazeFE maze)
        {
            _logger.LogInformation("POST request for saving maze from user with id {0}\n\n", userId.ToString());
            MazeDTO retMazeDTO = _mazeService.CreateMazeByUserId(userId, maze);
            if(retMazeDTO != null)
                return Created("Maze created", retMazeDTO);
            
            return BadRequest("Invalid maze or userId");
        }

        [HttpGet]
        [Route("{userId}/build/visualize/{algorithm}")]
        public ActionResult<List<Point>> CreateMaze(Guid userId, String algorithm, [FromBody] MazeFE maze)
        {
            _logger.LogInformation("GET request for {0} maze visualizer from user with id {1}\n\n", algorithm, userId.ToString());
            List<Point> visitedPoints = _mazeService.Visualize(maze, algorithm);
            if (visitedPoints != null)
                return Ok(visitedPoints);

            return BadRequest("Invalid maze");
        }
    }
}
