using Microsoft.AspNetCore.Mvc;
using RankReach.BL.Services;
using RankReach.Core.Models;

namespace RankReach.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommanderRequestsController : ControllerBase
{
    private readonly ICommanderRequestsService _service;
    public CommanderRequestsController(ICommanderRequestsService service) => _service = service;

    // GET /api/commanderrequests/{commanderId}/{requestStatus}
    [HttpGet("{commanderId:int}/{requestStatus:int}")]
    [ProducesResponseType(typeof(IEnumerable<CommanderRequestRead>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<CommanderRequestRead>>> GetByStatus(int commanderId, int requestStatus)
    {
        if (commanderId <= 0 || requestStatus > 2)
            return BadRequest(new { error = "Invalid commanderId or requestStatus" });

        var items = await _service.GetByStatusAsync(commanderId, requestStatus);
        return Ok(items);
    }
}


