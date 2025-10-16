using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using RankReach.BL.Services;
using RankReach.Core.Models;

namespace RankReach.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeeklyFeedbackController : ControllerBase
{
    private readonly IWeeklyFeedbackService _service;
    public WeeklyFeedbackController(IWeeklyFeedbackService service) => _service = service;

    // POST /api/weeklyfeedback
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Create([FromBody] WeeklyFeedbackCreate payload)
    {
        try
        {
            await _service.AddAsync(payload);
            return Created(string.Empty, null);
        }
        catch (SqlException ex)
        {
            // Thursday-only and uniqueness errors surface from SP as errors
            return BadRequest(new { error = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    // GET /api/weeklyfeedback/course/{courseId}/{weekDate}
    [HttpGet("course/{courseId:int}/{weekDate}")]
    [ProducesResponseType(typeof(IEnumerable<CourseFeedbackRead>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<CourseFeedbackRead>>> GetCourseFeedbacks(int courseId, DateTime weekDate)
    {
        if (courseId <= 0)
            return BadRequest(new { error = "Invalid courseId" });
        var items = await _service.GetCourseFeedbacksAsync(courseId, weekDate);
        return Ok(items);
    }
}


