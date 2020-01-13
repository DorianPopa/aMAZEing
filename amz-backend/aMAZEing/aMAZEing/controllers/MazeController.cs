using System;
using System.Collections.Generic;
using aMAZEing.DTOs;
using aMAZEing.errors;
using aMAZEing.security;
using aMAZEing.services;
using aMAZEing.utils;
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

            IDictionary<string, object> payload;
            try
            {
                var accessToken = Request.Headers["Bearer"];
                payload = Authorize(accessToken);
            }
            catch (ApiException e)
            {
                return Unauthorized(new UnauthorizedError(e.Message));
            }

            List<MazeDTO> retListMazeDTO = _mazeService.GetAllMazes((string) payload["userId"]);

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

        [HttpGet]
        [Route("{id}/solution")]
        public ActionResult<MazeSolution> GetMazeSolution(Guid id)
        {
            _logger.LogInformation("GET request for maze solution with maze Id {0}\n\n", id);

            IDictionary<string, object> payload;
            try
            {
                var accessToken = Request.Headers["Bearer"];
                payload = Authorize(accessToken);
            }
            catch (ApiException e)
            {
                return Unauthorized(new UnauthorizedError(e.Message));
            }

            MazeSolution solution = _mazeService.GetMazeSolution(id, (string) payload["userId"]);

            if (solution != null)
                return Ok(solution);

            return NotFound(new NotFoundError("Maze with id " + id.ToString() + " not in database"));
        }

        [HttpPost]
        [Route("{id}/submit")]
        public ActionResult<Score> SubmitSolution(Guid id, [FromBody] MazeFE userSolution)
        {
            _logger.LogInformation("POST request to submit a solution for maze with Id {0}\n\n", id);

            IDictionary<string, object> payload;
            try
            {
                var accessToken = Request.Headers["Bearer"];
                payload = Authorize(accessToken);
            }
            catch (ApiException e)
            {
                return Unauthorized(new UnauthorizedError(e.Message));
            }

            try
            {
                Score score = _mazeService.Submit(id, (string)payload["userId"], userSolution);
                return Ok(score);
            }
            catch (ApiException e)
            {
                if (e.StatusCode == 403)
                    return StatusCode(403, new ForbiddenError(e.Message));

                return BadRequest(new BadRequestError(e.Message));
            }
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
