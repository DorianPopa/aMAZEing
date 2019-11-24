using System;
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
        public ActionResult<Guid> CreateUser([FromBody] User user)
        {
            Console.WriteLine(user.Username);
            _logger.LogInformation("POST request for saving user with username {0}\n\n", user.Username);
            Guid id = _userService.CreateUser(user);

            if (id != Guid.Empty)
                return Ok(id);

            return BadRequest("Username already in database");
        }
    }
}
