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
        public ActionResult<List<MazeDTO>> GetAllMazes()
        {
            _logger.LogInformation("GET request for mazes list\n\n");
            List<MazeDTO> retListMazeDTO = _mazeService.GetAllMazes();

            return Ok(retListMazeDTO);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<List<MazeDTO>> GetMazeById(Guid id)
        {
            _logger.LogInformation("GET request for maze with Id {0}\n\n", id);
            MazeDTO retMazeDTO = _mazeService.GetMazeById(id);

            if (retMazeDTO != null)
                return Ok(retMazeDTO);

            return BadRequest("Id not in database");
        }
    }
}
