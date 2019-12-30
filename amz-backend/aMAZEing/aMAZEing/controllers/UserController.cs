using System;
using System.Collections.Generic;
using aMAZEing.DTOs;
using aMAZEing.errors;
using aMAZEing.models;
using aMAZEing.services;
using aMAZEing.utils;
using Microsoft.AspNetCore.Http;
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
        private readonly IMazeService _mazeService;

        public UserController(ILogger<UserController> logger, UserService userService, IMazeService mazeService)
        {
            _logger = logger;
            _userService = userService;
            _mazeService = mazeService;
        }

        [HttpPost]
        public ActionResult<UserDTO> CreateUser([FromBody] User user)
        {
            _logger.LogInformation("POST request for saving user with Username {0}\n\n", user.Username);
            try
            {
                UserDTO retUserDto = _userService.CreateUser(user);
                return Created("User created", retUserDto);
            }
            catch (ApiException e)
            {
                if (e.StatusCode == 400)
                    return BadRequest(new BadRequestError(e.Message));

                return StatusCode(StatusCodes.Status500InternalServerError, new InternalServerError(e.Message));
            }
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

            return NotFound(new NotFoundError("User with id " + id.ToString() + " not in database"));
        }

        [HttpPost]
        [Route("{userId}/build/save")]
        public ActionResult<MazeDTO> CreateMaze(Guid userId, [FromBody] MazeFE maze)
        {
            _logger.LogInformation("POST request for saving maze from user with id {0}\n\n", userId.ToString());
            try
            {
                MazeDTO retMazeDTO = _mazeService.CreateMazeByUserId(userId, maze);
                return Created("Maze created", retMazeDTO);
            }
            catch (ApiException e)
            {
                if (e.StatusCode == 400)
                    return BadRequest(new BadRequestError(e.Message));

                return NotFound(new NotFoundError(e.Message));
            }
        }

        [HttpGet]
        [Route("{userId}/build/visualize/{algorithm}")]
        public ActionResult<MazeVisualizerDTO> VisualizeMazeSolution(Guid userId, string algorithm, [FromBody] MazeFE maze)
        {
            _logger.LogInformation("GET request for {0} maze visualizer from user with id {1}\n\n", algorithm, userId.ToString());
            try
            {
                if (algorithm == null)
                    BadRequest(new BadRequestError("NULL alg string"));
                MazeVisualizerDTO mazeVisualizerData = _mazeService.Visualize(maze, algorithm.ToUpper());
                return Ok(mazeVisualizerData);
            }
            catch (ApiException e)
            {
                if (e.StatusCode == 400)
                    return BadRequest(new BadRequestError(e.Message));
                
                return NotFound(new NotFoundError(e.Message));
            }
        }
    }
}
