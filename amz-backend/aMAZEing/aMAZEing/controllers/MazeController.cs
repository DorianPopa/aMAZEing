using System;
using System.Collections.Generic;
using aMAZEing.DTOs;
using aMAZEing.errors;
using aMAZEing.security;
using aMAZEing.services;
using JWT;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace aMAZEing.controllers
{
    [ApiController]
    [Route("mazes")]
    public class MazeController : ControllerBase
    {
        private readonly ILogger<MazeController> _logger;
        private readonly IAuthService _authService;
        private readonly MazeService _mazeService;

        public MazeController(ILogger<MazeController> logger, IAuthService authService, MazeService mazeService)
        {
            _logger = logger;
            _authService = authService;
            _mazeService = mazeService;
        }

        [HttpGet]
        public ActionResult<List<MazeDTO>> GetAllMazes()
        {
            _logger.LogInformation("GET request for mazes list\n\n");

            try
            {
                var accessToken = Request.Headers["Bearer"];
                var payload = Authorize(accessToken);
            }
            catch (ApiException e)
            {
                return Unauthorized(new UnauthorizedError(e.Message));
            }

            List<MazeDTO> retListMazeDTO = _mazeService.GetAllMazes();

            // sort from latest to oldest
            retListMazeDTO.Sort((m1, m2) => m2.CreationTime.CompareTo(m1.CreationTime));

            return Ok(retListMazeDTO);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<List<MazeDTO>> GetMazeById(Guid id)
        {
            _logger.LogInformation("GET request for maze with Id {0}\n\n", id);

            try
            {
                var accessToken = Request.Headers["Bearer"];
                var payload = Authorize(accessToken);
            }
            catch (ApiException e)
            {
                return Unauthorized(new UnauthorizedError(e.Message));
            }

            MazeDTO retMazeDTO = _mazeService.GetMazeById(id);

            if (retMazeDTO != null)
                return Ok(retMazeDTO);

            return NotFound(new NotFoundError("Maze with id " + id.ToString() + " not in database"));
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
