using System;
using System.Collections.Generic;
using aMAZEing.models;
using aMAZEing.services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace aMAZEing.controllers
{
    [ApiController]
    [Route("mazes")]
    public class MazeController : ControllerBase
    {
        private readonly ILogger<MazeController> _logger;
        private readonly MazeService _mazeService;

        public MazeController(ILogger<MazeController> logger, MazeService mazeService)
        {
            _logger = logger;
            _mazeService = mazeService;
        }

        [HttpGet]
        // TODO return List<MazeDTO>
        // flow not implemented 
        public ActionResult<List<Maze>> GetAllMazes()
        {
            _logger.LogInformation("GET request for mazes list\n\n");
            return Ok();
        }

        [HttpGet]
        [Route("{id}")]
        // TODO return MazeDTO
        // flow not implemented
        public ActionResult<List<Maze>> GetMazeById(Guid id)
        {
            _logger.LogInformation("GET request for maze with Id {0}\n\n", id);
            return Ok();
        }
    }
}
