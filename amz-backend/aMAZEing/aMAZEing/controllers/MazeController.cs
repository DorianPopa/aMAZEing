using System;
using System.Collections.Generic;
using aMAZEing.DTOs;
using aMAZEing.errors;
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
        private readonly IMazeService _mazeService;

        public MazeController(ILogger<MazeController> logger, IMazeService mazeService)
        {
            _logger = logger;
            _mazeService = mazeService;
        }

        [HttpGet]
        public ActionResult<List<MazeDTO>> GetAllMazes()
        {
            _logger.LogInformation("GET request for mazes list\n\n");
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
            MazeDTO retMazeDTO = _mazeService.GetMazeById(id);

            if (retMazeDTO != null)
                return Ok(retMazeDTO);

            return NotFound(new NotFoundError("Maze with id " + id.ToString() + " not in database"));
        }
    }
}
