﻿using System;
using System.Collections.Generic;
using aMAZEing.DTOs;
using aMAZEing.errors;
using aMAZEing.models;
using aMAZEing.security;
using aMAZEing.services;
using aMAZEing.utils;
using JWT;
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
        private readonly IAuthService _authService;
        private readonly UserService _userService;
        private readonly MazeService _mazeService;

        public UserController(ILogger<UserController> logger, IAuthService authService, UserService userService, MazeService mazeService)
        {
            _logger = logger;
            _authService = authService;
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

        [HttpPost]
        [Route("/login")]
        public ActionResult<Jwt> Login([FromBody] User user)
        {
            _logger.LogInformation("POST request for login with Username {0}\n\n", user.Username);
            
            try
            {
                User retUser = _userService.ValidateCredentials(user);
                Jwt jwt = _authService.GenerateJwt(retUser.UserId, user.Username);
                return Ok(jwt);
            }
            catch (ApiException e)
            {
                return BadRequest(new BadRequestError(e.Message));
            }
        }

        [HttpGet]
        public ActionResult<List<UserDTO>> GetAllUsers()
        {
            _logger.LogInformation("GET request for users list\n\n");

            try
            {
                var accessToken = Request.Headers["Bearer"];
                var payload = Authorize(accessToken);
            }
            catch (ApiException e)
            {
                return Unauthorized(new UnauthorizedError(e.Message));
            }

            List<UserDTO> retListUserDTO = _userService.GetAllUsers();

            return Ok(retListUserDTO);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<UserDTO> GetUserById(Guid id)
        {
            _logger.LogInformation("GET request for user with Id {0}\n\n", id);

            try
            {
                var accessToken = Request.Headers["Bearer"];
                var payload = Authorize(accessToken);
            }
            catch (ApiException e)
            {
                return Unauthorized(new UnauthorizedError(e.Message));
            }

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
                var accessToken = Request.Headers["Bearer"];
                var payload = Authorize(accessToken);
            }
            catch (ApiException e)
            {
                return Unauthorized(new UnauthorizedError(e.Message));
            }

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

        [HttpPost]
        [Route("{userId}/build/visualize/{algorithm}")]
        public ActionResult<MazeVisualizerDTO> VisualizeMazeSolution(Guid userId, string algorithm, [FromBody] MazeFE maze)
        {
            _logger.LogInformation("GET request for {0} maze visualizer from user with id {1}\n\n", algorithm, userId.ToString());

            try
            {
                var accessToken = Request.Headers["Bearer"];
                var payload = Authorize(accessToken);
            }
            catch (ApiException e)
            {
                return Unauthorized(new UnauthorizedError(e.Message));
            }

            try
            {
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

        [HttpGet]
        [Route("/leaderboard")]
        public ActionResult<List<UserDTO>> GetLeaderboard()
        {
            _logger.LogInformation("GET request for the leaderboard\n\n");

            try
            {
                var accessToken = Request.Headers["Bearer"];
                var payload = Authorize(accessToken);
            }
            catch (ApiException e)
            {
                return Unauthorized(new UnauthorizedError(e.Message));
            }

            ActionResult<List<UserDTO>> leaderboard = _userService.GetAllUsers();
            leaderboard.Value.Sort((u1, u2) => u2.Accuracy.CompareTo(u1.Accuracy));
            return leaderboard;
        }

        private IDictionary<string, object> Authorize(string accessToken)
        {
            if (String.IsNullOrEmpty(accessToken))
            {
                _logger.LogError("Missing or bad authentication\n\n");
                throw new ApiException(401, "Missing or bad authentication");
            }

            try
            {
                return _authService.ValidateJwt(accessToken);
            }
            catch (TokenExpiredException)
            {
                throw new ApiException(401, "Token has expired");
            }
            catch (SignatureVerificationException)
            {
                throw new ApiException(401, "Token has invalid signature");
            }
            catch (InvalidTokenPartsException)
            {
                throw new ApiException(401, "Token has invalid format");
            }
        }
    }
}
