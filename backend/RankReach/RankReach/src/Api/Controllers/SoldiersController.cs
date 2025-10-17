using Microsoft.AspNetCore.Mvc;
using RankReach.BL.Services;
using RankReach.Core.Models;

namespace RankReach.Api.Controllers;

/* Soldier API: GET by id + POST create */
[ApiController]
[Route("api/[controller]")]
public class SoldiersController : ControllerBase
{
    private readonly ISoldierService _service;
    public SoldiersController(ISoldierService service) => _service = service;

    /*GET /api/soldiers/{email} – fetch single soldier*/
    [HttpGet("by-email/{email}")]
    [ProducesResponseType(typeof(Soldier), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Soldier>> Get([FromRoute] string email)
    {
        var soldier = await _service.GetAsync(email);
        if (soldier is null) return NotFound();
        return Ok(soldier);
    }

    /*POST /api/soldiers – create new soldier*/
    [HttpPost]
    [ProducesResponseType(typeof(object), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] SoldierCreate payload)
    {
        try
        {
            var newId = await _service.CreateAsync(payload);

            // Build Location header to the GET endpoint: /api/soldiers/{id}
            return CreatedAtAction(
                nameof(Get),
                routeValues: new { id = newId },
                value: new { soldierId = newId } // minimal body can be expanded later
            );
        }
        catch (ArgumentException ex)
        {
            // BL validation errors ⇒ 400
            return BadRequest(new { error = ex.Message });
        }
    }
}
