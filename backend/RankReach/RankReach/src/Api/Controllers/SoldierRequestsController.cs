using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using RankReach.BL.Services;
using RankReach.Core.Models;

namespace RankReach.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SoldierRequestsController : ControllerBase
{
    private readonly ISoldierRequestService _service;
    public SoldierRequestsController(ISoldierRequestService service) => _service = service;

    // GET /api/soldierrequests/{soldierId}
    [HttpGet("{soldierId:int}")]
    [ProducesResponseType(typeof(IEnumerable<SoldierRequestRead>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<SoldierRequestRead>>> GetBySoldier(int soldierId)
    {
        var items = await _service.GetBySoldierIdAsync(soldierId);
        return Ok(items);
    }

    // POST /api/soldierrequests
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] SoldierRequestCreate payload)
    {
        try
        {
            await _service.AddAsync(payload);
            // Location could point back to the list for this soldier
            return CreatedAtAction(nameof(GetBySoldier), new { soldierId = payload.SoldierId }, null);
        }
        catch (SqlException ex) when (ex.Number is 2601 or 2627)
        {
            // Unique constraint violation (duplicate soldierId+requestId)
            return Conflict(new { error = "Duplicate request for this soldier and request type." });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            // Fallback for unexpected errors
            return StatusCode(StatusCodes.Status500InternalServerError, new { error = ex.Message });
        }
    }

    // PUT /api/soldierrequests/{soldierRequestId}
    [HttpPut("{soldierRequestId:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Update(int soldierRequestId, [FromBody] SoldierRequestUpdate payload)
    {
        if (soldierRequestId != payload.SoldierRequestId)
            return BadRequest(new { error = "Route id and body id must match" });

        try
        {
            await _service.UpdateAsync(payload);
            return NoContent();
        }
        catch (SqlException ex) when (ex.Number is 2601 or 2627)
        {
            return Conflict(new { error = "Another open request exists for this soldier+request type." });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (SqlException ex) when (ex.Number is 50000)
        {
            // RAISERROR default number for custom errors if used in SP
            return NotFound(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { error = ex.Message });
        }
    }
}


