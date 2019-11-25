using System;
using System.Collections.Generic;
using aMAZEing.DTOs;
using aMAZEing.models;
using aMAZEing.services;
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

        public UserController(ILogger<UserController> logger, UserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpPost]
        public ActionResult<UserDTO> CreateUser([FromBody] User user)
        {
            _logger.LogInformation("POST request for saving user with Username {0}\n\n", user.Username);
            UserDTO retUserDto = _userService.CreateUser(user);

            if (retUserDto != null)
                return Ok(retUserDto);

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
    }
}
