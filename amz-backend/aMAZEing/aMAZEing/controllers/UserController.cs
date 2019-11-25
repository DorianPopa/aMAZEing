using System;
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
            Console.WriteLine(user.Username);
            _logger.LogInformation("POST request for saving user with username {0}\n\n", user.Username);
            UserDTO retUserDTO = _userService.CreateUser(user);

            if (retUserDTO != null)
                return Ok(retUserDTO);

            return BadRequest("Username already in database");
        }
    }
}
